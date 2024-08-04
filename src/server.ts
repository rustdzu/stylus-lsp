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

import { TextDocument } from "vscode-languageserver-textdocument";

const connection = createConnection(ProposedFeatures.all);
const documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

// Словарь CSS свойств и их значений
const cssProperties = {
    "display": [
        "none",
        "block",
        "inline",
        "inline-block",
        "flex",
        "grid",
        "inline-flex",
        "inline-grid",
        "table",
        "table-row",
        "table-cell"
    ],
    // Другие свойства можно добавить аналогичным образом
};

connection.onInitialize((params:InitializeParams) => {
    const result:InitializeResult = {
        capabilities: {
            textDocumentSync: TextDocumentSyncKind.Incremental,
            completionProvider: {
                resolveProvider: true,
                triggerCharacters: ["@", ":", " ", ";"]
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

    // Если строка оканчивается на "display", предложить значения display
    if (line?.endsWith("display:")) {
        const completionItems:CompletionItem[] = cssProperties["display"].map(value => ({
            label: value,
            kind: CompletionItemKind.Value,
            insertText: `${value}`
        }));
        return completionItems;
    }

    // Если строка содержит "display", предложить значения display
    if (line?.includes("display:")) {
        const completionItems:CompletionItem[] = cssProperties["display"].map(value => ({
            label: value,
            kind:CompletionItemKind.Value,
            insertText: `${value}`
        }));
        return completionItems;
    }

    // Предложить свойства CSS, если они не были предложены ранее
    const completionItems:CompletionItem[] = [];
    if (line) {
        completionItems.push({
            label: "display",
            kind:CompletionItemKind.Property,
            insertText: "display: "
        });
    }

    return completionItems;
});

connection.onCompletionResolve((item:CompletionItem):CompletionItem => {
    return item;
});

documents.listen(connection);
connection.listen();
