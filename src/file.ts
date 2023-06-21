
import * as fs from 'fs/promises';
import { existsSync } from 'fs';

export interface FileUtils {
    readFileUtf8: (file: string) => Promise<string>,
    readFileBinary: (file: string) => Promise<Buffer>,
    writeFile: (file: string, contents: string | Buffer, kind: BufferEncoding) => Promise<void>,
    existsFile: (file: string) => Promise<boolean>
}

const helpers: FileUtils = {
    readFileUtf8: (file) => {
        return fs.readFile(file, "utf8")
    },
    readFileBinary: (file) => {
        return fs.readFile(file)
    },
    writeFile: (file, contents, kind) => {
        return fs.writeFile(file, contents, kind)
    },
    existsFile: (file) => {
        return new Promise((d) => {
            d(existsSync(file))
        })
    }
}

export function updateHelpers(utils: FileUtils) {
    helpers.readFileUtf8 = utils.readFileUtf8;
    helpers.readFileBinary = utils.readFileBinary;
    helpers.writeFile = utils.writeFile;
    helpers.existsFile = utils.existsFile;
}

export function readFileUtf8(file: string): Promise<string> {
    return helpers.readFileUtf8(file)
}
export function readFileBinary(file: string): Promise<Buffer> {
    return helpers.readFileBinary(file)
}
export function writeFile(file: string, contents: string | Buffer, kind: BufferEncoding): Promise<void> {
    return helpers.writeFile(file, contents, kind)
}
export function existsFile(file: string): Promise<boolean> {
    return helpers.existsFile(file)
}