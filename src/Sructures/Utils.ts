import axios from 'axios';
import { load } from 'cheerio';

class Utils {
  async getDefinition(word: string, language: 'pt-BR' | 'en-US') {
    try {
      if (language == 'pt-BR') {
        const URL = `https://api.dicionario-aberto.net/word/${word}`
        const res = (await axios.get(URL)).data[0].xml

        const regex = /<def>(.*?)<\/def>/s;
        const match = res.match(regex);

        return match[1].trim().split('\n')[0] // Dica

      } else {
        const URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        const res = await axios.get(URL)
        return res.data[0].meanings[0].definitions[0].definition
      }
    } catch (e) {
      return null
    }
  }

  async getRandomWord(language: 'pt-BR' | 'en-US') {
    let URL: string;
    if (language == "en-US") URL = 'https://www.palabrasaleatorias.com/random-words.php?fs=1&fs2=0&Submit=New+word'
    else URL = 'https://www.palavrasaleatorias.com/?fs=1&fs2=1&Submit=Nova+palavra';

    try {
      const resposta = await axios.get(URL);
      const $ = load(resposta.data);
      const palavraAleatoria = $('div[style="font-size:3em; color:#6200C5;"]').text().trim();

      return palavraAleatoria;
    } catch (erro) {
      return null;
    }
  }
}

export {
  Utils
}
