import mongoose from 'mongoose';
import { Debug } from '../Sructures/Debug';

const debug = new Debug()

mongoose.connect(process.env.DBURL as string)
    .then(() => debug.Emphasis("Conectado com sucesso ao Banco de dados."))
    .catch((error) => {
        if (error instanceof Error) debug.Error(`Ocorreu um erro ao se conectar ao Banco de dados. Erro: ${error.message}`)
});

