
<h1 align="center">
  <br>
  <img src="./.github/images/earth.png" alt="Earth" width="200">
  <br>
  Earth
  <br>
</h1>

<h4 align="center">Apenas mais um Bot do Discord.</h4>

<p align="center">
  <a href="#introdução">Introdução</a> •
  <a href="#instalação">Instalação</a> •
  <a href="#créditos">Créditos</a> •
  <a href="#licensa">Licensa</a>
</p>

 ```
 $ node dist/index
  _____           _   _     
 | ____|__ _ _ __| |_| |__  
 |  _| / _` | '__| __| '_ \ 
 | |__| (_| | |  | |_| | | |
 |_____\__,_|_|   \__|_| |_|
 ```
## Introdução

A Earth é um bot de música totalmente gratuito e de código aberto. 

## Instalação

Pra rodar o código da Earth localmente é muito facil, clone o repositorio, defina as variaveis do .env, instale as dependencias e seja feliz!

## Créditos

**Tecnologias utilizadas**
- [TypeScript](https://www.typescriptlang.org/pt/)
- [Discord.js](https://discord.js.org/)
- [Node.js](https://nodejs.org/)
- [Lavalink](https://github.com/lavalink-devs/Lavalink)

## Licensa

MIT

## Guia para criar novos comandos

- Crie a tradução do comando no seu devido arquivo (você pode criar traduções para novos idiomas, se você quiser)

**A estrutura de um comando é definida assim**
````ts
import { Command } from "../../Sructures/Command";
import { ChatInputCommandInteraction } from "discord.js";
import { Portuguese } from "../../Languages/pt-BR"; // Todas as traduções em Português (do Brasil)
import { English } from "../../Languages/en-US"; // Todas as traduções em inglês

class CommandName extends Command { // <command> é o nome do comando no arquivo da tradução, tem que ser o mesmo nome (no caso a chave)
    data = new SlashCommandBuilder()
        .setName(English.commands.<command>.name) // Nome padrão do comando (versão inglês)
        .setNameLocalizations({
            "pt-BR": Portuguese.commands.<command>.name, // Nome padrão do comando em pt-br.
        })
        .setDescription(English.commands.<command>.description) // Descrição padrão do comando (também em inglês)
        .setDescriptionLocalizations({
            "pt-BR": Portuguese.commands.<command>.description, // Descrição do comando em pt-br.
        })
    options: undefined // Opções para os comandos de música, verifique a classe Command (a que ta sendo extentida) para saber quais são.
    async execute(interaction: ChatInputCommandInteraction) {
      // Corpo do comando
      /*
        E como eu sei qual idioma o bot tem que responder? Bom, você não precisa. Apenas use o this.language.<command>, que você já vai ter todas as traduções de forma automatica, o idioma é difinido no evento de criação da interação e logo em seguida definido na classe.
      */
    }
}

export default CommandName // Exportando ele pra fora.
```

Espero ter ajudado você 😉, lembre-se que críticas são sempre bem-vindas.