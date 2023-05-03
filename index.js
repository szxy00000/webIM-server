const { createServer } = require('http');
const { Server } = require('socket.io');
const { MongoClient, ServerApiVersion } = require('mongodb');
const { graphql, buildSchema } = require("graphql")

/**
 * mongodb
 */
const uri = 'mongodb+srv://Cluster29796:aOUbCPqRXILpAY1i@cluster29796.xnopgm4.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const database = client.db("test");
const chats = database.collection("chats");

/**
 * graphql
 */
const schema = buildSchema(`
  type User {
    id: Int
    nick: String
    icon: String
  }
  type Query {
    user: User
    content: String
  }
`)

function getList() {
  return chats.find({}).toArray().then(res => {
    return Promise.all(res.map(one => {
      return graphql({
        schema,
        source: "{ user { id nick icon } content }",
        rootValue: one,
      })
    }))
  })
}
 
/**
 * websocket
 */
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

const list = []
io.on('connection', socket => {
  socket.on('chat', async arg => {
    list.push(arg);
    io.emit('sync', list);
    return;
    chats.insertOne(arg).then(() => {
      getList().then(res => {
        io.emit('sync', res);
      });
    })
  });
});

io.listen(7777);



