import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { THONG_TIN_NHAN_KHAU } from "../../../api/graphql/query/thong_tin_nhan_khau";
import { CAP_NHAT_NHAN_KHAU } from "../../../api/graphql/mutation/cap_nhat_nhan_khau";
import { useLazyQuery, useQuery, useMutation } from "@apollo/client";
import moment from 'moment'
import { Button } from "@material-ui/core";
import { listInput } from "../../maps/Maps";
import Form from "../../../components/Form";
export default function EditOne() {
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

  const [state, setState] = useState(0);

  const handleChange = (key) => {
    return (e) => {
      const value = e.target.value;
      setState((old) => ({ ...old, [key]: value }));
    };
  };
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
      } = InforSearchedData.thongTinNhanKhau;
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
  if (loading && state !== 0) return <h1>please wait</h1>;
  return (
    <div>
      <Form listInput={listInput} state={state} handleChange={handleChange} />
      <Button
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
        
        }}
      >
        Cập nhật nhân khẩu
      </Button>
    </div>
  );
}
