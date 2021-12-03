const {UserCreation,UserQuery}=require('./data')


const root={

}
const Query={
    thongTinNhanKhau:async(_,{input},__,___)=>{
        const process=new UserQuery()
        return await process.getOnePerson({ID:input});
    
    
        },
    timNhanKhau:async(_,{input},__,___)=>{
        const process=new UserQuery()
        return await process.getManyPerson(input);
    
    
        },
}
const Mutation={
    taoNhanKhau:async(_,{input},__,context)=>{
    const idNguoiTao=context.ID??2;
    const process=new UserCreation({...input,idNguoiTao})
    return await process.CREATE();


    },
    capNhatNhanKhau:()=>{},
    xoaNhanKHau:()=>{return false},
}

module.exports={root,Query,Mutation}