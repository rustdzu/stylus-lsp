import * as fs from 'fs';
import * as path from 'path';

export const log = (message:string) => {
    fs.appendFile("/tmp/log.txt", message + '\n\r', (err) => void 0);
}
