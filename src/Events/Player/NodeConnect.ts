import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Node } from "vulkava";
const debug = new Debug()

class NodeConnect extends PlayerEvents {
    name = 'nodeConnect'
    async execute(node: Node) {
        debug.Emphasis(`Se conectado com sucesso ao node ${node.identifier}`)
    }
}

export default NodeConnect