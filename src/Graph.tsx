import { newInstance } from '@jsplumb/browser-ui';
import { useEffect, useRef } from 'react';
import { Relationship, Node } from './Types';

interface Props {
    nodes: Node[],
    relationships: Relationship[]
}

export function Graph({nodes, relationships}: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const instance = newInstance({
            container: containerRef.current!
        })

        relationships.forEach(relationship => {
            const sourceNode = nodes.find(node => node.uniqueId === relationship.source);
            const source = instance.addEndpoint(document.getElementById(sourceNode!.uniqueId)!, {
                // endpoint: "Dot"    
            });

            const targetNode = nodes.find(node => node.uniqueId === relationship.target);
            const target = instance.addEndpoint(document.getElementById(targetNode!.uniqueId)!, {
                endpoint: "Dot"    
            });

            instance.connect({
                source,
                target,
                anchors: [ "Top", "Top" ]
            });
        });
        
    }, [nodes, relationships])

    return (
        <div ref={containerRef}>
            { 
                Object.values(nodes).map(node => 
                    <div key={node.uniqueId} className={node.class} id={node.uniqueId}>{node.name}</div>
                ) 
            }
        </div>
    )
}