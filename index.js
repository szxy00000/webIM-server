const { createServer } = require('http');
const { Server } = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = 'mongodb+srv://Cluster29796:nke2Cxpt54ESTrVt@cluster29796.xnopgm4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});


const database = client.db("test");
const chats = database.collection("chats");

io.on('connection', socket => {
  socket.on('chat', async arg => {
    chats.insertOne(arg).then(() => {
      chats.find({}).toArray().then(res => {
        io.emit('sync', res);
      })
    })
  });
});

io.listen(7777);



