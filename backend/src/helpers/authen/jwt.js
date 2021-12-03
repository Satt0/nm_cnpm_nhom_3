const jsonwebtoken = require("jsonwebtoken");

class TokenManagement {
  constructor() {
    this.privateKey = process.env.jwt_key ?? "randomsecretkey";
  }
  signToken(data) {
    try {
      return jsonwebtoken.sign(data, this.privateKey);
    } catch (e) {
      console.log(e.message);
      throw new Error("lỗi trả về token!");
    }
  }
  verifyToken(token) {
   
    try {
      return jsonwebtoken.verify(token, this.privateKey);
    } catch (e) {
      console.log(e.message);
      throw new Error("lỗi tạo token!");
    }
  }
}

module.exports={TokenManagement}