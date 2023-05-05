import graph from '../graphql/chat';

export const chatHistory = async (ctx: any) => {
  return graph(await ctx.mongo.db('test').collection('chat').find().toArray(), ctx.query.query)
}