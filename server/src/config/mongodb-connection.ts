import * as mongoose from 'mongoose';
import constants from './constants';
import { ProvideSingleton } from '../ioc';
import { logger } from "../logging/logging";

if (constants.isDevEnvironment) {
    mongoose.set('debug', true);
}

@ProvideSingleton(MongoDbConnection)
export class MongoDbConnection {
    public db: any;
    private readonly connectionString: string = constants.mongoConnectionString;

    constructor() {
        logger.info(`connecting to ${constants.environment} MongoDb`);
        this.db = mongoose.connect(this.connectionString + (constants.isTestEnvironment ? "_test" : ""), {
            useNewUrlParser: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }, function(err){
            if(err){
                logger.error(`Error connecting to database - ${err}`);
            }
        });
    }

    disconnect() {
        if (this.db) {
            this.db = null;
        }
    }
}
