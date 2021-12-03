const {UserCreation,UserQuery,UserUpdate,UserDelete}=require('./data')
const {authenticate}=require('../../helpers/authen/authenResolver')

const root={

}
const Query={
    thongTinNhanKhau:authenticate(1,async(_,{input},__,___)=>{
       
        const process=new UserQuery()
        return await process.getOnePerson({ID:input});
    
    
        }),
    timNhanKhau:authenticate(1,async(_,{input},__,___)=>{
        const process=new UserQuery()
        return await process.getManyPerson(input);
    
    
        },)
}
const Mutation={
    taoNhanKhau:async(_,{input},context,__)=>{
    const idNguoiTao=context.user.ID
    const process=new UserCreation({...input,idNguoiTao})
    return await process.CREATE();


    },
    capNhatNhanKhau:async(_,{input},__,___)=>{
        
        const process=new UserUpdate(input)
        return await process.UPDATE();
    
    
        },
    xoaNhanKHau:async(_,{input},context,__)=>{
        
        const idNguoiXoa=context.user.ID
        const process=new UserDelete()
        return await process.deleteOnePerson({ID:input,idNguoiXoa});
    
    
        },
    khoiPhucNhanKhau:async(_,{input},__,___)=>{

        const process=new UserDelete()
        return await process.restoreOnePerson({ID:input});
    },

}

module.exports={root,Query,Mutation}