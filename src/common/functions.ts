export interface BlogMetadata {
    title: string;
    author: string;
    date: string;
}

export function getMetadataFromMarkdown(markdown: string) {
    const metadataRegex = /^---\n(.*)\n---$/m;
    const match = markdown.match(metadataRegex);
    
    let metadata: BlogMetadata | undefined;

    if (match) {
      const metadataString = match[1];
      const metadataLines: Array<string> = metadataString.split('\n');
    
      const metadataObject = metadataLines.reduce((acc: any, line) => {
        const [key, value] = line.split(': ');
        acc[key] = value;
        return acc;
      }, {});

      metadata = metadataObject as BlogMetadata;
    }

    return metadata;
}

export interface Pagination<T> {
    totalPages: number;
    results: T[];
    currentPage: number;
    previousPage?: number;
    nextPage?: number;
}

export function paginateArray<T>(arr: T[], pageSize: number, pageNumber = 1): Pagination<T> {
    if (!Array.isArray(arr)) throw new Error("The input must be an array");
    if (typeof pageSize !== "number" || pageSize <= 0) throw new Error("Page size must be a number greater than 0");
    if (typeof pageNumber !== "number" || pageNumber <= 0) throw new Error("Page number must be a number greater than 0");
    const totalPages = Math.ceil(arr.length / pageSize);
    if (pageNumber > totalPages) throw new Error(`Page number ${pageNumber} is out of range. Total pages: ${totalPages}`);
    const startIndex = (pageNumber - 1) * pageSize;
    const results = arr.slice(startIndex, startIndex + pageSize);
    return {
        totalPages,
        results,
        currentPage: pageNumber,
        previousPage: pageNumber > 1 ? pageNumber - 1 : undefined,
        nextPage: pageNumber < totalPages ? pageNumber + 1 : undefined
    }
}