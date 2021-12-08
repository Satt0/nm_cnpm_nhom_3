const NhanKhauResolver=require('../../models/person/resolver')
const UserResolver=require('../../models/user/resolver')
const HoKhauResolver=require('../../models/family/resolver')
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
    ...HoKhauResolver.root,

    Query:{
        ...defaultQuery,
        ...NhanKhauResolver.Query,
        ...UserResolver.Query,
        ...HoKhauResolver.Query
    },
    Mutation:{
        ...defaultMutation,
        ...NhanKhauResolver.Mutation,
        ...UserResolver.Mutation,
        ...HoKhauResolver.Mutation
    }
}