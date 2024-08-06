import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    TextDocumentSyncKind,
    InitializeParams,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    InitializeResult,
} from "vscode-languageserver/node";

import {TextDocument} from "vscode-languageserver-textdocument";
import {properties} from "./completion/properties";
import {getFiles} from "./completion/require/getFiles";
import * as path from 'path';
import {getNormalDocumentPath} from "./helpers/getNormalDocumentPath";
import {getOtherFileCompletions, processFileContent} from "./imports/getOtherFileCompletions";

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);


documents.onDidOpen((params) => {
    processFileContent(getNormalDocumentPath(params.document.uri));
});

connection.onInitialize((params:InitializeParams) => {
    const result:InitializeResult = {
        capabilities: {
            textDocumentSync: {
                openClose: true,
                change: TextDocumentSyncKind.Full,
            },
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: [ "@", ":", " ", "/", "$" ]
            }
        }
    };
    return result;
});


connection.onCompletion((textDocumentPosition:TextDocumentPositionParams):CompletionItem[] => {
    const textDocument = documents.get(textDocumentPosition.textDocument.uri);
    const position = textDocumentPosition.position;
    const line = textDocument?.getText({
        start: { line: position.line, character: 0 },
        end: { line: position.line, character: position.character }
    }).trim();

    if (!line) {
        return [];
    }

    if (line.endsWith("$")) {
        return getOtherFileCompletions(position);
    }

    if (line.startsWith("@")) {
        if (!line.includes("@require")) {
            return [
                {
                    label: "@require",
                    kind: CompletionItemKind.Keyword,
                    insertText: "@require ''",
                },
            ];
        }
        const written_path = line.match(/@require\s+'([^']+)/)?.[1];
        if (written_path) {
            const dir = path.dirname(getNormalDocumentPath(textDocument?.uri));
            const normalized = path.normalize(path.join(dir, written_path));
            return getFiles(normalized);
        }
    }

    if (!(new RegExp("^\\w|\$", "i").test(line))) {
        return [];
    }

    for (let i = 0; i < properties.length; i++) {
        if (line.includes(`${properties[i][0]}:`)) {
            return properties[i][1].map<CompletionItem>(value => ({
                label: value,
                kind: CompletionItemKind.Value,
                insertText: `${value}`,
            }));
        }
    }
    return properties.map<CompletionItem>(value => ({
        label: value[0],
        kind: CompletionItemKind.Property,
        insertText: `${value[0]}: `,
    }));
});

connection.onCompletionResolve((item:CompletionItem):CompletionItem => {
    return item;
});

documents.listen(connection);
connection.listen();
