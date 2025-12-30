import { MongoClient } from "mongodb";

export async function connectMongo({uri, dbName}){

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db(dbName);
    console.log("MongoDb connected : ", db.databaseName);

    return db;
}

const db = await connectMongo({
  uri: process.env.URI,
  dbName: process.env.DATABASE,
});

export default db;