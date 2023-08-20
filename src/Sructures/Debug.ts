import chalk from 'chalk'

class Debug {
    private getCurrentTime(): string {
        const date: Date = new Date()
        const times = {
            hours: date.getHours(),
            minutes: date.getMinutes(),
            seconds: date.getSeconds()
        }
        return `${times.hours.toString().length === 1 ? "0" + times.hours.toString() : times.hours}:${times.minutes.toString().length === 1 ? "0" + times.minutes.toString() : times.minutes}:${times.seconds.toString().length === 1 ? "0" + times.seconds.toString() : times.seconds}`
    }
    public Log(message?: string): void{
        console.log(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${message}`)
    }
    public Error(message?: string): void{
        console.error(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${chalk.red(message)}`)
    }
    public Alert(message?: string): void{
        console.warn(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${chalk.yellow(message)}`)
    }
    public Emphasis(message?: string): void{
        console.warn(`${chalk.magenta(`[${this.getCurrentTime()}]`)} ${chalk.bold.green(message)}`)
    }
}

export {
    Debug
}