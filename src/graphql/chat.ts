import { graphql, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } from 'graphql';

export default async (list: Object[], source: string) => {
  const UserType = new GraphQLObjectType({
    name: 'UserType',
    fields: {
      nick: {
        type: GraphQLString
      },
      icon: {
        type: GraphQLString
      }
    }
  })
  const MsgType = new GraphQLObjectType({
    name: 'MsgType',
    fields: {
        content: {
            type: GraphQLString
        },
        user: {
          type: UserType
        }
    }
  })
  
  var schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'QueryListType',
        fields: {
            list: {
                type: new GraphQLList(MsgType),
                resolve: (parent, args) => {
                    return list
                },
              }
        }
    }),
  });

  return await graphql({ schema, source });
}