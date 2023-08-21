import { bool, object, string, ValidationError } from "yup";
import { Debug } from "./Sructures/Debug";

const debug = new Debug()

const envSchema = object({
    TOKEN: string().required("The bot TOKEN was not specified in the .env file."),
    CLIENTID: string().required("The bot ID was not specified in the .env file."),
    DBURL: string().required("the database URL was not specified in the .env file."),
    DEBUG: bool().required("Especify the debug mode.")
})

envSchema.validate(process.env).catch((error: ValidationError) => {
    error.errors.forEach(el =>  debug.Error(el))
    debug.Alert("Stopping the bot process.")
    process.exit(0)
})