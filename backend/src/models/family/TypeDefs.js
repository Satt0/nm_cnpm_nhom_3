const {gql}=require('apollo-server-express')

module.exports=gql`
type HoKhau{
    ID:Int!
    maHoKhau:String!
    chuHo:NhanKhau!
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
    
}
input inputNhapKhau{
    idNhanKhau:Int!
    idHoKhau:Int!
    quanHeVoiChuHo:String!
}
extend type Query{
    thongTinHoKhau(input:Int!):HoKhau!
    danhSachHoKhau(input:inputLocHoKhau!):[HoKhau!]!
}

extend type Mutation{
    capNhatHoKhau(input:inputCapNhatHoKhau!):HoKhau!
    taoHoKhau(input:inputTaoHoKhau!):HoKhau!
    xoaHoKhau(input:Int!):Boolean!
    nhapKhau(input:[inputNhapKhau!]!):[NhanKhau!]!
}
`