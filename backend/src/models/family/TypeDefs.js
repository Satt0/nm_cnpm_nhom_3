const {gql}=require('apollo-server-express')

module.exports=gql`
type HoKhau{
    ID:Int!
    maHoKhau:String!
    chuHo:NhanKhau
    maKhuVuc:String!
    diaChi:String!
    ngayChuyenDi:String!
    dinhChinh:[DinhChinh!]!
    thanhVien:[NhanKhau!]!
}
type SecureAccount{
    username:String!
    ID:Int!
}
type DinhChinh{
    ID:Int!
    thongTinThayDoi:String!
    thayDoiTu:String!
    doiThanh:String!
    ngayThayDoi:String!
    nguoiThayDoi:SecureAccount!
}

input inputLocHoKhau{
    limit:Int!
    offset:Int!
}
input inputCapNhatHoKhau{
    ID:Int!
    maHoKhau:String!
    idChuHo:Int!
    maKhuVuc:String!
    diaChi:String!
    ngayChuyenDi:String!
   
}
input inputTaoHoKhau{
    
    idChuHo:Int!
    maKhuVuc:String!
   
    diaChi:String!
    ngayChuyenDi:String!
    maHoKhau:String!
    nhanKhau:[inputNhapKhau!]!
}


input inputNhapKhau{
    idNhanKhau:Int!
    idHoKhau:Int!
    quanHeVoiChuHo:String!
}
input inputXoaKhau {
    idNhanKhau:Int!
    idHoKhau:Int!
}
input inputSuaKhau{
    idNhanKhau:Int!
    quanHeVoiChuHo:String!
    idHoKhau:Int!
}
extend type Query{
    thongTinHoKhau(input:Int!):HoKhau!
    danhSachHoKhau(input:inputLocHoKhau!):[HoKhau!]!
}

type ThanhVienGiaDinh{
    nhanKhau:NhanKhau!
    hoKhau:HoKhau!
    quanHeVoiChuHo:String!
}

extend type Mutation{
    capNhatHoKhau(input:inputCapNhatHoKhau!):HoKhau!
    taoHoKhau(input:inputTaoHoKhau!):HoKhau!
    xoaHoKhau(input:Int!):Boolean!
    tachHoKhau(input:inputTaoHoKhau!):HoKhau!
    # nhan khau
    nhapKhau(input:inputNhapKhau!):ThanhVienGiaDinh!
    xoaThanhVienGiaDinh(input:inputXoaKhau!):Boolean!
    capNhatThanhVien(input:inputSuaKhau!):ThanhVienGiaDinh!
}
`