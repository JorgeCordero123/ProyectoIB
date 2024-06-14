import { envs } from "./config";
import { MongoDataBase } from "./data/mongodb";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";


const main = async () => {

    await MongoDataBase.connect({
        dbName:envs.MONGO_DB_NAME,
        mongoUrl:envs.MONGO_URL
    })

    const server = new Server({
        port: envs.PORT,
        routes: AppRoutes.routes
    });

    await server.start();
}

(() => main())()