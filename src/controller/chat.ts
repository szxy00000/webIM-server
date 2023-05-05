import graph from '../graphql/chat';
import { Context } from 'koa';

export const chatHistory = async (ctx: Context) => {
  return graph(await ctx.mongo.db('test').collection('chat').find().toArray(), ctx.query.query + '')
}