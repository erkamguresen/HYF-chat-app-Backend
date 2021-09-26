const { MongoClient } = require('mongodb');

const persistentDataAccess = (collectionName) => {
  const uri = process.env.MONGODB_URI;
  // const uri =
  // 'mongodb+srv://hyfchatapp:wiKzqPAbVaQtVlWG@mern-stack-tutorial.0prqd.mongodb.net/HYF-Chat?retryWrites=true&w=majority';

  const client = new MongoClient(uri);

  const dbName = 'HYF-Chat';
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  return {
    getAll: async (filter = {}) => {
      let result;
      try {
        await client.connect();
        result = await collection.find(filter).toArray();
      } catch (err) {
        return err;
      } finally {
        await client.close();
      }

      return result;
    },
    getById: async (id) => {
      let result;
      try {
        await client.connect();
        result = await collection.findOne({ _id: id });
      } catch (err) {
        return err;
      } finally {
        await client.close();
      }

      return result;
    },
    insert: async (data) => {
      let result;
      try {
        await client.connect();
        result = await collection.insertOne(data);
      } catch (err) {
        return err;
      } finally {
        await client.close();
      }

      return result;
    },
    // exp.: data = { text: 'hi again' }
    update: async (id, data) => {
      let result;
      try {
        await client.connect();
        result = await collection.updateOne({ _id: id }, { $set: data });
      } catch (err) {
        return err;
      } finally {
        await client.close();
      }

      return result;
    },
    delete: async (id) => {
      let result;
      try {
        await client.connect();
        result = await collection.deleteOne({ _id: id });
      } catch (err) {
        return err;
      } finally {
        await client.close();
      }

      return result;
    },
  };
};

module.exports = persistentDataAccess;
