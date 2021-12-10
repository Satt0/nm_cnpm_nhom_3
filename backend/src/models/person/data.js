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
      maNhanKhau,
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
      maNhanKhau,
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
      "idNguoiTao","maNhanKhau",
      "daXoa")
        VALUES ($1,$2, $3,$4,$5, $6, $7,$8, 
          $9,$10,$11, $12,$13,$14, $15,$16,$17, $18,
          $19,$20, $21,$22,$23, $24,$25,$26,$27,false)
           
           
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
      where nk."ID"=$1 and nk."daXoa"=false
      limit 1;
      `;
      const { rows, rowCount } = await DB.query(text, [ID]);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch {
      throw new Error("Không tìm thấy nhân khẩu!");
    }
  }
  async getManyPerson({ limit = 20, offset = 0, name = "" }) {
    try {
      const text = `
      select * from nm_ccnpm.nhan_khau nk
      where nk."hoTen" like $3 and nk."daXoa"=false
      limit $1
      offset $2;
      `;
      const value = [limit, offset, `%${name}%`];
      const { rows } = await DB.query(text, value);

      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("khong the tim danh sach phu hop");
    }
  }
  async getFamilyMember({ idHoKhau }) {
    const text = `
   select * from nm_ccnpm.thanh_vien_cua_ho tv
   join nm_ccnpm.nhan_khau nk
   on nk."ID"=tv."idNhanKhau"
   where tv."idHoKhau"=$1;
    `;
    const values=[idHoKhau]
    const {rows}=await DB.query(text,values)
    return rows
  }
}
class UserUpdate {
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
      maNhanKhau,
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
      maNhanKhau,
      ID,
    ];
  }
  async UPDATE() {
    return await this._init();
  }
  async _init() {
    this.client = await DB.connect();
    try {
      await this.client.query("BEGIN");
      await this._updateNhanKhau();
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
  async _updateNhanKhau() {
    const text = `
    UPDATE ${process.env.PG_NHAN_KHAU} nk
    SET "hoTen"=$1, "bietDanh"=$2, "namSinh"=$3, "gioiTinh"=$4,
    "noiSinh"=$5, "nguyenQuan"=$6, "danToc"=$7, "tonGiao"=$8, "quocTich"=$9,
    "soHoChieu"=$10,"noiThuongTru"=$11, "diaChiHienNay"=$12, "trinhDoHocVan"=$13, "trinhDoChuyenMon"=$14,
    "bietTiengDanToc"=$15, "trinhDoNgoaiNgu"=$16, "ngheNghiep"=$17, "noiLamViec"=$18,
    "tienAn"=$19, "ngayChuyenDen"=$20, "lyDoChuyenDen"=$21, "ngayChuyenDi"=$22, 
    "lyDoChuyenDi"=$23, "diaChiMoi"=$24,"maNhanKhau"=$25
    WHERE nk."ID"=$26
    
    RETURNING *;
      `;

    const values = this.values;
    console.log(this.values.length);
    const { rows } = await this.client.query(text, values);

    this.nhan_khau = rows[0];
  }
}
class UserDelete {
  async deleteOnePerson({ ID, idNguoiXoa }) {
    try {
      const text = `
      UPDATE ${process.env.PG_NHAN_KHAU} nk
      SET
        "daXoa"=true,
        "idNguoiXoa"=$1,
        "ngayXoa"=now()
      where nk."ID"=$2 and nk."daXoa"=false
      RETURNING *;
      `;
      const values = [idNguoiXoa, ID];

      const { rowCount } = await DB.query(text, values);
      return rowCount > 0;
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể xóa nhân khẩu!");
    }
  }
  async restoreOnePerson({ ID }) {
    try {
      const text = `
      UPDATE ${process.env.PG_NHAN_KHAU} nk
      SET
        "daXoa"=false,
        "idNguoiXoa"=null,
        "ngayXoa"=null
      where nk."ID"=$1 and nk."daXoa"=true
      RETURNING *;
      `;
      const values = [ID];
      const { rowCount } = await DB.query(text, values);
      return rowCount > 0;
    } catch (e) {
      console.log(e.message);
      throw new Error("Không thể khôi phục nhân khẩu!");
    }
  }
}
class TieuSu {
  constructor() {}
  async timTieuSu({ idNhanKhau }) {
    try {
      const text = `
      SELECT "ID", "idNhanKhau", "tuNgay", "denNgay", "diaChi", "ngheNghiep", "noiLamViec"
      FROM ${process.env.PG_TIEU_SU_TABLE} ts
      WHERE ts."idNhanKhau"=$1
      ORDER by ts."tuNgay";
      `;
      const values = [idNhanKhau];
      const { rows } = await DB.query(text, values);
      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("Không thể tìm tiểu sử!");
    }
  }
  async taoTieuSu({
    idNhanKhau,
    diaChi,
    ngheNghiep,
    tuNgay,
    denNgay,
    noiLamViec,
  }) {
    try {
      const text = `
      INSERT INTO ${process.env.PG_TIEU_SU_TABLE}(
         "idNhanKhau", "tuNgay", "denNgay", "diaChi", "ngheNghiep", "noiLamViec")
        VALUES ($1,$2,$3,$4,$5,$6) RETURNING *;
      `;
      const values = [
        idNhanKhau,
        tuNgay,
        denNgay,
        diaChi,
        ngheNghiep,
        noiLamViec,
      ];

      const { rows } = await DB.query(text, values);
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("Không thể tạo tiểu sử!");
    }
  }
  async xoaTieuSu({ ID }) {
    try {
      const text = `
      DELETE FROM ${process.env.PG_TIEU_SU_TABLE} ts
      
      WHERE ts."ID"=$1 
      RETURNING *; 
      `;
      const values = [ID];

      const { rowCount } = await DB.query(text, values);

      return rowCount > 0;
    } catch (e) {
      console.log(e.message);
      throw new Error("Không thể tạo tiểu sử!");
    }
  }
}
class QuanLyNhanKhau {
  constructor(instance) {
    this.client = instance;
  }

  async nhapKhauMotNguoi({ idHoKhau, idNhanKhau, quanHeVoiChuHo }) {
    const text = `
      INSERT INTO ${process.env.PG_THANH_VIEN_CUA_HO}("idNhanKhau","idHoKhau","quanHeVoiChuHo")
      VALUES($1,$2,$3) RETURNING *;
      `;
    const values = [idNhanKhau, idHoKhau, quanHeVoiChuHo];
    const { rows, rowCount } = await this.client.query(text, values);
    if (rowCount > 0) return rows[0];

    throw new Error();
  }
  async nhapKhauNhieuNguoi(danhSach = []) {
    const result = await Promise.all(
      danhSach.map((nhan_khau) => this.nhapKhauMotNguoi(nhan_khau))
    );
    return result;
  }
}
module.exports = { UserCreation, UserQuery, UserUpdate, UserDelete, TieuSu ,QuanLyNhanKhau};
