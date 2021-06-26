import * as mongoose from 'mongoose';
import constants from './constants';

if (constants.isDevEnvironment) {
  mongoose.set('debug', true);
}
export class MongoDbConnection {
  public db: any;
  private readonly connectionString: string = constants.mongoConnectionString;

  constructor() {
    console.info(`connecting to MongoDb`);
    this.db = mongoose.connect(
      this.connectionString,
      {
        useNewUrlParser: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      function (err) {
        if (err) {
          console.error(`Error connecting to database - ${err}`);
        }
      }
    );
  }
}
