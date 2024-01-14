import { PlayerEvents } from "../../Sructures/PlayerEvents";
import { Debug } from "../../Sructures/Debug";
import { Node } from "vulkava";
const debug = new Debug()

class Erro extends PlayerEvents {
    name = 'error'
    async execute(node: Node, error: Error) {
        debug.Error(`Um erro aconteceu com o node ${node.identifier}. Erro: ${error}`)
    }
}

export default Erro