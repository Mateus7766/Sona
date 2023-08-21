import * as dotenv from 'dotenv'
dotenv.config();

(async () => {
    await import("./validade")
    await import("./Database/Mongoose")
    await import("./Sructures/Client")
})()
