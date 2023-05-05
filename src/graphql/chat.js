const { graphql, GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLString, GraphQLInt } = require('graphql');

module.exports = async (list, source) => {
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