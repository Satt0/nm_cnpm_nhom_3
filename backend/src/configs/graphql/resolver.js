const NhanKhauResolver=require('../../models/person/resolver')


const defaultQuery={
    test:()=>"query works."
}
const defaultMutation={
    test:()=>"mutation works."
}


module.exports={
    // Field resolvers here.
    ...NhanKhauResolver.root,

    Query:{
        ...defaultQuery,
        ...NhanKhauResolver.Query
    },
    Mutation:{
        ...defaultMutation,
        ...NhanKhauResolver.Mutation
    }
}