import { ExpressApp } from './expressApp';
import { logger } from './utils/logger';

const PORT = process.env.PORT || 8000;

export const StartServer = async () => {
    const expressApp = await ExpressApp();
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