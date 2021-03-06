const {
  timHoKhau,
  taoHoKhau,
  capNhatHoKhau,
  dinhChinh,
  QuanLyHoKhau,
} = require("./data");
const { UserQuery } = require("../person/data");
const { AccountQuery } = require("../user/data");
const { authenticate } = require("../../helpers/authen/authenResolver");
const root = {
  HoKhau: {
    dinhChinh: async ({ ID }) => {
      const DC = new dinhChinh();
      return await DC.timDinhChinh({ idHoKhau: ID });
    },
    chuHo: async ({ idChuHo }) => {
     try{
      const nhanKhau = new UserQuery();
      return await nhanKhau.getOnePerson({ ID: idChuHo });
     }catch(e){
      
      return null
     }
    },
    thanhVien: async ({ ID }) => {
      const nhanKhau = new UserQuery();
      return await nhanKhau.getFamilyMember({ idHoKhau: ID });
    },
  },
  DinhChinh: {
    nguoiThayDoi: async ({ nguoiThayDoi }) => {
      const acc = new AccountQuery();
      return await acc.getAccountInfor({ ID: nguoiThayDoi });
    },
  },
  ThanhVienGiaDinh: {
    nhanKhau: async ({ idNhanKhau }) => {
      const queryNhanKhau = new UserQuery();
      return await queryNhanKhau.getOnePerson({ ID: idNhanKhau });
    },
    hoKhau: async ({ idHoKhau }) => {
      const queryHoKhau = new timHoKhau();
      return await queryHoKhau.findOne({ ID: idHoKhau });
    },
  },
};
const Query = {
  thongTinHoKhau: authenticate(1, async (_, { input }) => {
    const hoKhau = new timHoKhau();
    return hoKhau.findOne({ ID: input });
  }),
  danhSachHoKhau: authenticate(1, async (_, { input }) => {
    const hoKhau = new timHoKhau();
    return hoKhau.findMany(input);
  }),
};
const Mutation = {
  taoHoKhau: authenticate(1, async (_, { input }, context) => {
    const idNguoiTao = context.user.ID;
    const hoKhau = new taoHoKhau(input);
    return await hoKhau.CREATE({ idNguoiTao });
  }),
  capNhatHoKhau: authenticate(1, async (_, { input }, context) => {
    const nguoiThayDoi = context.user.ID;
    const hoKhau = new capNhatHoKhau(input);
    return await hoKhau.UPDATE({ nguoiThayDoi });
  }),
  nhapKhau: authenticate(1, async (_, { input }, context) => {
    const nguoiThayDoi = context.user.ID;

    const worker = new QuanLyHoKhau();
    return await worker.nhapKhanKhau({ ...input, nguoiThayDoi });
  }),

  xoaThanhVienGiaDinh: authenticate(1, async (_, { input }, context) => {
    const nguoiThayDoi = context.user.ID;

    const worker = new QuanLyHoKhau();
    return await worker.xoaNhanKhau({ ...input, nguoiThayDoi });
  }),
  capNhatThanhVien: authenticate(1, async (_, { input },context) => {
    const nguoiThayDoi = context.user.ID;
    const hoKhau=new QuanLyHoKhau()
    return await hoKhau.capNhatNhanKhau({...input,nguoiThayDoi})
  }),
  tachHoKhau:authenticate(1, async (_, { input },context) => {
    const nguoiThayDoi=context.user.ID;
    const hoKhau=new taoHoKhau(input,type="exist")
    return await hoKhau.CREATE({nguoiThayDoi})
  }),
  xoaHoKhau:authenticate(1, async (_, { input }) => {
    const data=new QuanLyHoKhau();
    return await data.xoaHoKHau(input)
  })
};

module.exports = { root, Query, Mutation };
