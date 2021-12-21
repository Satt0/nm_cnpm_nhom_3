const {gql}=require('apollo-server-express')


module.exports=gql`
# nhan_khau table
type NhanKhau{
    ID:Int!
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    gioiTinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    noiSinh:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    ngayTao:String!
    idNguoiTao:Int!
    ngayXoa:String
    idNguoiXoa:Int
    lyDoXoa:String
    ghichu:String
    daXoa:Boolean!
    tieuSu:[TieuSu!]!
    maNhanKhau:String!
    quanHeVoiChuHo:String
    
    # optional
    tamVang:TamVang
    tamTru:TamTru
    dinhDanh:DinhDanh
    khaiTu:KhaiTu

    
}

type DinhDanh{
ID:Int!
soDinhDanh:String!
ngayCap:String!
noiCap:String!
type:String!
}
type TamTru{
ID:Int!
maGiayTamTru:String!
soDienThoaiNguoiDangKy:String!
tuNgay:String!
denNgay:String!
lyDo:String!
}
type TamVang{
ID:Int!
maGiayTamVang:String!
tuNgay:String!
noiTamTru:String!
denNgay:String!
lyDo:String!
}
type KhaiTu{
ID:Int!
soGiayKhaiTu:String!
nguoiKhai:NhanKhau!
ngayKhai:String!
ngayChet:String!
lyDoChet:String!
}


type TieuSu{
    ID:Int!
    tuNgay:String!
    denNgay:String!
    diaChi:String!
    ngheNghiep:String!
    noiLamViec:String!
}
input inputTieuSu{
    idNhanKhau:Int!
    tuNgay:String!
    denNgay:String!
    diaChi:String!
    ngheNghiep:String!
    noiLamViec:String!
}
input inputTaoNhanKhau{
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    noiSinh:String!
    gioiTinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    ngayTao:String!
   
    maNhanKhau:String!
}
input inputCapNhatNhanKhau{
    ID:Int!
    hoTen:String!
    bietDanh:String!
    namSinh:String!
    gioiTinh:String!
    noiSinh:String!
    nguyenQuan:String!
    danToc:String!
    tonGiao:String!
    quocTich:String!
    soHoChieu:String!
    noiThuongTru:String!
    diaChiHienNay:String!
    trinhDoHocVan:String!
    trinhDoChuyenMon:String!
    bietTiengDanToc:String!
    trinhDoNgoaiNgu:String!
    ngheNghiep:String!
    noiLamViec:String!
    tienAn:String!
    ngayChuyenDen:String!
    lyDoChuyenDen:String!
    ngayChuyenDi:String!
    lyDoChuyenDi:String!
    diaChiMoi:String!
    maNhanKhau:String!
   
    ngayXoa:String
    idNguoiXoa:Int
    lyDoXoa:String
    ghichu:String
  
}
input inputTimNhanKhau{
    limit:Int!
    offset:Int!
    name:String!
}
extend type Query {
    thongTinNhanKhau(input:Int!):NhanKhau!
    timNhanKhau(input:inputTimNhanKhau!):[NhanKhau!]!
}


input inputTamVang{
maGiayTamVang:String!
tuNgay:String!
noiTamTru:String!
denNgay:String!
lyDo:String!
idNhanKhau:Int!
}
input inputTamTru{

maGiayTamTru:String!
soDienThoaiNguoiDangKy:String!
tuNgay:String!
denNgay:String!
lyDo:String!
idNhanKhau:Int!
}
input inputKhaiTu{

soGiayKhaiTu:String!
idNguoiKhai:Int!
idNguoiChet:Int!
ngayKhai:String!
ngayChet:String!
lyDoChet:String!
}
input inputDinhDanh{
    idNhanKhau:Int!
soDinhDanh:String!
ngayCap:String!
noiCap:String!
type:String!
}
extend type Mutation{
    taoNhanKhau(input:inputTaoNhanKhau!):NhanKhau!
    capNhatNhanKhau(input:inputCapNhatNhanKhau!):NhanKhau!
    xoaNhanKHau(input:Int!):Boolean!
    khoiPhucNhanKhau(input:Int!):Boolean!
    
    taoTieuSu(input:inputTieuSu!):TieuSu!
    xoaTieuSu(input:Int!):Boolean!
    # 
    khaiBaoTamVang(input:inputTamVang!):TamVang!
    xoaTamVang(input:Int!):Boolean!

    khaiBaoTamTru(input:inputTamTru!):TamTru!
    xoaTamTru(input:Int!):Boolean!

    khaiTu(input:inputKhaiTu!):KhaiTu!
    xoaKhaiTu(input:Int!):Boolean!

    taoTheDinhDanh(input:inputDinhDanh!):DinhDanh!
    xoaTheDinhDanh(input:Int!):Boolean!
}
`