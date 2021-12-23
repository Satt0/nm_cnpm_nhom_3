const {
  UserCreation,
  UserQuery,
  UserUpdate,
  UserDelete,
  TieuSu,
  QuanLyNhanKhau,
} = require("./data");
const { authenticate } = require("../../helpers/authen/authenResolver");

const root = {
  NhanKhau: {
    tieuSu: async (person,_,__,___) => {
      const lyLich = new TieuSu();
      return await lyLich.timTieuSu({ idNhanKhau: person.ID });
    },
    tamVang:async({ID})=>{
      const data=new UserQuery()
      return await data.getKhaiBaoTamVang({ID})
    },
    tamTru:async({ID})=>{
      const data=new UserQuery()
      return await data.getKhaiBaoTamTru({ID})
    },
    khaiTu:async({ID})=>{
      const data=new UserQuery()
      return await data.getKhaiTu({ID})
    },
    dinhDanh:async({ID})=>{
      const data=new UserQuery()
      return await data.getDinhDanh({ID})
    },
  
  },
  KhaiTu:{
    nguoiKhai:async({idNguoiKhai})=>{
      const data=new UserQuery()
      return await data.getOnePerson({ID:idNguoiKhai})
    }

  }
};
const Query = {
  thongTinNhanKhau: authenticate(1, async (_, { input }, __, ___) => {
    const process = new UserQuery();
    const res= await process.getOnePerson({ ID: input });
    return res;
  }),
  timNhanKhau: authenticate(1, async (_, { input }, __, ___) => {
    const process = new UserQuery();
    return await process.getManyPerson(input);
  }),
};
const Mutation = {
  taoNhanKhau: authenticate(1,async (_, { input }, context, __) => {
    
    const idNguoiTao = context.user.ID;

    const process = new UserCreation({ ...input, idNguoiTao });
    return await process.CREATE();
  }),
  capNhatNhanKhau: async (_, { input }, __, ___) => {
    const process = new UserUpdate(input);
    return await process.UPDATE();
  },
  xoaNhanKHau: authenticate(1,async (_, { input }, context, __) => {
    const idNguoiXoa = context.user.ID;
    const process = new UserDelete();
    return await process.deleteOnePerson({ ID: input, idNguoiXoa });
  }),
  khoiPhucNhanKhau: async (_, { input }, __, ___) => {
    const process = new UserDelete();
    return await process.restoreOnePerson({ ID: input });
  },
  taoTieuSu: async (_, { input }, __, ___) => {
    const lyLich = new TieuSu();
    return await lyLich.taoTieuSu(input);
  },
  xoaTieuSu: async (_, { input }, __, ___) => {
    const lyLich = new TieuSu();
    return await lyLich.xoaTieuSu({ ID: input });
  },


  // others
  khaiBaoTamVang:async(_,{input},context)=>{
    const data=new QuanLyNhanKhau();
    
    return await data.khaiBaoTamVang(input);
  },
  khaiBaoTamTru:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    
    return await data.khaiBaoTamTru(input);
  },
  khaiTu:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    
    return await data.khaiTu(input);
  },
  taoTheDinhDanh:async(_,{input})=>{
    console.log(input);
    const data=new QuanLyNhanKhau();
    
    return await data.dinhDanh(input);
  },


  // delete
  xoaTamVang:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    return await data.xoaTamVang({ID:input})
  },
  xoaTamTru:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    return await data.xoaTamTru({ID:input})
  },
  xoaKhaiTu:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    return await data.xoaKhaiTu({ID:input})
  },
  xoaTheDinhDanh:async(_,{input})=>{
    const data=new QuanLyNhanKhau();
    return await data.xoaDinhDanh({ID:input})
  }
};

module.exports = { root, Query, Mutation };
