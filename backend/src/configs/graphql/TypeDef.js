const {gql}=require('apollo-server-express')


const defaultTypeDef=gql`
type Query{
    test:String!
}
type Mutation{
    test:String!
}

`


module.exports=[defaultTypeDef /* other TypeDefs placed after this.*/   ]