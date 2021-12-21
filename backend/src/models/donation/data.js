const DB = require("../../helpers/database/postgres");

class QuanLyDongGop {
  constructor() {}

  async taoDongGop(khoanDongGop) {
    try {
      const { tenKhoanDong, soTien, donVi, theLoai } = khoanDongGop;

      const text = `
            INSERT INTO ${process.env.PG_DONG_GOP}(
            "tenKhoanDong",  "soTien", "donVi", "theLoai", "hoanThanh","ngayTao")
            VALUES ( $1, $2, $3, $4, false, now()) 
            RETURNING *;
            `;
      const value = [tenKhoanDong, soTien, donVi, theLoai];

      const { rows, rowCount } = await DB.query(text, value);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể tạo khoản đóng góp!");
    }
  }
  async taoKhoanThu(khoanThu) {
    try {
      const { idDongGop, idHoKhau, daDong } = khoanThu;
      const text = `
            INSERT INTO ${process.env.PG_HO_KHAU_DONG_GOP}(
                "idHoKhau", "idDongGop", "daDong", "ngayDong")
                VALUES ($1, $2, $3,now()) RETURNING *;
            `;
      const values = [idHoKhau, idDongGop, daDong];
      const { rows, rowCount } = await DB.query(text, values);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể tạo khoản đóng!");
    }
  }
  // udpate.
  async capNhatDongDop(capNhat) {
    try {
      const { tenKhoanDong, soTien, donVi, theLoai, hoanThanh, ID } = capNhat;
      const text = `
      UPDATE ${process.env.PG_DONG_GOP}
	    SET "tenKhoanDong"=$1, "soTien"=$2, "donVi"=$3, "theLoai"=$4, "hoanThanh"=$5
	    WHERE "ID"=$6 RETURNING *;
      `;
      const values = [tenKhoanDong, soTien, donVi, theLoai, hoanThanh, ID];
      const { rows, rowCount } = await DB.query(text, values);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không thể cập nhật!");
    }
  }
  async capNhanKhoanThu(capNhat) {
    try {
      const { idHoKhau, idDongGop, daDong } = capNhat;
      const text = `
      UPDATE ${process.env.PG_HO_KHAU_DONG_GOP}
	SET  "daDong"=$1, "ngayDong"=now()
	WHERE  "idHoKhau"=$2 and "idDongGop"=$3 RETURNING *;
      `;
      const values = [daDong, idHoKhau, idDongGop];
      const { rows, rowCount } = await DB.query(text, values);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("khong the cap nhat");
    }
  }
  // xoa
  async xoaKhoanDongGop({ ID }) {
    try {
      const text = `
      DELETE FROM ${process.env.PG_DONG_GOP}
      WHERE "ID"=$1
      RETURNING *;
      `;
      const { rowCount } = await DB.query(text, [ID]);

      return rowCount > 0;
    } catch (e) {
      console.log(e.message);
      throw new Error("khong the xoa!");
    }
  }
  async xoaKhoanThu({ idHoKhau, idDongGop }) {
    try {
      const text = `
      DELETE FROM ${process.env.PG_HO_KHAU_DONG_GOP}
      WHERE "idHoKhau"=$1 and "idDongGop"=$2
      RETURNING *;
      `;
      const { rowCount } = await DB.query(text, [idHoKhau,idDongGop]);
      return rowCount > 0;
    } catch (e) {
      console.log(e.message);
      throw new Error("khong the xoa!");
    }

  }
}
class TruyVanDongGop {
  constructor() {}
  async thongTinDongGop({ ID }) {
    try {
      const text = `
            SELECT * FROM ${process.env.PG_DONG_GOP}
            WHERE "ID"=$1
            ORDER BY "ID" DESC;
            `;
      const values = [ID];
      const { rows, rowCount } = await DB.query(text, values);
      if (rowCount < 1) throw new Error();
      return rows[0];
    } catch (e) {
      console.log(e.message);
      throw new Error("không có khoản đóng góp!");
    }
  }
  async danhSachKhoanDong({
    limit = 20,
    offset = 0,
    tenKhoanDong = "",
    hoanThanh = false,
    theLoai = "mandatory",
  }) {
    try {
      const text = `
              SELECT * FROM ${process.env.PG_DONG_GOP} dg
              WHERE "tenKhoanDong" like $1 and "hoanThanh"=$2 and "theLoai"=$3
              ORDER  BY "ID" desc
              LIMIT $4  OFFSET $5;
              `;
      const values = [`%${tenKhoanDong}%`, hoanThanh, theLoai, limit, offset];
      const { rows } = await DB.query(text, values);

      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("không có khoản đóng góp!");
    }
  }
  async danhSachDaThu({ idDongGop }) {
    try {
      const text = `
      SELECT "idHoKhau", "daDong", "ngayDong", "idDongGop"
	    FROM ${process.env.PG_HO_KHAU_DONG_GOP}
       WHERE "idDongGop"=$1;
  
      `;
      const values = [idDongGop];
      const { rows } = await DB.query(text, values);
      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("co loi xay ra");
    }
  }
  async danhSachChuaDong({ idDongGop }) {
    try {
      const text = `
      select * from ${process.env.PG_HO_KHAU_TABLE} nk
      EXCEPT
      select nk2.* from ${process.env.PG_HO_KHAU_TABLE} nk2
      join ${process.env.PG_HO_KHAU_DONG_GOP} da_dong
      on da_dong."idHoKhau"=nk2."ID"
      where da_dong."idDongGop"=$1;
      `;
      const values = [idDongGop];
      const { rows } = await DB.query(text, values);
      return rows;
    } catch (e) {
      console.log(e.message);
      throw new Error("khong the tim");
    }
  }
}

module.exports = { QuanLyDongGop, TruyVanDongGop };
