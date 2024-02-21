import go from 'gojs';
import { useEffect } from 'react';
import { Node, Relationship } from './Types';

interface Props {
    nodes: Node[],
    relationships: Relationship[]
}

export function GoGraph({ nodes, relationships }: Props) {
    useEffect(() => {
        const graph = new go.Diagram('gograph')
        graph.model = new go.GraphLinksModel(
            nodes.map(node => {
                return {
                    key: node.uniqueId,
                    name: node.name
                }
            }),
            relationships.map(relationship => {
                return {
                    from: relationship.source,
                    to: relationship.target
                }
            })
       );

        graph.nodeTemplate =
            new go.Node("Horizontal", { background: "#44CCFF" })
                .add(
                    new go.TextBlock(
                        "Default Text",
                        { margin: 12, stroke: "white", font: "bold 16px sans-serif" }
                    ).bind("text", "name")
                );

        graph.layout = new go.ForceDirectedLayout();
    }, [nodes, relationships])

    return (
        <div id='gograph'
        style={{
            width: '1250px',
            height: '750px',
            backgroundColor: '#DAE4E4'
        }}
        >
            graph
        </div>
    )
}