import { Event } from "../Sructures/Event";
import { Events } from "discord.js"
import figlet from "figlet"
import chalk from "chalk";
import { Guild } from "../Database/Models/Guild";

class ReadyEvent extends Event {
    name = Events.ClientReady
    execute() {
        this.client.user?.setActivity({
            name: "Inciando serviços..."
        })
        this.client.guilds.cache.forEach(async (guild) => {
            const guildDocument = await Guild.get(guild.id)
            if(!guildDocument) await Guild.create({
                guildId: guild.id,
                drawingRecord: 0
            })
        })

        figlet(this.client.user?.displayName as string, function (err, data) {
            console.log(chalk.green(data))
        })
        this.debug.Emphasis(`Logado no Bot: ${this.client.user?.tag}`)
        const listOfStatus = ["Não. Eu não sou a Sona do LoL.", "Sona", "Envie seus desenhos, por favor!"]
        const statusChanger = () => {
            const status = listOfStatus[Math.floor(Math.random() * listOfStatus.length)]
            this.client.user?.setActivity({
                name: status
            })
        }
        setInterval(() => statusChanger(), 30000)
    }
}

export default ReadyEvent