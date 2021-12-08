const DB = require("../../helpers/database/postgres");

const { diff } = require("deep-object-diff");

const diffHoKhau = (o, n) => {
  const cmp = diff(o, n);
  const log = [];
  for (let [key, val] of Object.entries(cmp)) {
    const newLog = {
      thongTinThayDoi: key,
      thayDoiTu: o[key],
      doiThanh: val,
    };
    log.push(newLog);
  }
  return log;
};

class timHoKhau {
  constructor() {}
  async findOne({ ID }) {
    try {
      const text = `
            SELECT * FROM ${process.env.PG_HO_KHAU_TABLE} hk
            where hk."ID"=$1;
            `;
      const { rows } = await DB.query(text, [ID]);
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể tìm nhân khẩu!");
    }
  }
  async findMany({ limit = 20, offset = 0 }) {}
}
class taoHoKhau {
  constructor(hoKhauMoi) {
    const { maHoKhau, idChuHo, maKhuVuc, diaChi, ngayChuyenDi } = hoKhauMoi;
  
    this.hoKhauMoi = [idChuHo, maKhuVuc, diaChi, ngayChuyenDi, maHoKhau];
    return;
  }
  async CREATE() {
    try {
      const text = `
            INSERT INTO ${process.env.PG_HO_KHAU_TABLE}(
            "idChuHo", "maKhuVuc", "diaChi", "ngayChuyenDi", "maHoKhau")
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;
            `;
      const { rows } = await DB.query(text, this.hoKhauMoi);
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể tạo hộ khẩu mới, kiểm tra lại đầu vào.");
    }
  }
}
class capNhatHoKhau {
  constructor(hoKhauMoi) {
    const {
      maHoKhau,
      idChuHo,
      maKhuVuc,
      diaChi,
      ngayChuyenDi,
      ID,
      dinhChinh = [],
    } = hoKhauMoi;
    this.ID = ID;
    this.hoKhauMoi = [idChuHo, maKhuVuc, diaChi, ngayChuyenDi, maHoKhau];
    this.dinhChinh = dinhChinh;
    this.result = {};
  }
  async UPDATE({ nguoiThayDoi = -1 }) {
    this.nguoiThayDoi = nguoiThayDoi;
    this.client = await DB.connect();
    try {
      await this.client.query("BEGIN");
      await this._getPreviousInformation();
      await this._updateInformation();
      await this._createLog();
      await this.client.query("COMMIT");

      return this.newDiff;
    } catch (e) {
      console.log(e.message);
      await this.client.query("ROLLBACK");
      throw new Error("không thể cập nhật hộ khẩu.");
    } finally {
      await this.client.release();
    }
  }
  async _getPreviousInformation() {
    const nhanKhau = new timHoKhau();
    this.oldHoKhau = await nhanKhau.findOne({ ID: this.ID });
  }
  async _updateInformation() {
    const text = `
        UPDATE ${process.env.PG_HO_KHAU_TABLE} hk
	    SET "idChuHo"=$1, "maKhuVuc"=$2, "diaChi"=$3, "ngayChuyenDi"=$4, "maHoKhau"=$5
	    WHERE hk."ID"=$6
        RETURNING *;`;
    const { rows } = await this.client.query(text, [...this.hoKhauMoi,this.ID]);
    this.newDiff = rows[0];
  }
  async _createLog() {
    this.compareLogs = diffHoKhau(this.oldHoKhau, this.newDiff);
    await Promise.all(this.compareLogs.map((_, index) => this.__insertOneLog(index)));
  }
  async __insertOneLog(index) {
    const { thongTinThayDoi, thayDoiTu, doiThanh } = this.compareLogs[index];

    const text = `
    INSERT INTO ${process.env.PG_DINH_CHINH_TABLE}(
    "idHoKhau", "thongTinThayDoi", "thayDoiTu", "doiThanh","nguoiThayDoi", "ngayThayDoi")
    VALUES ($1,$2,$3,$4,$5,now())
    RETURNING *;
    `;
    const values = [
      this.ID,
      thongTinThayDoi,
      thayDoiTu,
      doiThanh,
      this.nguoiThayDoi,
    ];
    const { rowCount } = await this.client.query(text, values);
    
    if(rowCount<1) throw new Error()
  }
}

class dinhChinh{
  constructor(){

  }
  async xoaDinhChinh({ID}){

  }
  async timDinhChinh({idHoKhau,limit=20,offset=0}){
    const text=`
    SELEcT * FROM ${process.env.PG_DINH_CHINH_TABLE} dc
    WHERE dc."idHoKhau"=$1
    limit $2
    offset $3;
    `
    const {rows}=await DB.query(text,[idHoKhau,limit,offset])
    return rows
  }
}

module.exports={timHoKhau,taoHoKhau,capNhatHoKhau,dinhChinh}