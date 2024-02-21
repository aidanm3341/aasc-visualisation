import './App.css'
// import { GoGraph } from './GoGraph';
import { JointGraph } from './JointGraph';
import { Node, Relationship } from './Types'
import * as apiGateway from './assets/api-gateway.json';

function App() {
    const nodes: Node[] = apiGateway.nodes.map(node => {
        return {
            name: node.name,
            class: 'box',
            uniqueId: node.uniqueId,
            extras: node
        }
    });

    const relationships: Relationship[] = apiGateway.relationships.map(relationship => {
        if (relationship['relationship-type'] === 'connects') {
            return {
                relationshipType: 'connects',
                uniqueId: relationship['uniqueId']!,
                protocol: relationship['protocol']!,
                authentication: relationship['authentication']!,
                parties: relationship['parties']!
            } as Relationship
        } else {
            return {} as Relationship
        }
        // return {
        //     source: relationship.parties.source,
        //     target: relationship.parties.destination,
        //     relationshipType: relationship['relationship-type'],
        // }
    })

    return (
        <div style={{
            backgroundColor: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {/* <GoGraph nodes={nodes} relationships={relationships}/> */}
            <JointGraph nodes={nodes} relationships={relationships} />
        </div>
    )
}

export default App
