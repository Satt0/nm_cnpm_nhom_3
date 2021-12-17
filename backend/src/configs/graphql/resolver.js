const NhanKhauResolver=require('../../models/person/resolver')
const UserResolver=require('../../models/user/resolver')
const HoKhauResolver=require('../../models/family/resolver')
const DongGopResolver=require('../../models/donation/resolver')

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
    ...DongGopResolver.root,

    Query:{
        ...defaultQuery,
        ...NhanKhauResolver.Query,
        ...UserResolver.Query,
        ...HoKhauResolver.Query,
        ...DongGopResolver.Query,
    },
    Mutation:{
        ...defaultMutation,
        ...NhanKhauResolver.Mutation,
        ...UserResolver.Mutation,
        ...HoKhauResolver.Mutation,
        ...DongGopResolver.Mutation
    }
}