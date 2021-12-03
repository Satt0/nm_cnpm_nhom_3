const {gql}=require('apollo-server-express')

module.exports=gql`
    type Account{
        ID:Int!
        username:String!
        role:Int!
        token:String!
    }
    input inputLogin{
        username:String!
        password:String!
    }
    input inputSignup{
        username:String!
        password:String!
        role:Int!
    }
    extend type Query{
        logIn(input:inputLogin!):Account!
    }
    extend type Mutation{
        signUp(input:inputSignup!):Account!
    }

`