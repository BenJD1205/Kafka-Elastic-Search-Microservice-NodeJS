import expressApp from './express-app';
import { logger } from './utils';

const PORT = process.env.APP_PORT || 9000;

export const StartServer = async () => {
    expressApp.listen(PORT, () => {
        logger.info('listening on port', PORT);
    })
    process.on('uncaughtException', async (err) => {
        logger.error(err);
        process.exit(1);
    })
}

StartServer().then(() => {
    logger.info("Server is up");
})