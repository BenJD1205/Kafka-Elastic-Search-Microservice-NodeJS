import expressApp from './express-app';

const PORT = process.env.APP_PORT || 9000;

export const StartServer = async () => {
    expressApp.listen(PORT, () => {
        console.log('listening on port', PORT);
    })
    process.on('uncaughtException', async (err) => {
        console.log(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    console.log("Server is up");
})