const DB = require("../../helpers/database/postgres");
const { QuanLyNhanKhau, UserQuery } = require("../person/data");
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
  async findMany({ limit = 20, offset = 0 }) {

    try {
      const text = `
            SELECT * FROM ${process.env.PG_HO_KHAU_TABLE} hk
            LIMIT $1
            OFFSET $2;
            `;
      const { rows } = await DB.query(text, [limit,offset]);
      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể tìm nhân khẩu!");
    }

  }
}
class taoHoKhau {
  constructor(hoKhauMoi, type = "new") {
    const {
      maHoKhau,
      idChuHo,
      maKhuVuc,
      diaChi,
      ngayChuyenDi,
      nhanKhau = [],
    } = hoKhauMoi;

    this.hoKhauMoi = [maKhuVuc, diaChi, ngayChuyenDi, maHoKhau];
    this.idChuHo = idChuHo;
    this.nhanKhau = nhanKhau;
    return;
  }
  async CREATE() {
    this.client = await DB.connect();
    try {
      await this.client.query("BEGIN");
      await this.createBasic();
      await this.insertNhanKhau();
      await this.insertChuHo();
      await this.client.query("COMMIT");
      return this.hoKhau;
    } catch (e) {
      console.log(e.message);
      await this.client.query("ROLLBACK");
      throw new Error("không thể tạo hộ khẩu mới, kiểm tra lại đầu vào.");
    } finally {
      await this.client.release();
    }
  }

  async createBasic() {
    const text = `
    INSERT INTO ${process.env.PG_HO_KHAU_TABLE}(
      "maKhuVuc", "diaChi", "ngayChuyenDi", "maHoKhau")
      VALUES ($1,$2,$3,$4)
      RETURNING *;
      `;
    const { rows } = await this.client.query(text, this.hoKhauMoi);
    this.hoKhau = rows[0];
  }
  async insertNhanKhau() {
    await Promise.all(
      this.nhanKhau.map(({ idNhanKhau, quanHeVoiChuHo }) => {
        const text = `
        INSERT INTO ${process.env.PG_THANH_VIEN_CUA_HO}
        ("idHoKhau","idNhanKhau","quanHeVoiChuHo")
      VALUES($1,$2,$3) RETURNING *;
        
        `;
        const values = [this.hoKhau.ID, idNhanKhau, quanHeVoiChuHo];
        return this.client.query(text, values);
      })
    );
  }
  async insertChuHo() {
    const text = `
    UPDATE ${process.env.PG_HO_KHAU_TABLE} hk
    SET "idChuHo"=$1
    WHERE hk."ID"=$2
      RETURNING *;
    
    `;
    const values = [this.idChuHo, this.hoKhau.ID];
    const { rows, rowsCount } = await this.client.query(text, values);

    if (rowsCount < 1) throw new Error();

    this.hoKhau = { ...rows[0] };
  }
  async tachHo() {}
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
    const { rows } = await this.client.query(text, [
      ...this.hoKhauMoi,
      this.ID,
    ]);
    this.newDiff = rows[0];
  }
  async _createLog() {
    this.compareLogs = diffHoKhau(this.oldHoKhau, this.newDiff);
    await Promise.all(
      this.compareLogs.map((_, index) => this.__insertOneLog(index))
    );
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

    if (rowCount < 1) throw new Error();
  }
}

class dinhChinh {
  constructor() {}
  async xoaDinhChinh({ ID }) {}
  async timDinhChinh({ idHoKhau, limit = 20, offset = 0 }) {
    const text = `
    SELEcT * FROM ${process.env.PG_DINH_CHINH_TABLE} dc
    WHERE dc."idHoKhau"=$1
    limit $2
    offset $3;
    `;
    const { rows } = await DB.query(text, [idHoKhau, limit, offset]);
    return rows;
  }
}

