


const defaultQuery={
    test:()=>"query works."
}
const defaultMutation={
    test:()=>"mutation works."
}


module.exports={
    // Field resolvers here.


    Query:{
        ...defaultQuery
    },
    Mutation:{
        ...defaultMutation
    }
}