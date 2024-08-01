const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://gabrielgschoenfelder:zMtkTW2VIx8r2nkN@cluster0.o16klc6.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

module.exports = async (req, res) => {
  // Adiciona cabeçalhos CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permite todas as origens, ajuste conforme necessário
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    // Responde a requisições preflight
    res.writeHead(200);
    res.end();
    return;
  }
  
  if (req.method === 'POST') {
    try {
      await client.connect();
      const database = client.db('banco-de-colaboradores');
      const collection = database.collection('users');
      const result = await collection.insertOne(req.body);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.status(500).json({ message: 'Error inserting data' });
    } finally {
      await client.close(); // Fechar a conexão após a operação
    }
  } else {
    res.status(405).end(); // Método não permitido
  }
};
