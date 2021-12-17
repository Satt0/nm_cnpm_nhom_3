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


  xoaKhoanDongGop: () => {},
  dongTien: async(_,{input}) => {
    const khoiTao=new QuanLyDongGop();
    return await khoiTao.taoKhoanThu(input)

  },
  xoaHoDaDong: () => {},
};

module.exports = { root, Query, Mutation };
