const { QuanLyDongGop, TruyVanDongGop } = require("./data");
const {timHoKhau} =require('../family/data')
const root = {

  DongGop:{
    khoanThu: async({ID})=>{
    
      const data=new TruyVanDongGop();
      return await data.danhSachDaThu({idDongGop:ID})
    },chuaDong:async({ID})=>{
      const data=new TruyVanDongGop();
      return await data.danhSachChuaDong({idDongGop:ID})
    }
  },
    KhoanThu:{
      hoKhau:async({idHoKhau})=>{
        const data=new timHoKhau()
        return await data.findOne({ID:idHoKhau})
      }
    },
  
};
const Query = {
  danhSachKhoanDong:async (_, { input }) => {
    const data = new TruyVanDongGop();
    return await data.danhSachKhoanDong(input);
  },
  thongTinKhoanDong: async (_, { input }) => {
    const data = new TruyVanDongGop();
    return await data.thongTinDongGop({ ID: input });
  },
  countAll:async()=>{
    const data = new TruyVanDongGop();
    return await data.countAll()
  }

};
const Mutation = {
  taoKhoanDongGop: async (_, { input }) => {
    const khoiTao = new QuanLyDongGop();
    return await khoiTao.taoDongGop(input);
  },
  capNhatKhoanDongGop: async (_,{input}) => {
    const khoiTao = new QuanLyDongGop();
    return await khoiTao.capNhatDongDop(input);
  },


  xoaKhoanDongGop: async(_,{input}) => {

    
    const khoiTao=new QuanLyDongGop();
    return await khoiTao.xoaKhoanDongGop({ID:input})
  },

  dongTien: async(_,{input}) => {
    const khoiTao=new QuanLyDongGop();
    return await khoiTao.taoKhoanThu(input)

  },
  xoaHoDaDong: async (_,{input}) => {

    const khoiTao=new QuanLyDongGop();
    return await khoiTao.xoaKhoanThu(input)
  },
  capNhatKhoanThu:async(_,{input})=>{
   
    const khoiTao=new QuanLyDongGop();
    return await khoiTao.capNhanKhoanThu(input)
  }
};

module.exports = { root, Query, Mutation };
