const NhanKhauResolver=require('../../models/person/resolver')
const UserResolver=require('../../models/user/resolver')

const defaultQuery={
    test:()=>"query works."
}
const defaultMutation={
    test:()=>"mutation works."
}


module.exports={
    // Field resolvers here.
    ...NhanKhauResolver.root,
    ...UserResolver.root,

    Query:{
        ...defaultQuery,
        ...NhanKhauResolver.Query,
        ...UserResolver.Query
    },
    Mutation:{
        ...defaultMutation,
        ...NhanKhauResolver.Mutation,
        ...UserResolver.Mutation
    }
}