import mongoose from 'mongoose';
import { Debug } from '../Sructures/Debug';
import config from '../config';

const debug = new Debug()

mongoose.connect(config.dbUrl)
    .then(() => debug.Emphasis("Conectado com sucesso ao Banco de dados."))
    .catch((error) => {
        if (error instanceof Error) debug.Error(`Ocorreu um erro ao se conectar ao Banco de dados. Erro: ${error.message}`)
});

