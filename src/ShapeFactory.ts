import * as joint from "@joint/core";
import { Node } from './Types';

export function createRectangleNode(node: Node) {
    return new joint.shapes.standard.Rectangle({
        z: 2
    })
        .resize(200, 40)
        .attr({
            body: {
                fill: '#44CCFF'
            },
            label: {
                text: node.name,
                fill: 'black'
            }
        })
        .prop('extra', node.extras);
}

export function createInternalNetworkNode(node: Node) {
    return new joint.shapes.standard.Rectangle({
        z: 1
    })
        .resize(200, 40)
        .attr({
            body: {
                strokeDasharray: '10,2'
            },
            label: {
                text: node.name,
                fill: 'black',
                'y-alignment': 'top',
                'text-decoration': 'bold'
            }
        })
        .prop('extra', node.extras);
}

export function createCircleNode(node: Node) {
    return new joint.shapes.standard.Circle()
        .resize(100, 100)
        .attr({
            body: {
                fill: '#66DD33'
            },
            label: {
                text: node.name,
                fill: 'black'
            }
        })
        .prop('extra', node.extras);
}