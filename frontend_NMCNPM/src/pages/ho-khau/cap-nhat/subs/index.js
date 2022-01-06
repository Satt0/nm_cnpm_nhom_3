import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import { Redirect, Link } from "react-router-dom";
import { CAP_NHAT_HO_KHAU } from "../../../../api/graphql/mutation/cap_nhat_ho_khau";
import { THONG_TIN_HO_KHAU } from "../../../../api/graphql/query/thong_tin_ho_khau";
import { CAP_NHAT_THANH_VIEN } from "../../../../api/graphql/mutation/cap_nhat_thanh_vien";
import { GOI_Y_NHAN_KHAU } from "../../../../api/graphql/query/goi_y_nhan_khau";
import { NHAP_KHAU } from "../../../../api/graphql/mutation/nhap_khau";
import { XOA_THANH_VIEN } from "../../../../api/graphql/mutation/xoa_thanh_vien";
import {
  TextField,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { toast } from "react-toastify";
import moment from "moment";
import TachKhau from "./tachKhau";
const inputs = [
  {
    name: "maHoKhau",
    label: "Mã hộ khẩu",
    isRequired: true,
    type: "text",
  },
  {
    name: "maKhuVuc",
    label: "Mã khu vực",
    isRequired: true,
    type: "text",
  },
  {
    name: "ngayChuyenDi",
    label: "Ngày chuyển đi",
    helperText:"nếu hộ đã chuyển đi.",
    isRequired: true,
    type: "date",
  },
  {
    name: "diaChi",
    label: "Địa chỉ",
    isRequired: true,
    type: "text",
  },
];

export default function UpdateOneHoKHau({
  match: {
    params: { ID = -1 },
  },
}) {
  const [state, setState] = useState(null);
  const idHoKhau = ID;
  const [nhanKhau, setNhanKhau] = useState([]);
  const [dinhChinh, setDinhChinh] = useState([]);
  const [showTachKhau, setShowTachKhau] = useState(false);
  const [
    updateHoKhau,
    { data: dataUpdate, error: errorUpdate, loading: loadingUpdate },
  ] = useMutation(CAP_NHAT_HO_KHAU, { fetchPolicy: "no-cache" });
  const [deleteNK] = useMutation(XOA_THANH_VIEN, { fetchPolicy: "no-cache" });
  const { data, loading, error } = useQuery(THONG_TIN_HO_KHAU, {
    variables: { input: parseInt(ID) },
    fetchPolicy: "no-cache",
  });
  const onUpdate = () => {
    updateHoKhau({
      variables: {
        input: { ...state, ID: parseInt(ID) },
      },
    }).catch((e) => {
      console.log(e.message);
    });
  };
  useEffect(() => {
    if (data) {
      const {
        maHoKhau,
        maKhuVuc,
        diaChi,
        ngayChuyenDi,
        thanhVien = [],
        dinhChinh = [],
        chuHo = {},
      } = data.thongTinHoKhau;
      setState({
        maHoKhau,
        maKhuVuc,
        diaChi,
        ngayChuyenDi: moment(parseInt(ngayChuyenDi)).format("YYYY-MM-DD"),
        idChuHo: chuHo?.ID ?? -1,
      });
      setNhanKhau([...thanhVien]);
      setDinhChinh([...dinhChinh]);
    }
  }, [data]);
  const handleChange = (key) => {
    return (e) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };
  };

  const onNhapKhau = (thanhVien) => {
    setNhanKhau((old) => [...old, thanhVien]);
  };
  const onXoaKhau = async ({ idNhanKhau }) => {
    try {
      await deleteNK({
        variables: {
          input: {
            idNhanKhau: parseInt(idNhanKhau),
            idHoKhau: parseInt(idHoKhau),
          },
        },
      });
      setNhanKhau((old) => old.filter((e) => e.ID !== idNhanKhau));
    } catch (e) {
      console.log(e.message);
    }
  };
  const onCheckTachKhau = (ID) => {
    return (e) => {
      const isChecked = e.target.checked;
      setNhanKhau((old) =>
        old.map((e) => {
          if (e.ID === ID) {
            return { ...e, isChecked };
          }
          return e;
        }),
      );
    };
  };
  useEffect(() => {
    if (loadingUpdate) return;
    if (errorUpdate) return toast("không thể cập nhật hộ khẩu, kiểm tra lại mã hộ khẩu");
    if (dataUpdate) {
      return alert("cập nhật thành công!");
    }
  }, [dataUpdate, errorUpdate, loadingUpdate]);

  if (loading) return <h1>please wait</h1>;

  if (error) return <Redirect to={"/app/edit-hk"} />;
  if (state) {
    return (
        showTachKhau ? <div style={{ position: "relative" }}>
        
        <TachKhau
              idHoKhau={parseInt(idHoKhau)}
              onClose={() => {
                setShowTachKhau(false);
              }}
              defaultNhanKhau={nhanKhau.filter((e) => e.isChecked)}
            />
        
        </div>:      <div style={{ position: "relative" }}>
        <form
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gridGap: 15,
          }}
        >
          {inputs.map((i) => (
            <TextField
              {...i}
              value={state[i.name]}
              onChange={handleChange(i.name)}
              InputLabelProps={{ shrink: true }}
              variant="outlined"
            />
          ))}
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Chủ Hộ</InputLabel>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={state.idChuHo}
              label="Age"
              onChange={handleChange("idChuHo")}
            >
              <MenuItem value={-1}>Không có</MenuItem>
              {nhanKhau.map((nk) => (
                <MenuItem value={nk.ID}>{`${nk.ID}-${nk.hoTen}`}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <div>
            <Button onClick={onUpdate} variant="contained" color="primary">
              Cập nhật
            </Button>
          </div>
        </form>

        <div>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                <TableCell>
                  {" "}
                  <span style={{ color: "gray", fontSize: ".9em" }}>
                    chọn tách khẩu
                  </span>
                </TableCell>
                <TableCell> ID</TableCell>
                <TableCell> Tên nhân khẩu</TableCell>
                <TableCell> Quan hệ với chủ hộ</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nhanKhau.map(
                ({ ID, hoTen, quanHeVoiChuHo, isChecked = false }) => (
                  <TableRow key={ID}>
                    <TableCell className="pl-3 fw-normal">
                      {ID !== state.idChuHo && (
                        <Checkbox
                          checked={isChecked}
                          onChange={onCheckTachKhau(ID)}
                        />
                      )}
                    </TableCell>
                    <TableCell className="pl-3 fw-normal">{ID}</TableCell>
                    <TableCell className="pl-3 fw-normal">{hoTen}</TableCell>
                    <TableCell className="pl-3 fw-normal">
                      {ID===state.idChuHo?<p>Chủ Hộ</p>:<UpdateThanhVien
                        idNhanKhau={parseInt(ID)}
                        idHoKhau={parseInt(idHoKhau)}
                        isChuHo={ID === state.idChuHo}
                        text={ID ===  quanHeVoiChuHo}
                      />}
                    </TableCell>
                    <TableCell className="pl-3 fw-normal">
                      <Button
                        disabled={ID === state.idChuHo}
                        onClick={() => {
                          onXoaKhau({ idNhanKhau: ID });
                        }}
                        variant="contained"
                        color="secondary"
                      >
                        Xóa Khẩu
                      </Button>
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>
        <div
          style={{ display: "flex", justifyContent: "flex-start", margin: 10 }}
        >
          <Button
            disabled={!nhanKhau.some((e) => e.isChecked)}
            onClick={() => {
              setShowTachKhau(true);
            }}
            variant="contained"
            color="primary"
          >
            Tách khẩu
          </Button>
         
        </div>
        <NhapKhau idHoKhau={idHoKhau} onSelected={onNhapKhau} />
        <div>
          <h1>Đính chính</h1>
          <Table className="mb-0">
            <TableHead>
              <TableRow>
                
                <TableCell> Thông tin thay đổi</TableCell>
                <TableCell>Thay đổi từ</TableCell>
                <TableCell>Thay đổi thành</TableCell>
                <TableCell>Ngày thay đổi</TableCell>
                <TableCell>người thay đổi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dinhChinh.map(
                ({
                  ID,
                  thongTinThayDoi,
                  thayDoiTu,
                  doiThanh,
                  ngayThayDoi,
                  nguoiThayDoi,
                }) => (
                  <TableRow key={ID}>
                    <TableCell className="pl-3 fw-normal">
                      {thongTinThayDoi}
                    </TableCell>
                    <TableCell className="pl-3 fw-normal">{thayDoiTu}</TableCell>
                    <TableCell className="pl-3 fw-normal">{doiThanh}</TableCell>
                    <TableCell className="pl-3 fw-normal">
                      {moment(parseInt(ngayThayDoi)).format("YYYY-MM-DD")}
                    </TableCell>
                    <TableCell className="pl-3 fw-normal">
                      {nguoiThayDoi?.username}
                    </TableCell>
                  </TableRow>
                ),
              )}
            </TableBody>
          </Table>
        </div>


        
      </div>
    );
  }
  return <></>;
}

const UpdateThanhVien = ({ isChuHo = false, text, idNhanKhau, idHoKhau }) => {
  const [status, setStatus] = useState(false);
  const [value, setValue] = useState(text);
  const [update, { data, error, loading }] = useMutation(CAP_NHAT_THANH_VIEN);
  useEffect(() => {
    if (loading) return;
    if (error) return alert("không thể cập nhật thành viên!");
    if (data) {
      const { quanHeVoiChuHo } = data.capNhatThanhVien;
      setValue(quanHeVoiChuHo);
      setStatus(false);
    }
  }, [data, loading, error]);

  if (status === false || isChuHo === true) {
    return (
      <p>
        {value}{" "}
        {!isChuHo && (
          <button
            onClick={() => {
              setStatus(true);
            }}
          >
            edit
          </button>
        )}
      </p>
    );
  }

  return (
    <div>
      <TextField
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></TextField>
      <button
        disabled={text === value}
        onClick={() => {
          update({
            variables: {
              input: {
                quanHeVoiChuHo: value,
                idNhanKhau,
                idHoKhau,
              },
            },
          }).catch((e) => {
            console.log(e.message);
          });
        }}
      >
        save
      </button>
      <button
        onClick={() => {
          setStatus(false);
        }}
      >
        cancel
      </button>
    </div>
  );
};
const NhapKhau = ({ onSelected, idHoKhau }) => {
  const [search, { data }] = useLazyQuery(GOI_Y_NHAN_KHAU, {
    fetchPolicy: "no-cache",
  });
  const [nhapKhau, { data: dataNhapKhau }] = useMutation(NHAP_KHAU, {
    fetchPolicy: "no-cache",
  });
  const [input, setInput] = useState("");
  const [searchResults, setResults] = useState([]);
  useEffect(() => {
    if (data) {
      setResults(
        data.goiYNhanKhau.map((e) => ({
          ...e,
          quanHeVoiChuHo: "quan hệ với chủ hộ",
        })),
      );
    }
  }, [data]);
  useEffect(() => {
    if (dataNhapKhau) {
      const { nhapKhau } = dataNhapKhau;
      onSelected({
        ...nhapKhau.nhanKhau,
        quanHeVoiChuHo: nhapKhau.quanHeVoiChuHo,
      });
      setResults((old) => old.filter((e) => e.ID !== nhapKhau.nhanKhau.ID));
    }
  }, [dataNhapKhau]);
  const onNhapKhau = async ({ idNhanKhau, quanHeVoiChuHo }) => {
    try {
      if (quanHeVoiChuHo.trim() === "")
        return alert("quan hệ với chủ hộ không được rỗng");

      nhapKhau({
        variables: {
          input: {
            idHoKhau: parseInt(idHoKhau),
            idNhanKhau: parseInt(idNhanKhau),
            quanHeVoiChuHo,
          },
        },
      });
    } catch (e) {
      console.log(e.message);
    }
  };
  const onEditThanhVien = (ID) => {
    return (e) => {
      const value = e.target.value;
      setResults((old) => {
        return old.map((e) => {
          if (e.ID === ID) {
            return { ...e, quanHeVoiChuHo: value };
          }
          return e;
        });
      });
    };
  };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <TextField
          variant="outlined"
          style={{ marginRight: 5 }}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          placeholder="tên nhân khẩu"
        ></TextField>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => {
            search({
              variables: {
                input: {
                  name: input,
                  limit: 500,
                  offset: 0,
                },
              },
            });
          }}
        >
          Tìm
        </Button>
      </div>
      <Table className="mb-0">
        <TableHead>
          <TableRow>
            <TableCell> ID</TableCell>
            <TableCell> Tên nhân khẩu</TableCell>
            <TableCell> Năm Sinh</TableCell>
            <TableCell>Quan hệ với chủ hộ</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchResults.map(({ ID, hoTen, namSinh, quanHeVoiChuHo }) => (
            <TableRow key={ID}>
              <TableCell className="pl-3 fw-normal">{ID}</TableCell>
              <TableCell className="pl-3 fw-normal">{hoTen}</TableCell>
              <TableCell className="pl-3 fw-normal">
                {moment(parseInt(namSinh)).format("YYYY-MM-DD")}
              </TableCell>
              <TableCell className="pl-3 fw-normal">
                <TextField
                  value={quanHeVoiChuHo}
                  onChange={onEditThanhVien(ID)}
                  placeholder="quan hệ với chủ hộ"
                />
              </TableCell>
              <TableCell className="pl-3 fw-normal">
                <Button
                  onClick={() => {
                    onNhapKhau({ idNhanKhau: ID, quanHeVoiChuHo });
                  }}
                  variant="contained"
                  color="secondary"
                >
                  nhập khẩu
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
