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
    input inputCapNhatDaThu{
        daDong:Int!
        idHoKhau:Int!
        idDongGop:Int!
    }
    input inputKhoanThu{
        idDongGop:Int!
         idHoKhau:Int!
         daDong:Int!
    }
    input inputXoaDaDong{
        idDongGop:Int!
        idHoKhau:Int
    }
    extend type Mutation{
        taoKhoanDongGop(input:inputTaoKhoanDongGop!):DongGop!
        capNhatKhoanDongGop(input:inputCapNhatKhoanDongGop!):DongGop!
        xoaKhoanDongGop(input:Int!):Boolean!


        #
        dongTien(input:inputKhoanThu!):KhoanThu!
        xoaHoDaDong(input:inputXoaDaDong!):Boolean!
        capNhatKhoanThu(input:inputCapNhatDaThu):KhoanThu!
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