export const findValues = (regex:RegExp, text?:string) => {
    if (!text) {
        return [];
    }
    const values: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
        values.push(match[1]);
    }

    return values;

};
