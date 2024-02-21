import * as joint from "@joint/core";
import { useEffect } from 'react';

export function JointGraph() {

    useEffect(() => {
        const namespace = joint.shapes;

        const graph = new joint.dia.Graph({}, { cellNamespace: namespace });
        
        new joint.dia.Paper({
            el: document.getElementById('joint'),
            model: graph,
            width: 600,
            height: 100,
            gridSize: 1,
            cellViewNamespace: namespace
        });
        
        const rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });
        rect.addTo(graph);
        
        const rect2 = rect.clone();
        rect2.translate(300, 0);
        rect2.attr('label/text', 'World!');
        rect2.addTo(graph);
        
        const link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(graph);
    })

    return (
        <div id='joint'></div>
    )
}