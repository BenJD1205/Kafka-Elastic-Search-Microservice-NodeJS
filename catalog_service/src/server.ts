import expressApp from './expressApp';

const PORT = process.env.PORT || 8000;

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