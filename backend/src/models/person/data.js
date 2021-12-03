const DB = require("../../helpers/database/postgres");

class UserCreation {
  constructor(newUser) {
    const {
      hoTen,
      bietDanh,
      namSinh,
      gioiTinh,
      noiSinh,
      nguyenQuan,
      danToc,
      tonGiao,
      quocTich,
      soHoChieu,
      noiThuongTru,
      diaChiHienNay,
      trinhDoHocVan,
      trinhDoChuyenMon,
      bietTiengDanToc,
      trinhDoNgoaiNgu,
      ngheNghiep,
      noiLamViec,
      tienAn,
      ngayChuyenDen,
      lyDoChuyenDen,
      ngayChuyenDi,
      lyDoChuyenDi,
      diaChiMoi,
      ngayTao,
      idNguoiTao,
    } = newUser;
    this.values = [
      hoTen,
      bietDanh,
      namSinh,
      gioiTinh,
      noiSinh,
      nguyenQuan,
      danToc,
      tonGiao,
      quocTich,
      soHoChieu,
      noiThuongTru,
      diaChiHienNay,
      trinhDoHocVan,
      trinhDoChuyenMon,
      bietTiengDanToc,
      trinhDoNgoaiNgu,
      ngheNghiep,
      noiLamViec,
      tienAn,
      ngayChuyenDen,
      lyDoChuyenDen,
      ngayChuyenDi,
      lyDoChuyenDi,
      diaChiMoi,
      ngayTao,
      idNguoiTao,
    ];
  }
  async CREATE() {
    return await this._init();
  }
  async _init() {
    this.client = await DB.connect();
    try {
      await this.client.query("BEGIN");
      await this._insertNhanKhau();
      await this.client.query("COMMIT");

      return this.nhan_khau;
    } catch (e) {
      console.log(e.message);
      await this.client.query("ROLLBACK");
      throw new Error("Không thể tạo nhân khẩu mới! ");
    } finally {
      await this.client.release();
    }
  }
  async _insertNhanKhau() {
    const text = `
      INSERT INTO ${process.env.PG_NHAN_KHAU}(
      "hoTen",          "bietDanh",      "namSinh",         "gioiTinh",
      "noiSinh",        "nguyenQuan",    "danToc",          "tonGiao",
      "quocTich",       "soHoChieu",     "noiThuongTru",
      "diaChiHienNay",  "trinhDoHocVan", "trinhDoChuyenMon",
      "bietTiengDanToc","trinhDoNgoaiNgu", "ngheNghiep",
      "noiLamViec",     "tienAn",        "ngayChuyenDen",  "lyDoChuyenDen",
      "ngayChuyenDi",   "lyDoChuyenDi",   "diaChiMoi",    "ngayTao",
      "idNguoiTao",
      "daXoa")
        VALUES ($1,$2, $3,$4,$5, $6, $7,$8, 
          $9,$10,$11, $12,$13,$14, $15,$16,$17, $18,
          $19,$20, $21,$22,$23, $24,$25,$26,false)
           
           
           RETURNING *;
      `;
    const values = this.values;
    const { rows } = await this.client.query(text, values);

    this.nhan_khau = rows[0];
  }
}
class UserQuery {
  constructor() {}
  async getOnePerson({ ID }) {
    try {
      const text = `
      select * from ${process.env.PG_NHAN_KHAU} nk
      where nk."ID"=$1
      limit 1;
      `;
      const {rows}=await DB.query(text,[ID])
      return rows[0]
    } catch {
      throw new Error("Không tìm thấy nhân khẩu!");
    }
  }
  async getManyPerson({limit=20,offset=0,name=""}){
    
    try{
      const text=`
      select * from nm_ccnpm.nhan_khau nk
      where nk."hoTen" like $3
      limit $1
      offset $2;
      `
      const value=[limit,offset,`%${name}%`]
      const {rows}=await DB.query(text,value);
    
      return rows
    }catch(e){
      console.log(e.message);
      throw new Error("khong the tim danh sach phu hop")
    }
  }
}
class UserUpdate{
  constructor(updatedUser) {
    const {
      ID,
      hoTen,
      bietDanh,
      namSinh,
      gioiTinh,
      noiSinh,
      nguyenQuan,
      danToc,
      tonGiao,
      quocTich,
      soHoChieu,
      noiThuongTru,
      diaChiHienNay,
      trinhDoHocVan,
      trinhDoChuyenMon,
      bietTiengDanToc,
      trinhDoNgoaiNgu,
      ngheNghiep,
      noiLamViec,
      tienAn,
      ngayChuyenDen,
      lyDoChuyenDen,
      ngayChuyenDi,
      lyDoChuyenDi,
      diaChiMoi,
      
      
    } = updatedUser;
    this.values = [

      hoTen,
      bietDanh,
      namSinh,
      gioiTinh,
      noiSinh,
      nguyenQuan,
      danToc,
      tonGiao,
      quocTich,
      soHoChieu,
      noiThuongTru,
      diaChiHienNay,
      trinhDoHocVan,
      trinhDoChuyenMon,
      bietTiengDanToc,
      trinhDoNgoaiNgu,
      ngheNghiep,
      noiLamViec,
      tienAn,
      ngayChuyenDen,
      lyDoChuyenDen,
      ngayChuyenDi,
      lyDoChuyenDi,
      diaChiMoi,
      ID
    ];
  }
  async CREATE() {
    return await this._init();
  }
  async _init() {
    this.client = await DB.connect();
    try {
      await this.client.query("BEGIN");
      await this._insertNhanKhau();
      await this.client.query("COMMIT");

      return this.nhan_khau;
    } catch (e) {
      console.log(e.message);
      await this.client.query("ROLLBACK");
      throw new Error("Không thể cập nhật nhân khẩu! ");
    } finally {
      await this.client.release();
    }
  }
  async _insertNhanKhau() {
    const text = `
      
      `;
    const values = this.values;
    const { rows } = await this.client.query(text, values);

    this.nhan_khau = rows[0];
  }
}
module.exports = { UserCreation ,UserQuery};
