import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.MONGO_URI);

async function clearCollection() {
  try {
    await client.connect();
    const db = client.db("sample_mflix");
    const collection = db.collection("movies");

    const result = await collection.deleteMany({});
    console.log(`Deleted ${result.deletedCount} documents`);
  } catch (error) {
    console.error(error);
  } finally {
    await client.close();
  }
}

clearCollection();
