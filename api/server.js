const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://gabrielgschoenfelder:zMtkTW2VIx8r2nkN@cluster0.o16klc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongo() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}
connectToMongo();

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const database = client.db('banco-de-colaboradores'); 
      const collection = database.collection('users'); 
      const result = await collection.insertOne(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error inserting data' });
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
};
