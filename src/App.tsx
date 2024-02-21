import './App.css'
import { GoGraph } from './GoGraph';
import { Node, Relationship } from './Types'
import * as apiGateway from './assets/api-gateway.json';

function App() {
    const nodes: Node[] = apiGateway.nodes.map(node => {
        return {
            name: node.name,
            class: 'box',
            uniqueId: node.uniqueId
        }
    });

    const relationships: Relationship[] = apiGateway.relationships.map(relationship => {
        return {
            source: relationship.parties.source,
            target: relationship.parties.destination
        }
    })

    return (
        <div>
            <GoGraph nodes={nodes} relationships={relationships}/>
        </div>
    )
}

export default App