class QuanLyHoKhau {
  constructor(instance) {
    if (typeof instance === "object") {
      this.client = instance;
    }
  }
  async nhapKhanKhau(newNhanKhau) {
    this.client = await DB.connect();
    this.nguoiThayDoi = newNhanKhau.nguoiThayDoi;

    try {
      await this.client.query("BEGIN");
      
    
      
      const worker = new QuanLyNhanKhau(this.client);
      const result = await worker.nhapKhauMotNguoi(newNhanKhau);
      
      const { idHoKhau, idNhanKhau, quanHeVoiChuHo } = result;
      const Nhan_Khau = await new UserQuery().getOnePerson({ ID: idNhanKhau });
      this.idHoKhau=idHoKhau;
      this.S2="thêm nhân khẩu"
      this.S3="không có"
      this.S4=`thêm ${Nhan_Khau.hoTen} là ${quanHeVoiChuHo}`
      await this.saveHistory();
      await this.client.query("COMMIT");
      return result;
    } catch (e) {
      console.log(e.message);
      await this.client.query("ROllBACK");
      throw new Error("khong the nhap khau");
    } finally {
      await this.client.release();
    }
  }

  async saveHistory() {
   
    const text = `
      INSERT INTO ${process.env.PG_DINH_CHINH_TABLE}(
      "idHoKhau", "thongTinThayDoi", "thayDoiTu", "doiThanh","nguoiThayDoi", "ngayThayDoi")
      VALUES ($1,$2,$3,$4,$5,now())
      RETURNING *;
    `;
    const values = [
      this.idHoKhau,
      this.S2,
      this.S3,
      this.S4,
      this.nguoiThayDoi,
    ];
    const { rowCount } = await this.client.query(text, values);
    if (rowCount < 1)
      throw new Error("không thể lưu lịch sử thay đổi nhân khẩu.");
  }
  async xoaNhanKhau({idNhanKhau,idHoKhau,nguoiThayDoi}){
    console.log(idNhanKhau,idHoKhau);
    this.client=await DB.connect()
    try{
      await this.client.query("BEGIN");

      const text=`
      DELETE FROM ${process.env.PG_THANH_VIEN_CUA_HO}
	WHERE "idNhanKhau"=$1 and "idHoKhau"=$2 returning *;
      `
      const values=[idNhanKhau,idHoKhau]
      const {rows,rowCount}=await this.client.query(text,values)
      if(rowCount<1) throw new Error();
      
      const { quanHeVoiChuHo } = rows[0];
      const Nhan_Khau = await new UserQuery().getOnePerson({ ID: idNhanKhau });
      this.idHoKhau=idHoKhau;
      this.S2="xóa nhân khẩu"
      this.S3="không có"
      this.S4=`xóa ${Nhan_Khau.hoTen} là ${quanHeVoiChuHo}`
      this.nguoiThayDoi=nguoiThayDoi;
      await this.saveHistory();



      await this.client.query("COMMIT");
      return true;

    }catch(e){
      console.log(e.message);
      await this.client.query("ROLLBACK");
    }finally{
      await this.client.release()
    }
  }
  async capNhatNhanKhau({idNhanKhau,idHoKhau,nguoiThayDoi,quanHeVoiChuHo}){
    this.client=await DB.connect();
    try{
      await this.client.query("BEGIN");




      const text=`
      UPDATE ${process.env.PG_THANH_VIEN_CUA_HO} tvch
      SET  tvch."quanHeVoiChuHo"=$1
      WHERE tvch."idNhanKhau"=$2 and tvch."idHoKhau"=$3
      RETURING *;
      `
      const values=[quanHeVoiChuHo,idNhanKhau,idHoKhau];
      const {rows,rowCount}=await this.client.query(text,values);

      if(rowCount<1) throw new Error()
      const Nhan_Khau = await new UserQuery().getOnePerson({ ID: idNhanKhau });
      this.idHoKhau=idHoKhau;
      this.S2=`sửa nhân khẩu ${Nhan_Khau.hoTen}`
      this.S3=""
      this.S4=`sửa thành ${quanHeVoiChuHo}`
      this.nguoiThayDoi=nguoiThayDoi;
      await this.saveHistory();



      await this.client.query("COMMIT");
      return rows[0];

    }catch(e){
      console.log(e.message);
      await this.client.query("ROLLBACK");
    }finally{
      await this.client.release();
    }



  }

}
module.exports = {
  timHoKhau,
  taoHoKhau,
  capNhatHoKhau,
  dinhChinh,
  QuanLyHoKhau,
};
