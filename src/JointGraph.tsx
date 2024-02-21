import * as joint from "@joint/core";
import { useEffect } from 'react';
import { Relationship, Node } from './Types';
import { DirectedGraph } from '@joint/layout-directed-graph';

interface Props {
    nodes: Node[],
    relationships: Relationship[]
}

export function JointGraph({ nodes, relationships }: Props) {

    useEffect(() => {
        const namespace = joint.shapes;

        const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
        
        const paper = new joint.dia.Paper({
            el: document.getElementById('joint'),
            model: graph,
            width: 1600,
            height: 800,
            gridSize: 1,
            cellViewNamespace: namespace,
            background: {
                color: 'white'
            }
        });

        let recentRect: joint.shapes.standard.Rectangle;
        paper.on('cell:pointerdown', (cellView, _evt, x, y) => {
            if (recentRect)
                recentRect.remove();

            const rect = new joint.shapes.standard.Rectangle();
            rect.resize(200, 40);
            rect.position(x, y);

            rect.attr({
                body: {
                    fill: 'white'
                },
                label: {
                    text: JSON.stringify(cellView.model.attributes['extra'], null, 2),
                    fill: 'black',
                    'text-anchor': 'left',
                    'x-alignment': 'left'
                }
            });
            rect.addTo(graph);
            rect.resize(300, 200);
            recentRect = rect;
        });

        paper.on('blank:pointerdown', () => {
            recentRect.remove();
        });

        const rects: {[name: string]: joint.shapes.standard.Rectangle} = {}
        
        nodes.forEach(node => {
            const rect = new joint.shapes.standard.Rectangle();
            rect.resize(200, 40);
            rect.attr({
                body: {
                    fill: '#44CCFF'
                },
                label: {
                    text: node.name,
                    fill: 'black'
                }
            });

            rect.prop('extra', node.extras);
            rect.addTo(graph);
            rects[node.uniqueId] = rect;
        })
        
        relationships.forEach(relationship => {
            const link = new joint.shapes.standard.Link();
            link.appendLabel({
                attrs: {
                    text: {
                        text: relationship.relationshipType
                    }
                }
            });

            link.source(rects[relationship.source]);
            link.target(rects[relationship.target]);
            link.addTo(graph);
        });
        

        DirectedGraph.layout(graph, {
            nodeSep: 150,
            edgeSep: 180,
            rankDir: "TB",
            marginX: 300,
            marginY: 200
        });
    })

    return (
        <div id='joint'></div>
    )
}