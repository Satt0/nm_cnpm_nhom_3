import React, {useState} from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";

export const THONG_TIN_NHAN_KHAU = gql`
query thongTinNhanKhau($input: Int!){
  thongTinNhanKhau(input: $input) {
    ID
    hoTen
    bietDanh
    namSinh
    gioiTinh
    danToc
    tonGiao
    quocTich
    nguyenQuan
    soHoChieu
    noiThuongTru
    diaChiHienNay
    trinhDoHocVan
    trinhDoChuyenMon
    bietTiengDanToc
    trinhDoNgoaiNgu
    ngheNghiep
    noiLamViec
    noiSinh
    tienAn
    ngayChuyenDen
    lyDoChuyenDen
    ngayChuyenDi
    lyDoChuyenDi
    diaChiMoi
    ngayTao
    idNguoiTao
    ngayXoa
    idNguoiXoa
    lyDoXoa
    ghichu
    daXoa
    tieuSu {
      ID
      tuNgay
      denNgay
      diaChi
      ngheNghiep
      noiLamViec
    }
    maNhanKhau
    quanHeVoiChuHo
    dinhDanh {
      ID
      soDinhDanh
      ngayCap
      noiCap
      type
    }
    tamVang {
      ID
      maGiayTamVang
      tuNgay
      noiTamTru
      denNgay
      lyDo
    }
    tamTru {
      ID
      maGiayTamTru
      soDienThoaiNguoiDangKy
      tuNgay
      denNgay
      lyDo
    }
    khaiTu {
      ID
      soGiayKhaiTu
      nguoiKhai {
        ID
        hoTen
        namSinh
      }
      ngayKhai
      ngayChet
      lyDoChet
    }
  }
}
`

// function ThongTinNhanKhau(){
    // const [
    //     fetchInfor,
    //     { data: InforSearchedData, error: InforError },
    //   ] = useLazyQuery(THONG_TIN_NHAN_KHAU);
//     const[id, setId] = useState("");  

//     return(
//         <div>
//             <input
//           type="text"
//           placeholder="Nhập ID"
//           onChange={(event) => {
//             setId(event.target.value);
//           }}
//         />
        // <button
        //   onClick={() => {
        //     fetchInfor({
        //       variables: {
        //         input: id,
        //       },
        //     });
        //   }}
        // >
        //   Thông tin nhân khẩu
        // </button>
//         <div>
//           {InforSearchedData && (
//             <div>
//               <h1>ID: {InforSearchedData.thongTinNhanKhau.ID}</h1>
//               <h1>
//                 Họ và tên: {InforSearchedData.thongTinNhanKhau.hoTen}
//               </h1>
//               <h1>
//                   Biệt danh: {InforSearchedData.thongTinNhanKhau.bietDanh}
//               </h1>
//               <h1>
//                   Năm sinh: {InforSearchedData.thongTinNhanKhau.namSinh}
//               </h1>
//               <h1>
//                   Giới tính: {InforSearchedData.thongTinNhanKhau.gioiTinh}
//               </h1>
//               <h1>
//                   Dân tộc: {InforSearchedData.thongTinNhanKhau.danToc}
//               </h1>
//               <h1>
//                   Tôn giáo: {InforSearchedData.thongTinNhanKhau.tonGiao}
//               </h1>
//               <h1>
//                   Quốc tịch: {InforSearchedData.thongTinNhanKhau.quocTich}
//               </h1>
//               <h1>
//                   Nguyên quán: {InforSearchedData.thongTinNhanKhau.nguyenQuan}
//               </h1>
//             </div>
//           )}
//           {InforError && <h1> There was an error fetching the data</h1>}
//         </div>
//         </div>
//     )
// }
// export default ThongTinNhanKhau