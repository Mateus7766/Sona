import { REST } from "discord.js"
import config from "../config"
import { Player } from "vulkava"
class Utils {
  async setVoiceChannelStatus(player: Player, status: string) {
    const rest = new REST()
    .setToken(config.token)
    rest.put(`/channels/${player.voiceChannelId}/voice-status`, {
      body: {
        status
      }
    }).catch(e => {
      console.log('Um erro aconteceu.', e)
    })
  }
}

export {
  Utils
}
