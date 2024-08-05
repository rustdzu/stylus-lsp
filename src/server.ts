import {
    createConnection,
    TextDocuments,
    ProposedFeatures,
    TextDocumentSyncKind,
    InitializeParams,
    CompletionItem,
    CompletionItemKind,
    TextDocumentPositionParams,
    InitializeResult
} from "vscode-languageserver/node";

import {TextDocument} from "vscode-languageserver-textdocument";
import {properties} from "./completion/properties";

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

connection.onInitialize((params:InitializeParams) => {
    const result:InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["@", ":", " "]
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

    if (!line || !(new RegExp("^\\w", "i").test(line))) {
        return [];
    }

    for (let i = 0; i < properties.length; i++) {
        if (line?.endsWith(`${properties[i][0]}:`)) {
            return properties[i][1].map(value => ({
                label: value,
                kind: CompletionItemKind.Value,
                insertText: `${value}`,
            }));
        }
        if (line?.includes(`${properties[i][0]}`)) {
            return [];
        }
    }
    return properties.map(value => ({
        label: value[0],
        kind:CompletionItemKind.Property,
        insertText: `${value[0]}: `,
    }));
});

connection.onCompletionResolve((item:CompletionItem):CompletionItem => {
    return item;
});

documents.listen(connection);
connection.listen();
