import createApp from "./app";
import { sequelize } from "./common/sequalize";

const port = process.env.API_PORT;

(async () => {

    await sequelize.authenticate();

    await sequelize.sync();

    const app = await createApp();

    app.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
})();