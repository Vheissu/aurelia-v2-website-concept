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