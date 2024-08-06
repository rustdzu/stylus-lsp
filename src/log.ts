import * as fs from 'fs';
import * as path from 'path';

export const log = (message?:string) => {
    if (!message) {
        return;
    }
    fs.appendFile("/tmp/lsp-log.txt", message + '\n\r', (err) => void 0);
}
