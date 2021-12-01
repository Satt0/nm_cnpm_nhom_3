const loadServer=require('./src/app')
const typeDefs=require('./src/configs/graphql/TypeDef')
const resolvers=require('./src/configs/graphql/resolver')
loadServer(typeDefs,resolvers)
