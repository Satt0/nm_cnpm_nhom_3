const DB=require('../../helpers/database/postgres')



class UserManagement{
    async signUpUser({username,password,role}){
        try{
            const text=`
            INSERT INTO ${process.env.PG_USER_TABLE}(
                username, password, role, date_created)
                VALUES ( $1,$2,$3,now())
                RETURNING *;
                
                `
                
        const values=[username,password,role]
        const {rows,rowCount}=await DB.query(text,values)
            if(rowCount>0){
                return rows[0]
            }
            throw new Error("không thể tạo tài khoản!");
        }catch(e){
            console.log(e.message);
            throw new Error("không thể tạo tài khoản!")
        }
        
    }
    async logInUser({username,password}){
        try{
            const text=`
            SELECT * FROM ${process.env.PG_USER_TABLE}
            WHERE username=$1 and password=$2 limit 1;
            
            `
            const values=[username,password]
            const {rows,rowCount}=await DB.query(text,values)
            if(rowCount>0){
                return rows[0]
            }
            throw new Error("không tồn tại tài khoản!");
        }catch(e){

        }
    }
}
module.exports={UserManagement}