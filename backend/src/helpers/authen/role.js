const { TokenManagement } = require("./jwt");

class AuthenUser {
  constructor(token = "") {
    const jwt = new TokenManagement();
    const user = jwt.verifyToken(token.substring("Bearer ".length));
    if (typeof user==='object') {
      this.user = user;
      return;
    }
    throw new Error("invalid token!");
  }
  checkRole(role = 0) {
    if (typeof role !== "number") throw new Error("lỗi role!");
    return role <= this.user.role;
  }
}

module.exports = { AuthenUser };
