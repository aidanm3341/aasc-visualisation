export interface Node {
    name: string, 
    class: string,
    uniqueId: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extras?: {[field: string]: any}
}

export interface Relationship {
    source: string,
    target: string,
    relationshipType: string
    // protocol: string,
    // authentication: string
}