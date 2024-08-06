import {CompletionItem, CompletionItemKind, Position} from "vscode-languageserver/node";
import * as fs from 'fs';
import {findValues} from "../helpers/findValues";
import * as path from 'path';

const completions:Record<string, CompletionItem[]> = {};

export const getOtherFileCompletions = (position:Position):CompletionItem[] => {
    const res:CompletionItem[] = [];
    Object.keys(completions).forEach((url) => {
        completions[url].forEach((completion) => {
            if (completion.kind !== CompletionItemKind.Value) {
                res.push({
                    ...completion,
                    textEdit: {
                        range: {
                            start: {
                                line: position.line,
                                character: position.character - 1,
                            },
                            end: {
                                line: position.line,
                                character: position.character,
                            },
                        },
                        newText: completion.label,
                    },
                });
            }
            res.push(completion);
        });
    });
    return res;
}
export const processFileContent = (file_path?:string) => {
    if (!file_path) {
        return;
    }
    fs.readFile(file_path, (err, content) => {
        if (!content) {
            return;
        }
        if (err) {
            return;
        }
        const content_str = content.toString();

        const variables = findValues(/^(\$.+)\s=/gm, content_str).map<CompletionItem>(value => ({
            label: value,
            kind: CompletionItemKind.Value,
            insertText: value,
        }));

        
        const functions = findValues(/^(\w.+)\(/gm, content_str).map<CompletionItem>(value => ({
            label: value,
            kind: CompletionItemKind.Function,
        }));

        completions[file_path] = (completions[file_path] || []).concat(functions, variables);

        const imports = findValues(/@require\s+'([^']+)'/gm, content_str);
        imports.forEach((relative) => {
            const full_path = path.join(
                path.dirname(file_path),
                relative
            ).replace(".styl", "") + ".styl";
            processFileContent(full_path);
        });
    });
};

