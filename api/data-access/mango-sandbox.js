const { MongoClient } = require('mongodb');

/* 

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://<username>:<password>@mern-stack-tutorial.0prqd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/

async function main() {
  /**
   * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
   * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
   */
  const uri =
    'mongodb+srv://hyfchatapp:wiKzqPAbVaQtVlWG@mern-stack-tutorial.0prqd.mongodb.net/HYF-Chat?retryWrites=true&w=majority';
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    // const result = await client.db("sample_airbnb").collection("listingsAndReviews").insertOne(newListing);

    // get all documents from collection
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('Users')
    //   .find({})
    //   .toArray();

    // get all documents from collection with filter applied
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('Users')
    //   .find({ username: 'admin' })
    //   .toArray();

    // get one document from collection with username admin
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('Users')
    //   .findOne({ username: 'admin' });

    // insert new document into collection
    // const result = await client.db('HYF-Chat').collection('test').insertOne({
    //   text: 'hi again',
    //   user: 'er',
    //   date: new Date(),
    //   channelId: '6145e91149f3c7790eed8e9b',
    // });

    /*
    {
      acknowledged: true,
      insertedId: new ObjectId("6150ce2d79e0f786a18d9392")
    }
    */

    // console.log(result.insertedId.toString()); // 6150ce2d79e0f786a18d9392

    // insert many new documents into collection
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('test')
    //   .insertMany([
    //     {
    //       text: 'hi again',
    //       user: 'er',
    //       date: new Date(),
    //       channelId: '6145e91149f3c7790eed8e9b',
    //     },
    //     {
    //       username: 'erkam',
    //       password:
    //         '5dcfb71cb519dd8a882e94fa0c8ded4b894ae83ce1aeec92b60b8e8bb42fa044',
    //     },
    //     { name: 'welcome' },
    //   ]);

    /* result 
    {
        acknowledged: true,
        insertedCount: 3,
        insertedIds: {
            '0': new ObjectId("6150b42f84f33a09ab220375"),
            '1': new ObjectId("6150b42f84f33a09ab220376"),
            '2': new ObjectId("6150b42f84f33a09ab220377")
        }
    }
    */

    // get max # of documents from collection with filter and sort applied
    // const result = await client
    //   .db('sample_airbnb')
    //   .collection('listingsAndReviews')
    //   .find({
    //     bedrooms: { $gte: 1 },
    //     bathrooms: { $gte: 1 },
    //   })
    //   .sort({ last_review: -1 })
    //   .limit(30)
    //   .toArray();

    // update a document in collection (first one)
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('test')
    //   .updateOne({ text: 'hi again' }, { $set: { text: 'hi again again' } });

    /* 
        {
            acknowledged: true,
            modifiedCount: 0,
            upsertedId: null,
            upsertedCount: 0,
            matchedCount: 0
        }
    */

    // update all documents in collection
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('test')
    //   .updateMany({ text: 'hi again again' }, { $set: { text: 'hi again' } });

    // delete a document in collection (first one)
    // const result = await client
    //   .db('HYF-Chat')
    //   .collection('test')
    //   .deleteOne({ text: 'hi again' });

    // delete all documents in collection
    // const result = await client //{ acknowledged: true, deletedCount: 2 }
    //   .db('HYF-Chat')
    //   .collection('test')
    //   .deleteMany({ text: 'hi again' });

    // get all documents from collection
    //with a promise
    // const result = await new Promise((resolve, reject) => {
    // const result = client.db('HYF-Chat').collection('test').find({}).toArray();
    // });

    console.log(result);

    // Make the appropriate DB calls
    await listDatabases(client);
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log('Databases:');
  databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
