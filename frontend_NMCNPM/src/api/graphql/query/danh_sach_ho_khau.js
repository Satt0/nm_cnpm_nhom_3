import React, {useState} from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";

const DANH_SACH_HO_KHAU = gql`
query DanhSachHoKhau($input: inputLocHoKhau!) {
  danhSachHoKhau(input: $input) {
    ID
    maHoKhau
    chuHo {
      ID
      hoTen
      namSinh
      gioiTinh
    }
    maKhuVuc
    diaChi
    ngayChuyenDi
    dinhChinh {
      ID
      thongTinThayDoi
    }
    thanhVien {
      ID
      hoTen
      namSinh
      gioiTinh
    }
  }
}
`

function DanhSachHoKhau(){
    const [
        fetchInfor,
        { data: InforSearchedData, error: InforError },
      ] = useLazyQuery(DANH_SACH_HO_KHAU);
    const[limit, setLimit] = useState("");  
    const[offset, setOffset] = useState("0");
    return(
        <div>
            <input
          type="text"
          placeholder="Giới hạn"
          onChange={(event) => {
            setLimit(event.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Nhập Offset"
          onChange={(event) => {
            setOffset(event.target.value);
          }}
        />
        
        <button
          onClick={() => {
            fetchInfor({
              variables: {
                input: {limit, offset}
              },
            });
          }}
        >
          Danh sách hộ khẩu
        </button>

        <div>
          {InforSearchedData && (
            <div>
              <h1>ID: {InforSearchedData.thongTinHoKhau.ID}</h1>
              <h1>
                Mã hộ khẩu: {InforSearchedData.thongTinHoKhau.maHoKhau}
              </h1>
              <h1>
                  ID thành viên: {InforSearchedData.thongTinHoKhau.thanhVien.ID}
              </h1>
              <h1>
                  Họ tên thành viên: {InforSearchedData.thongTinHoKhau.thanhVien.hoTen}
              </h1>
              <h1>
                  Năm sinh thành viên: {InforSearchedData.thongTinHoKhau.thanhVien.namSinh}
              </h1>
              <h1>
                  Giới tính thành viên: {InforSearchedData.thongTinHoKhau.thanhVien.gioiTinh}
              </h1>
              <h1>
                  Mã khu vực: {InforSearchedData.thongTinHoKhau.maKhuVuc}
              </h1>
              <h1>
                  Địa chỉ: {InforSearchedData.thongTinHoKhau.diaChi}
              </h1>
              <h1>
                  ID chủ hộ: {InforSearchedData.thongTinHoKhau.chuHo.ID}
              </h1>
              <h1>
                  Họ tên chủ hộ: {InforSearchedData.thongTinHoKhau.chuHo.hoTen}
              </h1>
              <h1>
                  Năm sinh chủ hộ: {InforSearchedData.thongTinHoKhau.chuHo.namSinh}
              </h1>
              <h1>
                  Giới tính chủ hộ: {InforSearchedData.thongTinHoKhau.chuHo.gioiTinh}
              </h1>
            </div>
          )}
          {InforError && <h1> There was an error fetching the data</h1>}
        </div>
        </div>
    )
}
export default DanhSachHoKhau