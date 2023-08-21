import { Event } from "../Sructures/Event";
import { Events } from "discord.js"
import figlet from "figlet"
import chalk from "chalk";

class ReadyEvent extends Event {
    name = Events.ClientReady
    execute() {
        figlet(this.client.user?.displayName as string, function (err, data) {
            console.log(chalk.green(data))
        })
        this.debug.Emphasis(`Logado no Bot: ${this.client.user?.tag}`)
    }
}

export default ReadyEvent