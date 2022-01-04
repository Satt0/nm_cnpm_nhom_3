import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { THONG_TIN_NHAN_KHAU } from "../../../api/graphql/query/thong_tin_nhan_khau";
import { CAP_NHAT_NHAN_KHAU } from "../../../api/graphql/mutation/cap_nhat_nhan_khau";
import { TAO_TIEU_SU } from "../../../api/graphql/mutation/tao_tieu_su";
import { XOA_TIEU_SU } from "../../../api/graphql/mutation/xoa_tieu_su";
import { TIM_NHAN_KHAU } from "../../../api/graphql/query/tim_nhan_khau";
import { XOA_THE_DINH_DANH } from "../../../api/graphql/mutation/xoa_the_dinh_danh";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import moment from "moment";
import { Button } from "@material-ui/core";
import { listInput } from "../../maps/Maps";
import Form from "../../../components/Form";
import NewForm from "../../../components/autoCompleteForm";
import { Link } from "react-router-dom";
import "./sua-nhan-khau.css";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { TAO_THE_DINH_DANH } from "../../../api/graphql/mutation/tao_the_dinh_danh";
import { KHAI_BAO_TAM_VANG } from "../../../api/graphql/mutation/khai_bao_tam_vang";
import { KHAI_BAO_TAM_TRU } from "../../../api/graphql/mutation/khai_bao_tam_tru";
import { KHAI_TU } from "../../../api/graphql/mutation/khai_tu";
import { XOA_TAM_VANG } from "../../../api/graphql/mutation/xoa_tam_vang";
import { XOA_TAM_TRU } from "../../../api/graphql/mutation/xoa_tam_tru";
import { XOA_KHAI_TU } from "../../../api/graphql/mutation/xoa_khai_tu";
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));
export default function EditOne() {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false)
  const handleChanged = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const history = useHistory();
  const params = useParams();
  const id = Object.values(params)[0];
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const { data: InforSearchedData, error: InforError, loading, refetch } = useQuery(
    THONG_TIN_NHAN_KHAU,
    {
      variables: {
        input: parseInt(id),
      },
      fetchPolicy: "no-cache",
    },
  );
  const [updateUser, { loading: loadingUpdate, data }] = useMutation(
    CAP_NHAT_NHAN_KHAU,
  );
  const [createTS, { loading: loadingTS, data: dataTS }] = useMutation(
    TAO_TIEU_SU,
  );
  const [deleteTS, { loading: loadingDel, data: dataDel }] = useMutation(
    XOA_TIEU_SU,
  );
  const [createDC, { loading: loadingDC, data: dataDC, error }] = useMutation(
    TAO_THE_DINH_DANH,
  );
  const [deleteDC, { loading: loadingDelDC, data: dataDelDC }] = useMutation(
    XOA_TIEU_SU,
  );
  const [createTV, { loading: loadingTV, data: dataTV }] = useMutation(
    KHAI_BAO_TAM_VANG,
  );
  const [deleteTV, { loading: loadingDelTV, data: dataDelTV }] = useMutation(
    XOA_TAM_VANG,
  );
  const [createTT, { loading: loadingTT, data: dataTT }] = useMutation(
    KHAI_BAO_TAM_TRU,
  );
  const [
    deleteTT,
    { loading: loadingDelTT, data: dataDelTT, error: errorTT },
  ] = useMutation(XOA_TAM_TRU);
  const [createKT, { loading: loadingKT, data: dataKT }] = useMutation(KHAI_TU);
  const [deleteKT, { loading: loadingDelKT, data: dataDelKT }] = useMutation(
    XOA_KHAI_TU,
  );

    // states
    


  const listInputTS = [
    {
      label: "ID nhân khẩu",
      name: "idNhanKhau",
      isRequired: true,
      defaultValue: parseInt(id),
      type: "text",
      placeHolder: "nhập ID",
    },
    {
      label: "Từ ngày",
      name: "tuNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Đến ngày",
      name: "denNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Địa chỉ",
      name: "diaChi",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa chỉ",
    },
    {
      label: "Nghề nghiệp",
      name: "ngheNghiep",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập nghề nghiệp",
    },
    {
      label: "Nơi làm việc",
      name: "noiLamViec",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa điểm",
    },
  ];
  const listInputDC = [
    {
      label: "ID nhân khẩu",
      name: "idNhanKhau",
      isRequired: true,
      defaultValue: parseInt(id),
      type: "text",
      placeHolder: "nhập ID",
    },
    {
      label: "Số định danh",
      name: "soDinhDanh",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Ngày cấp",
      name: "ngayCap",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Nơi cấp",
      name: "noiCap",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa chỉ",
    },
    {
      label: "Type",
      name: "type",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập nghề nghiệp",
    },
  ];
  const listInputTV = [
    {
      label: "ID nhân khẩu",
      name: "idNhanKhau",
      isRequired: true,
      defaultValue: parseInt(id),
      type: "text",
      placeHolder: "nhập ID",
    },
    {
      label: "Từ ngày",
      name: "tuNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Đến ngày",
      name: "denNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Nơi tạm trú",
      name: "noiTamTru",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập nơi tạm trú",
    },
    {
      label: "Lý do",
      name: "lyDo",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập lý do",
    },
    {
      label: "Mã giấy tạm vắng",
      name: "maGiayTamVang",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa điểm",
    },
  ];
  const listInputTT = [
    {
      label: "ID nhân khẩu",
      name: "idNhanKhau",
      isRequired: true,
      defaultValue: parseInt(id),
      type: "text",
      placeHolder: "nhập ID",
    },
    {
      label: "Từ ngày",
      name: "tuNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Đến ngày",
      name: "denNgay",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Số điện thoại người đăng ký",
      name: "soDienThoaiNguoiDangKy",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập nơi tạm trú",
    },
    {
      label: "Lý do",
      name: "lyDo",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập lý do",
    },
    {
      label: "Mã giấy tạm trú",
      name: "maGiayTamTru",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa điểm",
    },
  ];
  
  const listInputKT = [
    {
      label: "ID người khai",
      name: "idNguoiKhai",
      isRequired: true,
      defaultValue: parseInt("2"),
      placeHolder: "nhập ID",
      
    },
    {
      label: "ID người chết",
      name: "idNguoiChet",
      isRequired: true,
      defaultValue: parseInt(id),
      type: "text",
      placeHolder: "nhập ID",
    },
    {
      label: "Ngày chết",
      name: "ngayChet",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Ngày khai",
      name: "ngayKhai",
      isRequired: true,
      type: "date",
      defaultValue: "",
      placeHolder: "nhập ngày",
    },
    {
      label: "Lý do chết",
      name: "lyDoChet",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập lý do",
    },
    {
      label: "Số giấy khai tử",
      name: "soGiayKhaiTu",
      isRequired: true,
      type: "text",
      defaultValue: "",
      placeHolder: "nhập địa điểm",
    },
  ];
  const[limit] = useState(500);  
  const[offset] = useState(0);
  const[name, setName] = useState("")

  const [stateTS, setStateTS] = useState(() => {
    const nhanKhau = {};
    listInputTS.forEach((p) => {
      nhanKhau[p.name] = p.defaultValue ?? "";
    });
    return nhanKhau;
  });
  const [stateDC, setStateDC] = useState(() => {
    const nhanKhau = {};
    listInputDC.forEach((p) => {
      nhanKhau[p.name] = p.defaultValue ?? "";
    });
    return nhanKhau;
  });
  const [stateTV, setStateTV] = useState(() => {
    const nhanKhau = {};
    listInputTV.forEach((p) => {
      nhanKhau[p.name] = p.defaultValue ?? "";
    });
    return nhanKhau;
  });
  const [stateTT, setStateTT] = useState(() => {
    const nhanKhau = {};
    listInputTT.forEach((p) => {
      nhanKhau[p.name] = p.defaultValue ?? "";
    });
    return nhanKhau;
  });
  const [stateKT, setStateKT] = useState(() => {
    const nhanKhau = {};
    listInputKT.forEach((p) => {
      nhanKhau[p.name] = p.defaultValue ?? "";
    });
    return nhanKhau;
  });
  const [fetchInfor,{ data: InforNK, error: InforErrorNK, loadingNK }] = useLazyQuery(
    TIM_NHAN_KHAU,{fetchPolicy: "no-cache"}
  );
  console.log(InforNK)
  // const option = InforNK.timNhanKhau.map((item)=> item.ID)

  const [state, setState] = useState(0);
  const [arrayData, setArrayData] = useState([]);
  const [arrayDataTV, setArrayDataTV] = useState([]);
  const [arrayDataTT, setArrayDataTT] = useState([]);
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
  useEffect(() => {
    if (loadingDC) return;
    if (dataDC) {
      const { ID } = dataDC.taoTheDinhDanh;
      console.log(ID);
    }
  }, [loadingDC, dataDC]);

  useEffect(() => {
    if (loadingTV) return;
    if (dataTV) {
      const { idNhanKhau, tuNgay, denNgay, maGiayTamVang, noiTamTru, lyDo } = dataTV.khaiBaoTamVang;
      // 
      setStateTV({
        idNhanKhau,
        tuNgay,
        denNgay,
        lyDo,
        maGiayTamVang,
        noiTamTru
      })
      toast("Khai báo thành công")
    }
  }, [loadingTV, dataTV]);

  useEffect(() => {
    if (loadingTT) return;
    if (dataTT) {
      const { idNhanKhau, tuNgay, denNgay, lyDo, maGiayTamTru, soDienThoaiNguoiDangKy } = dataTT.khaiBaoTamTru;
      // console.log(ID);
      setStateTT({
        idNhanKhau,
        tuNgay,
        denNgay,
        lyDo,
        maGiayTamTru,
        soDienThoaiNguoiDangKy
      })
      toast("Khai báo thành công")
    }
  }, [loadingTT, dataTT]);

  useEffect(() => {
    if (loadingTS) return;
    if (dataTS) {
      const { ID } = dataTS.taoTieuSu;
      console.log(ID);
    }
  }, [loadingTS, dataTS]);

  useEffect(() => {
    if (loadingKT) return;
    if (dataKT) {
      const { ID } = dataKT.khaiTu;
      console.log(ID);
    }
  }, [loadingKT, dataKT]);
  // useEffect(() => {
  //   if (loadingNK) return;
  //   if (InforNK) {
  //     const option = InforNK.timNhanKhau.map((item)=> item.ID)
  //   }
  // }, [loadingNK, InforNK]);
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
        dinhDanh,
        tamTru,
        tamVang,
        khaiTu
      } = InforSearchedData.thongTinNhanKhau;

      setArrayData(tieuSu);
      setArrayDataTV(tamVang);
      setArrayDataTT(tamTru)
      setState({
        ID,
        hoTen,
        bietDanh,
        namSinh: moment(parseInt(namSinh)).format("YYYY-MM-DD"),
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
        ngayChuyenDen: moment(parseInt(ngayChuyenDen)).format("YYYY-MM-DD"),
        lyDoChuyenDen,
        ngayChuyenDi: moment(parseInt(ngayChuyenDi)).format("YYYY-MM-DD"),
        lyDoChuyenDi,
        diaChiMoi,
        maNhanKhau,
      });
      refetch()
      if(dinhDanh){
        setStateDC({...dinhDanh,ngayCap:moment(parseInt(dinhDanh.ngayCap)).format("YYYY-MM-DD"), idNhanKhau: parseInt(id)})
      }
      // if(tamTru){
      //   setStateTT({...tamTru,tuNgay:moment(parseInt(tamTru.tuNgay)).format("YYYY-MM-DD"), denNgay:moment(parseInt(tamTru.denNgay)).format("YYYY-MM-DD"), idNhanKhau: parseInt(id)})
      // }
      // if(tamVang){
      //   setStateTV({...tamVang, tuNgay:moment(parseInt(tamVang.tuNgay)).format("YYYY-MM-DD"), denNgay:moment(parseInt(tamVang.denNgay)).format("YYYY-MM-DD"), idNhanKhau: parseInt(id)})
      // }
      if(khaiTu){
        setStateKT({...khaiTu, ngayKhai: moment(parseInt(khaiTu.ngayKhai)).format("YYYY-MM-DD"), ngayChet: moment(parseInt(khaiTu.ngayChet)).format("YYYY-MM-DD") })
      }
    }
  }, [loading, InforSearchedData]);

  useEffect(() => {
    if (loadingUpdate) return;
    if (data) {
      const { ID } = data.capNhatNhanKhau;
      console.log(ID);
      toast("Cập nhật thành công")
    }
  }, [loadingUpdate, data]);

  useEffect(() => {
    if (dataTS) {
      setArrayData((arrayData) => [...arrayData, dataTS.taoTieuSu]);
    }
  }, [dataTS]);
  useEffect(() => {
    if (dataTV) {
      setArrayDataTV((arrayData) => [...arrayData, dataTV.khaiBaoTamVang]);
    }
  }, [dataTV]);
  useEffect(() => {
    if (dataTT) {
      setArrayDataTT((arrayData) => [...arrayData, dataTT.khaiBaoTamTru]);
    }
  }, [dataTT]);
  if (loading && state !== 0) return <h1>please wait</h1>;

  return (
    <div>
      <Form listInput={listInput} state={state} handleChange={handleChange} />
      <Button
        className="btn-update"
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
          console.log(state);
          // history.push("/app/edit-nk");
          // toast("Cập nhật thành công")
        }}
      >
        Cập nhật nhân khẩu
      </Button>
      <Link to="/app/dashboard">
              <Button variant="contained" color="secondary">Hủy</Button>
              </Link>
      <h1>Tiểu sử</h1>
      <Form
        listInput={listInputTS}
        state={stateTS}
        handleChange={handleChangeTS}
      />
      <Button
        className="btn-TS"
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
          refetch()
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
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayData?.map(
            ({ ID, tuNgay, denNgay, diaChi, ngheNghiep, noiLamViec }) => (
              <TableRow key={tuNgay}>
                <TableCell className="pl-3 fw-normal">
                  {moment(parseInt(tuNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(parseInt(denNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{diaChi}</TableCell>
                <TableCell>{ngheNghiep}</TableCell>
                <TableCell>{noiLamViec}</TableCell>
                <TableCell>
                <Button
                  className="btn-update"
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
                    console.log();
                    refetch()
                  }}
                >
                  Xóa tiểu sử
                </Button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
      <h1>Định danh</h1>
      <Form
        listInput={listInputDC}
        state={stateDC}
        handleChange={handleChangeDC}
      />
      <Button
        variant="contained"
        color="success"
        onClick={() => {
          createDC({
            variables: {
              input: stateDC,
            },
          }).catch((e) => {
            console.log(e.message);
          });
          console.log(stateDC);
          console.log(dataDC);
          console.log(error);
        }}
      >
        Tạo thẻ định danh
      </Button>
      <div>
        {InforSearchedData && (
          <div>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChanged('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Số định danh</Typography>
          <Typography className={classes.secondaryHeading}>{stateDC.soDinhDanh}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChanged('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Ngày cấp</Typography>
          <Typography className={classes.secondaryHeading}>
          {stateDC.ngayCap}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChanged('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Nơi cấp</Typography>
          <Typography className={classes.secondaryHeading}>
            {stateDC.noiCap}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChanged('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Type</Typography>
          <Typography className={classes.secondaryHeading}>
            {stateDC.type}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
          </div>
        )}
        {InforError && <h1> There was an error fetching the data</h1>}
        <Button
          className="btn-update"
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
            console.log(loadingDC);
          }}
        >
          Xóa thẻ định danh
        </Button>
        <h1>Tạm vắng</h1>
        <Button color="secondary" onClick={() => setOpen(!open)}>Khai báo</Button>
        <div className="" style={{display:open?"block":"none"}}>
        <Form
          listInput={listInputTV}
          state={stateTV}
          handleChange={handleChangeTV}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            createTV({
              variables: {
                input: stateTV,
              },
            }).catch((e) => {
              console.log(e.message);
            });
            console.log(arrayDataTV)
            console.log(stateTV)
            refetch()
          }}
        >
          Khai báo tạm vắng
        </Button>
        </div>
        <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell> Từ ngày</TableCell>
            <TableCell> Đến ngày</TableCell>
            <TableCell> Mã giấy tạm vắng</TableCell>
            <TableCell> Nơi tạm trú</TableCell>
            <TableCell> Lý do</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayDataTV.length > 0 ? arrayDataTV?.map(
            ({ ID, tuNgay, denNgay, maGiayTamVang, noiTamTru, lyDo }) => (
              <TableRow key={tuNgay}>
                <TableCell className="pl-3 fw-normal">
                  {moment(parseInt(tuNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(parseInt(denNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{maGiayTamVang}</TableCell>
                <TableCell>{noiTamTru}</TableCell>
                <TableCell>{lyDo}</TableCell>
                <TableCell>
                <Button
          className="btn-update"
          variant="contained"
          color="success"
          onClick={() => {
            deleteTV({
              variables: {
                input: ID, 
              },
            }).catch((e) => {
              console.log(e.message);
            });
            // console.log(loadingTV)
            refetch();
          }}
        >
          Xóa tạm vắng
        </Button>
                </TableCell>
              </TableRow>
            ),
          ) : ""}
        </TableBody>
      </Table>

        
        <h1>Tạm trú</h1>
        <Button color="secondary" onClick={() => setOpen1(!open1)}>Khai báo</Button>
        <div style={{display:open1?"block":"none"}}>
        <Form
          listInput={listInputTT}
          state={stateTT}
          handleChange={handleChangeTT}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            createTT({
              variables: {
                input: stateTT,
              },
            }).catch((e) => {
              console.log(e.message);
            });
            console.log(stateTT)
            console.log(arrayDataTT)
            console.log(dataTT)
            refetch();
          }}
        >
          Khai báo tạm trú
        </Button>
        </div>
        <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell> Từ ngày</TableCell>
            <TableCell> Đến ngày</TableCell>
            <TableCell> Số điện thoại người đăng ký</TableCell>
            <TableCell> Mã giấy tạm trú</TableCell>
            <TableCell> Lý do</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {arrayDataTT?.map(
            ({ ID, tuNgay, denNgay, soDienThoaiNguoiDangKy, maGiayTamTru, lyDo }) => (
              <TableRow key={tuNgay}>
                <TableCell className="pl-3 fw-normal">
                  {moment(parseInt(tuNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>
                  {moment(parseInt(denNgay)).format("YYYY-MM-DD")}
                </TableCell>
                <TableCell>{soDienThoaiNguoiDangKy}</TableCell>
                <TableCell>{maGiayTamTru}</TableCell>
                <TableCell>{lyDo}</TableCell>
                <TableCell>
                <Button
          className="btn-update"
          variant="contained"
          color="success"
          onClick={() => {
            deleteTT({
              variables: {
                input: ID,
              },
            }).catch((e) => {
              console.log(e.message);
            });
            // console.log(loadingTV)
            refetch();
          }}
        >
          Xóa tạm trú
        </Button>
                </TableCell>
              </TableRow>
            ),
          )}
        </TableBody>
      </Table>
        <Button
          className="btn-update"
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
        <h1>Khai tử</h1>
        <Form
          listInput={listInputKT}
          state={stateKT}
          handleChange={handleChangeKT}
        />
        <div>
        <input
          type="text"
          placeholder="Nhập tên"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <button
          onClick={() => {
            fetchInfor({
              variables: {
                input: {limit, offset, name}
              },
            });
            console.log(InforNK)
          }}
        >
          Tìm ID người khai
        </button>
        <Table className="mb-0">
      <TableHead>
        <TableRow>
        <TableCell> ID</TableCell>
        <TableCell> HoTen</TableCell>
        <TableCell> ngay sinh</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {InforNK?.timNhanKhau?.map(({ ID,hoTen,namSinh}) => (
          <TableRow key={ID}>
            <TableCell className="pl-3 fw-normal">
            {ID}
            </TableCell>
            <TableCell>
            {hoTen}
            </TableCell>
            <TableCell>{moment(parseInt(namSinh)).format("DD-MM-YYYY")}</TableCell>
            
          </TableRow>
        ))}
      </TableBody>
    </Table>
        </div>
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            createKT({
              variables: {
                input: {...stateKT,idNguoiKhai:parseInt(stateKT.idNguoiKhai),
                idNguoiChet:parseInt(stateKT.idNguoiChet)},
              },
            }).catch((e) => {
              console.log(e.message);
            });
            console.log(InforSearchedData);
            // console.log(option)
          }}
        >
          Khai tử
        </Button>
        {InforSearchedData && (
            <div>
              <Accordion expanded={expanded === 'panel1'} onChange={handleChanged('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>Số giấy khai tử</Typography>
          <Typography className={classes.secondaryHeading}>{stateKT.soGiayKhaiTu}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChanged('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>Ngày khai</Typography>
          <Typography className={classes.secondaryHeading}>
          {stateKT.ngayKhai}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
            diam eros in elit. Pellentesque convallis laoreet laoreet. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChanged('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>Ngày chết</Typography>
          <Typography className={classes.secondaryHeading}>
            {stateKT.ngayChet}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChanged('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography className={classes.heading}>Lý do chết</Typography>
          <Typography className={classes.secondaryHeading}>
            {stateKT.lyDoChet}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {/* Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas eros,
            vitae egestas augue. Duis vel est augue. */}
          </Typography>
        </AccordionDetails>
      </Accordion>
            </div>
          )}  
          {InforError && <h1> There was an error fetching the data</h1>}    
          <Button
          className="btn-update"
          variant="contained"
          color="success"
          onClick={() => {
            deleteKT({
              variables: {
                input: parseInt(id),
              },
            }).catch((e) => {
              console.log(e.message);
            });
            // console.log(loadingTV)
          }}
        >
          Xóa khai tử
        </Button>    
        
      </div>
    </div>
  );
}
