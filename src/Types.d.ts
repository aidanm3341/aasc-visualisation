export interface Node {
    name: string, 
    class: string,
    uniqueId: string,
    nodeType: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extras?: {[field: string]: any}
}

export type Relationship = InteractsRelationship | ConnectsRelationship | DeployedInRelationship | ComposedOfRelationship;

export interface InteractsRelationship {
    relationshipType: 'interacts',
    uniqueId: string,
    parties: {
        actor: string,
        nodes: string[]
    }
}

export interface ConnectsRelationship {
    relationshipType: 'connects',
    uniqueId: string,
    protocol?: string,
    authentication?: string,
    parties: {
        source: string,
        destination: string
    }
}

export interface DeployedInRelationship {
    relationshipType: 'deployed-in',
    uniqueId: string,
    parties: {
        container: string,
        nodes: string[]
    }
}

export interface ComposedOfRelationship {
    relationshipType: 'composed-of',
    uniqueId: string,
    parties: {
        container: string,
        nodes: string[]
    }
}