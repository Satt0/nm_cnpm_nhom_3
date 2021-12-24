import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { THONG_TIN_NHAN_KHAU } from "../../../api/graphql/query/thong_tin_nhan_khau";
import { CAP_NHAT_NHAN_KHAU } from "../../../api/graphql/mutation/cap_nhat_nhan_khau";
import { TAO_TIEU_SU } from "../../../api/graphql/mutation/tao_tieu_su";
import { XOA_TIEU_SU } from "../../../api/graphql/mutation/xoa_tieu_su";
import { XOA_THE_DINH_DANH } from "../../../api/graphql/mutation/xoa_the_dinh_danh";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import { Button } from "@material-ui/core";
import { listInput } from "../../maps/Maps";
import Form from "../../../components/Form";
import './sua-nhan-khau.css'
import {Table,TableHead,TableRow,TableCell,TableBody,} from '@material-ui/core'
import { useHistory} from "react-router-dom";
import { TAO_THE_DINH_DANH } from "../../../api/graphql/mutation/tao_the_dinh_danh";
import { KHAI_BAO_TAM_VANG } from "../../../api/graphql/mutation/khai_bao_tam_vang";
import { KHAI_BAO_TAM_TRU } from "../../../api/graphql/mutation/khai_bao_tam_tru";
import { KHAI_TU } from "../../../api/graphql/mutation/khai_tu";
import { XOA_TAM_VANG } from "../../../api/graphql/mutation/xoa_tam_vang";
import { XOA_TAM_TRU } from "../../../api/graphql/mutation/xoa_tam_tru";
import { XOA_KHAI_TU } from "../../../api/graphql/mutation/xoa_khai_tu";
export default function EditOne() {
  const history = useHistory();
  const params = useParams();
  const id = Object.values(params)[0];
  const { data: InforSearchedData, error: InforError, loading } = useQuery(
    THONG_TIN_NHAN_KHAU,
    {
      variables: {
        input: parseInt(id),
      },
      fetchPolicy: "no-cache"
    },
  );
  const [updateUser, { loading: loadingUpdate, data }] = useMutation(
    CAP_NHAT_NHAN_KHAU,
  );
  const [createTS, { loading: loadingTS, data: dataTS}] = useMutation(TAO_TIEU_SU)
  const [deleteTS, { loading: loadingDel, data: dataDel}] = useMutation(XOA_TIEU_SU)
  const [createDC, { loading: loadingDC, data: dataDC, error}] = useMutation(TAO_THE_DINH_DANH)
  const [deleteDC, { loading: loadingDelDC, data: dataDelDC}] = useMutation(XOA_TIEU_SU)
  const [createTV, {loading: loadingTV, data: dataTV}] = useMutation(KHAI_BAO_TAM_VANG)
  const [deleteTV, { loading: loadingDelTV, data: dataDelTV}] = useMutation(XOA_TAM_VANG)
  const [createTT, {loading: loadingTT, data: dataTT}] = useMutation(KHAI_BAO_TAM_TRU)
  const [deleteTT, { loading: loadingDelTT, data: dataDelTT, error: errorTT}] = useMutation(XOA_TAM_TRU)
  const [createKT, {loading: loadingKT, data: dataKT}] = useMutation(KHAI_TU)
  const [deleteKT, { loading: loadingDelKT, data: dataDelKT}] = useMutation(XOA_KHAI_TU)
  const listInputTS=[

    {
    label:"ID nhân khẩu",
    name:"idNhanKhau",
    isRequired:true,
    defaultValue:parseInt(id),
    type:"text",
    placeHolder:'nhập ID',
    },
    {
    label:"Từ ngày",
    name:"tuNgay",
    isRequired:true,
    type:"text",
    defaultValue:"",
    placeHolder:'nhập ngày',
    },
    {
        label:"Đến ngày",
        name:"denNgay",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập ngày',
    },
    {
        label:"Địa chỉ",
        name:"diaChi",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập địa chỉ',
    },
    {
        label:"Nghề nghiệp",
        name:"ngheNghiep",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập nghề nghiệp',
    },
    {
        label:"Nơi làm việc",
        name:"noiLamViec",
        isRequired:true,
        type:"text",
        defaultValue:"",
        placeHolder:'nhập địa điểm',
        },    
    ];
    const listInputDC=[

      {
      label:"ID nhân khẩu",
      name:"idNhanKhau",
      isRequired:true,
      defaultValue:parseInt(id),
      type:"text",
      placeHolder:'nhập ID',
      },
      {
      label:"Số định danh",
      name:"soDinhDanh",
      isRequired:true,
      type:"text",
      defaultValue:"",
      placeHolder:'nhập ngày',
      },
      {
          label:"Ngày cấp",
          name:"ngayCap",
          isRequired:true,
          type:"text",
          defaultValue:"",
          placeHolder:'nhập ngày',
      },
      {
          label:"Nơi cấp",
          name:"noiCap",
          isRequired:true,
          type:"text",
          defaultValue:"",
          placeHolder:'nhập địa chỉ',
      },
      {
          label:"Type",
          name:"type",
          isRequired:true,
          type:"text",
          defaultValue:"",
          placeHolder:'nhập nghề nghiệp',
      },
      ];
      const listInputTV=[

        {
          label:"ID nhân khẩu",
          name:"idNhanKhau",
          isRequired:true,
          defaultValue:parseInt(id),
          type:"text",
          placeHolder:'nhập ID',
          },
          {
          label:"Từ ngày",
          name:"tuNgay",
          isRequired:true,
          type:"text",
          defaultValue:"",
          placeHolder:'nhập ngày',
          },
          {
              label:"Đến ngày",
              name:"denNgay",
              isRequired:true,
              type:"text",
              defaultValue:"",
              placeHolder:'nhập ngày',
          },
          {
              label:"Nơi tạm trú",
              name:"noiTamTru",
              isRequired:true,
              type:"text",
              defaultValue:"",
              placeHolder:'nhập nơi tạm trú',
          },
          {
              label:"Lý do",
              name:"lyDo",
              isRequired:true,
              type:"text",
              defaultValue:"",
              placeHolder:'nhập lý do',
          },
          {
              label:"Mã giấy tạm vắng",
              name:"maGiayTamVang",
              isRequired:true,
              type:"text",
              defaultValue:"",
              placeHolder:'nhập địa điểm',
              },    
        ];
        const listInputTT=[

          {
            label:"ID nhân khẩu",
            name:"idNhanKhau",
            isRequired:true,
            defaultValue:parseInt(id),
            type:"text",
            placeHolder:'nhập ID',
            },
            {
            label:"Từ ngày",
            name:"tuNgay",
            isRequired:true,
            type:"text",
            defaultValue:"",
            placeHolder:'nhập ngày',
            },
            {
                label:"Đến ngày",
                name:"denNgay",
                isRequired:true,
                type:"text",
                defaultValue:"",
                placeHolder:'nhập ngày',
            },
            {
                label:"Số điện thoại người đăng ký",
                name:"soDienThoaiNguoiDangKy",
                isRequired:true,
                type:"text",
                defaultValue:"",
                placeHolder:'nhập nơi tạm trú',
            },
            {
                label:"Lý do",
                name:"lyDo",
                isRequired:true,
                type:"text",
                defaultValue:"",
                placeHolder:'nhập lý do',
            },
            {
                label:"Mã giấy tạm trú",
                name:"maGiayTamTru",
                isRequired:true,
                type:"text",
                defaultValue:"",
                placeHolder:'nhập địa điểm',
                },    
          ];
          const listInputKT=[

            {
              label:"ID người khai",
              name:"idNguoiKhai",
              isRequired:true,
              defaultValue:parseInt(id),
              type:"text",
              placeHolder:'nhập ID',
              },
              {
                label:"ID người chết",
                name:"idNguoiChet",
                isRequired:true,
                defaultValue:parseInt("2"),
                type:"text",
                placeHolder:'nhập ID',
                },  
              {
              label:"Ngày chết",
              name:"ngayChet",
              isRequired:true,
              type:"text",
              defaultValue:"",
              placeHolder:'nhập ngày',
              },
              {
                  label:"Ngày khai",
                  name:"ngayKhai",
                  isRequired:true,
                  type:"text",
                  defaultValue:"",
                  placeHolder:'nhập ngày',
              },
              {
                  label:"Lý do chết",
                  name:"lyDoChet",
                  isRequired:true,
                  type:"text",
                  defaultValue:"",
                  placeHolder:'nhập lý do',
              },
              {
                  label:"Số giấy khai tử",
                  name:"soGiayKhaiTu",
                  isRequired:true,
                  type:"text",
                  defaultValue:"",
                  placeHolder:'nhập địa điểm',
                  },    
            ];  
  

    const [stateTS,setStateTS]=useState(()=>{
      const nhanKhau={};
      listInputTS.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })
    const [stateDC,setStateDC]=useState(()=>{
      const nhanKhau={};
      listInputDC.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })
    const [stateTV,setStateTV]=useState(()=>{
      const nhanKhau={};
      listInputTV.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })
    const [stateTT,setStateTT]=useState(()=>{
      const nhanKhau={};
      listInputTT.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })
    const [stateKT,setStateKT]=useState(()=>{
      const nhanKhau={};
      listInputKT.forEach(p=>{
        nhanKhau[p.name]=p.defaultValue ?? "";
      })
       return nhanKhau;
    })

  const [state, setState] = useState(0);
  const [arrayData, setArrayData] = useState([])
  const handleChange = (key) => {
    return (e) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeTS = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateTS((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeDC = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateDC((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeTV = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateTV((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeTT = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateTT((old) => ({ ...old, [key]: value }));
    };
  };
  const handleChangeKT = (key) => {
    return (e) => {
      const value = e.target.value;
      setStateKT((old) => ({ ...old, [key]: value }));
    };
  };
  useEffect(()=>{
    if(loadingDC) return;
   if(dataDC)
  {
   const {ID}=dataDC.taoTheDinhDanh
   console.log(ID);
  }
  
  },[loadingDC,dataDC])

  useEffect(()=>{
    if(loadingTV) return;
   if(dataTV)
  {
   const {ID}=dataTV.khaiBaoTamVang
   console.log(ID);
  }
  
  },[loadingTV,dataTV])

  useEffect(()=>{
    if(loadingTT) return;
   if(dataTT)
  {
   const {ID}=dataTT.khaiBaoTamTru
   console.log(ID);
  }
  
  },[loadingTT,dataTT])

  useEffect(()=>{
    if(loadingTS) return;
   if(dataTS)
  {
   const {ID}=dataTS.taoTieuSu
   console.log(ID);
  }
  
  },[loadingTS,dataTS])

  useEffect(()=>{
    if(loadingKT) return;
   if(dataKT)
  {
   const {ID}=dataKT.khaiTu
   console.log(ID);
  }
  
  },[loadingKT,dataKT])
  useEffect(() => {
    if (loading) return;
    if (InforSearchedData) {
      const {
        ID,
        hoTen,
        bietDanh,
        namSinh,
        gioiTinh,
        noiSinh,
        nguyenQuan,
        danToc,
        tonGiao,
        quocTich,
        soHoChieu,
        noiThuongTru,
        diaChiHienNay,
        trinhDoHocVan,
        trinhDoChuyenMon,
        bietTiengDanToc,
        trinhDoNgoaiNgu,
        ngheNghiep,
        noiLamViec,
        tienAn,
        ngayChuyenDen,
        lyDoChuyenDen,
        ngayChuyenDi,
        lyDoChuyenDi,
        diaChiMoi,
        maNhanKhau,
        tieuSu,
      } = InforSearchedData.thongTinNhanKhau;
      
      setArrayData(tieuSu)
      setState({
        ID,
        hoTen,
        bietDanh,
       namSinh:moment(parseInt(namSinh)).format("YYYY-MM-DD"),
        gioiTinh,
        noiSinh,
        nguyenQuan,
        danToc,
        tonGiao,
        quocTich,
        soHoChieu,
        noiThuongTru,
        diaChiHienNay,
        trinhDoHocVan,
        trinhDoChuyenMon,
        bietTiengDanToc,
        trinhDoNgoaiNgu,
        ngheNghiep,
        noiLamViec,
        tienAn,
        ngayChuyenDen:moment(parseInt(ngayChuyenDen)).format("YYYY-MM-DD"),
        lyDoChuyenDen,
        ngayChuyenDi:moment(parseInt(ngayChuyenDi)).format("YYYY-MM-DD"),
        lyDoChuyenDi,
        diaChiMoi,
        maNhanKhau,
      });
    }
  }, [loading, InforSearchedData]);
  
  useEffect(() => {
    if (loadingUpdate) return;
    if (data) {
      const { ID } = data.capNhatNhanKhau;
      console.log(ID);
    }
  }, [loadingUpdate, data]);

  useEffect(()=>{
    if(dataTS){
      setArrayData(arrayData => [...arrayData, dataTS.taoTieuSu])
     
    }
  },[dataTS])
  if (loading && state !== 0) return <h1>please wait</h1>;

  
  return (
    <div>
      <Form listInput={listInput} state={state} handleChange={handleChange} />
      <Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          updateUser({
            variables: {
              input: state,
            },
          }).catch((e) => {
            console.log(e.message);
          });
        console.log(state)
        history.push("/app/edit-nk")
        }}
      >
        Cập nhật nhân khẩu
      </Button>
      <Form listInput={listInputTS} state={stateTS}  handleChange={handleChangeTS}/>
      <Button className="btn-TS"
        variant="contained"
        color="success"
        onClick={() => {
          createTS({
            variables: {
              input: stateTS,
            },
          }).catch((e) => {
            console.log(e.message);
          });
        }}
      >
        Tạo tiểu sử
      </Button>
     
      <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> Từ ngày</TableCell>
        <TableCell> Đến ngày</TableCell>
        <TableCell> Địa chỉ</TableCell>
        <TableCell> Nghề nghiệp</TableCell>
        <TableCell> Nơi làm việc</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        
        {arrayData?.map(({ID,tuNgay, denNgay, diaChi, ngheNghiep, noiLamViec}) => (
          <TableRow key={tuNgay}>
            <TableCell className="pl-3 fw-normal">
            {moment(parseInt(tuNgay)).format("YYYY-MM-DD")}
            </TableCell>
            <TableCell>
            {moment(parseInt(denNgay)).format("YYYY-MM-DD")}
            </TableCell>
            <TableCell>
            {diaChi}
            </TableCell>
            <TableCell>
            {ngheNghiep}
            </TableCell>
            <TableCell>
            {noiLamViec}
            </TableCell>
            <Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          deleteTS({
            variables: {
              input: ID,
            },
          }).catch((e) => {
            console.log(e.message);
          });
        console.log()
        
        }}
      >
        Xóa tiểu sử
      </Button>
            
          </TableRow>
        ))}
        
      </TableBody>
    </Table>
    <Form listInput={listInputDC} state={stateDC} handleChange={handleChangeDC} />
    <Button variant="contained" color="success" onClick={() => {
                createDC({
                  variables: {
                    input: 
                      stateDC 
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
                console.log(stateDC);
               console.log(dataDC)
               console.log(error)
              }}>Tạo thẻ định danh</Button>
              <div>
          {InforSearchedData && (
            <div>
              <h1>Số định danh: {InforSearchedData.thongTinNhanKhau.dinhDanh.soDinhDanh}</h1>
              <h1>
                Ngày cấp: {moment(parseInt(InforSearchedData.thongTinNhanKhau.dinhDanh.ngayCap)).format("YYYY-MM-DD")}
              </h1>{" "}
              <h1>
                Nơi cấp: {InforSearchedData.thongTinNhanKhau.dinhDanh.noiCap}
              </h1>{" "}
              <h1>
                Type: {InforSearchedData.thongTinNhanKhau.dinhDanh.type}
              </h1>{" "}
            </div>
          )}
          {InforError && <h1> There was an error fetching the data</h1>}
          <Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          deleteDC({
            variables: {
              input: parseInt(id),
            },
          }).catch((e) => {
            console.log(e.message);
          });
        console.log(loadingDC)
        
        }}
      >
        Xóa thẻ định danh
      </Button>
      <Form listInput={listInputTV} state={stateTV} handleChange={handleChangeTV} />
      <Button variant="contained" color="success" onClick={() => {
                createTV({
                  variables: {
                    input: 
                      stateTV
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
              }}>Khai báo tạm vắng</Button>
      {InforSearchedData && (
            <div>
              <h1>Từ ngày: {moment(parseInt(InforSearchedData.thongTinNhanKhau.tamVang.tuNgay)).format("YYYY-MM-DD")}</h1>
              <h1>
                Đến ngày: {moment(parseInt(InforSearchedData.thongTinNhanKhau.tamVang.denNgay)).format("YYYY-MM-DD")}
              </h1>{" "}
              <h1>
                Nơi tạm trú: {InforSearchedData.thongTinNhanKhau.tamVang.noiTamTru}
              </h1>{" "}
              <h1>
                Mã giấy tạm vắng: {InforSearchedData.thongTinNhanKhau.tamVang.maGiayTamVang}
              </h1>{" "}
              <h1>
                Lý do: {InforSearchedData.thongTinNhanKhau.tamVang.lyDo}
              </h1>{" "}
            </div>
          )}        

<Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          deleteTV({
            variables: {
              input: parseInt(id),
            },
          }).catch((e) => {
            console.log(e.message);
          });
        // console.log(loadingTV)
        
        }}
      >
        Xóa tạm vắng
      </Button>
      <Form listInput={listInputTT} state={stateTT} handleChange={handleChangeTT} />
      <Button variant="contained" color="success" onClick={() => {
                createTT({
                  variables: {
                    input: 
                      stateTT
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
              }}>Khai báo tạm trú</Button>
      {InforSearchedData && (
            <div>
              <h1>Từ ngày: {moment(parseInt(InforSearchedData.thongTinNhanKhau.tamTru.tuNgay)).format("YYYY-MM-DD")}</h1>
              <h1>
                Đến ngày: {moment(parseInt(InforSearchedData.thongTinNhanKhau.tamTru.denNgay)).format("YYYY-MM-DD")}
              </h1>{" "}
              <h1>
                Số điện thoại người đăng ký: {InforSearchedData.thongTinNhanKhau.tamTru.soDienThoaiNguoiDangKy}
              </h1>{" "}
              <h1>
                Mã giấy tạm trú: {InforSearchedData.thongTinNhanKhau.tamTru.maGiayTamTru}
              </h1>{" "}
              <h1>
                Lý do: {InforSearchedData.thongTinNhanKhau.tamTru.lyDo}
              </h1>{" "}
            </div>
          )}  
          {InforError && <h1> There was an error fetching the data</h1>}
          <Button className="btn-update"
        variant="contained"
        color="success"
        onClick={() => {
          deleteTT({
            variables: {
              input: parseInt(id),
            },
          }).catch((e) => {
            console.log(e.message);
          });
        // console.log(loadingTV)
        
        }}
      >
        Xóa tạm trú
      </Button>
      <Form listInput={listInputKT} state={stateKT}  handleChange={handleChangeKT}/>       
      <Button variant="contained" color="success" onClick={() => {
                createKT({
                  variables: {
                    input: 
                      stateKT
                    
                  },
                }).catch(e=>{
                  console.log(e.message)
                });
                console.log(InforSearchedData)
              }}>Khai tử</Button>       
      {/* {InforSearchedData && (
            <div>
              <h1>ID: {InforSearchedData.thongTinNhanKhau.khaiTu.ID}</h1>
              <h1>
                Ngày khai: {InforSearchedData.thongTinNhanKhau.khaiTu.ngayKhai}
              </h1>{" "}
              <h1>
                Ngày chết: {InforSearchedData.thongTinNhanKhau.khaiTu.ngayChet}
              </h1>{" "}
              <h1>
                Số giấy khai tử: {InforSearchedData.thongTinNhanKhau.khaiTu.soGiayKhaiTu}
              </h1>{" "}
              <h1>
                Lý do chết: {InforSearchedData.thongTinNhanKhau.khaiTu.lyDoChet}
              </h1>{" "}
              <h1>
                Họ tên người khai: {InforSearchedData.thongTinNhanKhau.khaiTu.nguoiKhai.hoTen}
              </h1>{" "}
            </div>
          )}  
          {InforError && <h1> There was an error fetching the data</h1>}         */}
        </div>
    </div>
  );
}
