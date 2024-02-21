export interface Node {
    name: string, 
    // ref: React.RefObject<HTMLDivElement>, 
    class: string,
    uniqueId: string
}

export interface Relationship {
    source: string,
    target: string
}