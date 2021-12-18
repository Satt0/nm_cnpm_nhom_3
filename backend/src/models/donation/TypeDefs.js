const {gql}=require('apollo-server-express')


module.exports=gql`
    type DongGop{
        ID:Int!
        tenKhoanDong:String!
        ngayTao:String!
        soTien:Int!
        donVi:String!
        theLoai:String!
        hoanThanh:Boolean!
        khoanThu:[KhoanThu!]!
        chuaDong:[HoKhau!]!
    }
    type KhoanThu {

        daDong:Int!
        ngayDong:String!
        hoKhau:HoKhau!
        dongGop:DongGop!
    }


    input inputTaoKhoanDongGop{
        tenKhoanDong:String!
        soTien:Int!
        donVi:String!
        theLoai:String!
    }
    input inputCapNhatKhoanDongGop{
        ID:Int!
        tenKhoanDong:String!
        soTien:Int!
        donVi:String!
        theLoai:String!
        hoanThanh:Boolean!
    }
    # input dong tien
    input inputKhoanThu{
        idDongGop:Int!
         idHoKhau:Int!
         daDong:Int!
    }
    extend type Mutation{
        taoKhoanDongGop(input:inputTaoKhoanDongGop!):DongGop!
        capNhatKhoanDongGop(input:inputCapNhatKhoanDongGop!):DongGop!
        xoaKhoanDongGop(input:Int!):Boolean!


        #
        dongTien(input:inputKhoanThu!):KhoanThu!
        xoaHoDaDong:Boolean!
        capNhatKhoanThu:Boolean
    }
    input inputLocKhoanDong{
        offset:Int!
        limit:Int!
        hoanThanh:Boolean!
        tenKhoanDong:String!
        theLoai:String!
    }
    extend type Query{
        danhSachKhoanDong(input:inputLocKhoanDong!):[DongGop!]!
        thongTinKhoanDong(input:Int!):DongGop!
    }
`