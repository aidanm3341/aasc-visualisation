import * as joint from "@joint/core";
import { ComposedOfRelationship, ConnectsRelationship, DeployedInRelationship, InteractsRelationship } from './Types';

export function createConnectsRelationship(graph: joint.dia.Graph, shapes: {[name: string]: joint.shapes.standard.Rectangle}, relationship: ConnectsRelationship) {
    const link = new joint.shapes.standard.Link();
    link.appendLabel({
        attrs: {
            text: {
                text: relationship.relationshipType
            }
        }
    });

    link.source(shapes[relationship.parties.source]);
    link.target(shapes[relationship.parties.destination]);
    link.addTo(graph);
}

export function createDeployedInRelationship(shapes: {[name: string]: joint.shapes.standard.Rectangle}, relationship: DeployedInRelationship) {
    const target = shapes[relationship.parties.container]

    relationship.parties.nodes.map(source => {
        target.embed(shapes[source]);
        target.attributes.z = 1;
        shapes[source].attributes.z = 2;

        const padding = 10;
        shapes[source].fitParent({
            deep: true,
            padding: {
                top: padding,
                left: padding,
                right: padding,
                bottom: padding
            }
        });
    });
}

export function createComposedOfRelationship(graph: joint.dia.Graph, shapes: {[name: string]: joint.shapes.standard.Rectangle}, relationship: ComposedOfRelationship) {
    const target = shapes[relationship.parties.container]

    relationship.parties.nodes.map((source: string) => {
        const link = new joint.shapes.standard.Link();
        link.appendLabel({
            attrs: {
                text: {
                    text: relationship.relationshipType
                }
            }
        });

        link.source(shapes[source]);
        link.target(target);
        link.addTo(graph);
    });
}

export function createInteractsRelationship(graph: joint.dia.Graph, shapes: {[name: string]: joint.shapes.standard.Rectangle}, relationship: InteractsRelationship) {
    const source = shapes[relationship.parties.actor]

    relationship.parties.nodes.map(target => {
        const link = new joint.shapes.standard.Link();
        link.appendLabel({
            attrs: {
                text: {
                    text: relationship.relationshipType
                }
            }
        });

        link.source(source);
        link.target(shapes[target]);
        link.addTo(graph);
    });
}