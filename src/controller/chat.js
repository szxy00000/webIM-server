const graph = require('../graphql/chat')

exports.chatHistory = async ctx => {
  return graph(await ctx.mongo.db('test').collection('chat').find().toArray(), ctx.query.query)
}