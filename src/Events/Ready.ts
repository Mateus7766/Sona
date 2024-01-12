import { Event } from "../Sructures/Event";
import { Events } from "discord.js";
import figlet from "figlet";
import chalk from "chalk";
import { Guild } from "../Database/Models/Guild";
import { Debug } from "../Sructures/Debug";

const debug = new Debug()

class ReadyEvent extends Event {
    name = Events.ClientReady
    async execute() {
        this.client.player.start(this.client.user?.id as string);
        this.client.user?.setActivity({
            name: "Starting..."
        })
        this.client.guilds.cache.forEach(async (guild) => {
            const guildDocument = await Guild.get(guild.id)
            if (!guildDocument) {
                await Guild.create({
                    guildId: guild.id,
                    drawingRecord: 0
                })
                debug.Log(`O servidor foi adicionado ao banco de dados: ${guild.id} [ Ready.ts ]`)
            }
        })

        const guilds = await Guild.getAll()

        guilds.forEach(async (guild) => {
            const guildData = this.client.guilds.cache.get(guild.guildId)
            if (!guildData) {
                await Guild.delete(guild.guildId)
                debug.Log(`O servidor foi removido do banco de dados: ${guild.guildId} [ Ready.ts ]`)
            }
        })

        figlet(this.client.user?.displayName as string, function (err, data) {
            console.log(chalk.green(data))
        })
        this.debug.Emphasis(`Logado no Bot: ${this.client.user?.tag}`)
        const listOfStatus = [`${this.client.guilds.cache.size} servers`]
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