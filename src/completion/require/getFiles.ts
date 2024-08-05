import * as fs from 'fs';
import * as path from 'path';
import {CompletionItem, CompletionItemKind} from 'vscode-languageserver-types';

export const getFiles = (dirname:string):CompletionItem[] => {
    return fs.readdirSync(dirname)
        .map(item => {
            const full_path = path.normalize(path.join(dirname, item));
            const stat = fs.statSync(full_path);
            if (stat.isDirectory()) {
                return {
                    label: item,
                    kind: CompletionItemKind.Folder,
                    insertText: item + "/",
                };
            }
            return {
                label: item,
                kind: CompletionItemKind.File,
                insertText: path.parse(item).name,
            };
        });
}
