import * as joint from "@joint/core";
import { useEffect } from 'react';
import { Relationship, Node } from './Types';
import { DirectedGraph } from '@joint/layout-directed-graph';
import { createCircleNode, createInternalNetworkNode, createRectangleNode } from './ShapeFactory';
import { createComposedOfRelationship, createConnectsRelationship, createDeployedInRelationship, createInteractsRelationship } from './RelationshipFactory';

interface Props {
    nodes: Node[],
    relationships: Relationship[]
}

const shapes: {[name: string]: joint.shapes.standard.Rectangle} = {}

let recentRect: joint.shapes.standard.Rectangle;

function createRelationships(graph: joint.dia.Graph, relationships: Relationship[]) {
    relationships.forEach(relationship => {
        if (relationship.relationshipType === 'connects') {
            createConnectsRelationship(graph, shapes, relationship);
        } else if (relationship.relationshipType === 'deployed-in') {
            createDeployedInRelationship(shapes, relationship);
        } else if (relationship.relationshipType === 'interacts') {
            createInteractsRelationship(graph, shapes, relationship);
        } else if (relationship.relationshipType === 'composed-of') {
            createComposedOfRelationship(graph, shapes, relationship);
        }
    });
}

function createNodes(graph: joint.dia.Graph, nodes: Node[]) {
    nodes.forEach(node => {
        if (node.nodeType === 'actor') {
            const circle = createCircleNode(node);
            circle.addTo(graph);
            shapes[node.uniqueId] = circle;
        } else if (node.nodeType === 'internal-network') {
            const rect = createInternalNetworkNode(node);
            rect.addTo(graph);
            shapes[node.uniqueId] = rect;
        } else {
            const rect = createRectangleNode(node);
            rect.addTo(graph);
            shapes[node.uniqueId] = rect;
        }
    })
}

function createClickEvents(paper: joint.dia.Paper, graph: joint.dia.Graph) {
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
}

function applyLayout(graph: joint.dia.Graph) {
    DirectedGraph.layout(graph, {
        nodeSep: 20,
        edgeSep: 10,
        rankDir: "TB",
        // marginX: 300,
        marginY: 200
    });
}

export function JointGraph({ nodes, relationships }: Props) {
    useEffect(() => {
        const namespace = joint.shapes;
        const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
        
        const paper = new joint.dia.Paper({
            el: document.getElementById('joint'),
            model: graph,
            width: 2600,
            height: 4000,
            gridSize: 1,
            cellViewNamespace: namespace,
            background: {
                color: 'white'
            }
        });
        
        createClickEvents(paper, graph);
        createNodes(graph, nodes);
        createRelationships(graph, relationships);
        applyLayout(graph);
    })

    return (
        <div id='joint'></div>
    )
}