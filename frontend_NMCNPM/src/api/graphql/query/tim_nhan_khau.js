import React, {useState} from "react";
import { gql } from "@apollo/client";
import { useLazyQuery } from "@apollo/client";

export  const TIM_NHAN_KHAU = gql`
query timNhanKhau($input: inputTimNhanKhau!){
  timNhanKhau(input: $input) {
    ID
    hoTen
    bietDanh
    namSinh
    gioiTinh
    nguyenQuan
    danToc
    tonGiao
    quocTich
    soHoChieu
    noiThuongTru
    diaChiHienNay
    ngheNghiep
    noiLamViec
    noiSinh
    maNhanKhau
  }
}
`

// function TimNhanKhau(){
//     const [
//         fetchInfor,
//         { data: InforSearchedData, error: InforError },
//       ] = useLazyQuery(TIM_NHAN_KHAU);
//     const[limit, setLimit] = useState("");  
//     const[offset, setOffset] = useState("0");
//     const[name, setName] = useState("")

//     return(
//         <div>
//             <input
//           type="text"
//           placeholder="Giới hạn"
//           onChange={(event) => {
//             setLimit(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Nhập Offset"
//           onChange={(event) => {
//             setOffset(event.target.value);
//           }}
//         />
//         <input
//           type="text"
//           placeholder="Nhập tên"
//           onChange={(event) => {
//             setName(event.target.value);
//           }}
//         />
//         <button
//           onClick={() => {
//             fetchInfor({
//               variables: {
//                 input: {limit, offset, name}
//               },
//             });
//           }}
//         >
//           Tìm nhân khẩu
//         </button>

//         <div>
//           {InforSearchedData && (
//             <div>
//               <h1>ID: {InforSearchedData.timNhanKhau.ID}</h1>
//               <h1>
//                 Họ và tên: {InforSearchedData.timNhanKhau.hoTen}
//               </h1>
//               <h1>
//                   Biệt danh: {InforSearchedData.timNhanKhau.bietDanh}
//               </h1>
//               <h1>
//                   Năm sinh: {InforSearchedData.timNhanKhau.namSinh}
//               </h1>
//               <h1>
//                   Giới tính: {InforSearchedData.timNhanKhau.gioiTinh}
//               </h1>
//               <h1>
//                   Dân tộc: {InforSearchedData.timNhanKhau.danToc}
//               </h1>
//               <h1>
//                   Tôn giáo: {InforSearchedData.timNhanKhau.tonGiao}
//               </h1>
//               <h1>
//                   Quốc tịch: {InforSearchedData.timNhanKhau.quocTich}
//               </h1>
//               <h1>
//                   Nguyên quán: {InforSearchedData.timNhanKhau.nguyenQuan}
//               </h1>
//               <h1>
//                   Mã nhân khẩu: {InforSearchedData.timNhanKhau.maNhanKhau}
//               </h1>
//             </div>
//           )}
//           {InforError && <h1> There was an error fetching the data</h1>}
//         </div>
//         </div>
//     )
// }
// export default TimNhanKhau