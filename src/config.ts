export default {
    token: process.env.TOKEN as string,
    clientid: process.env.CLIENTID as string,
    dbUrl: process.env.DBURL as string,
    spotifyId: process.env.SPOTIFYID as string,
    spotifySecret: process.env.SPOTIFYSECRET as string,
    lava_password1: process.env.LAVASERVERPASSWD1 as string,
    lava_password2: process.env.LAVASERVERPASSWD2 as string,
    lava_host1: process.env.LAVASERVERHOST1 as string,
    lava_host2: process.env.LAVASERVERHOST2 as string,
    debug: process.env.DEBUG as string,
}