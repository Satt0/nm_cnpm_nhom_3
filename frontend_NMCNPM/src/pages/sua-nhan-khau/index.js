import React, { useState, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";
import { TIM_NHAN_KHAU } from "../../api/graphql/query/tim_nhan_khau";
import { XOA_NHAN_KHAU } from "../../api/graphql/mutation/xoa_nhan_khau";
import "./index.css";
import moment from "moment";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
export default function CapNhatNhanKhau() {
  // const nhanKhau=useQuery(TIM_NHAN_KHAU,{variables:{
  //     input:match.id
  // }})

  // if(nhanKhau.loading) return <h1>loading</h1>
  const [
    fetchInfor,
    { data: InforSearchedData, error: InforError, refetch },
  ] = useLazyQuery(TIM_NHAN_KHAU, { fetchPolicy: "no-cache" });
  const [deleteNK, { loading, data }] = useMutation(XOA_NHAN_KHAU);
  const [limit] = useState(500);
  const [offset] = useState(0);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchInfor({
      variables: {
        input: { limit, offset, name },
      },
    });
  }, []);
  return (
    <div>
      <input
        className="input2"
        type="text"
        placeholder="Nhập tên"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          fetchInfor({
            variables: {
              input: { limit, offset, name },
            },
          });
          console.log(InforSearchedData);
        }}
      >
        Tìm nhân khẩu
      </Button>
      <Link to="/app/create-nk">
        <Button variant="contained" color="secondary">
          Tạo nhân khẩu
        </Button>
      </Link>
      <div>
        <Table className="mb-0">
          <TableHead>
            <TableRow>
              <TableCell> ID</TableCell>
              <TableCell> Họ tên</TableCell>
              <TableCell> Ngày sinh</TableCell>
              <TableCell> Quốc tịch</TableCell>
              <TableCell> Mã nhân khẩu</TableCell>
              <TableCell> Khai tử, tạm trú, tạm vắng</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {InforSearchedData?.timNhanKhau?.map(
              ({
                ID,
                hoTen,
                namSinh,
                quocTich,
                maNhanKhau,
                khaiTu,
                tamTru,
                tamVang,
              }) => (
                <TableRow key={ID}>
                  <TableCell className="pl-3 fw-normal">
                    <Link to={`/app/edit-nk/${ID}`}>{ID}</Link>
                  </TableCell>
                  <TableCell>
                    <Link to={`/app/edit-nk/${ID}`}>{hoTen}</Link>
                  </TableCell>
                  <TableCell>
                    {moment(parseInt(namSinh)).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell>{quocTich}</TableCell>
                  <TableCell>{maNhanKhau}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        color: "gray",
                        fontSize: ".9em",
                        display: "flex",
                      }}
                    >
                      {khaiTu && <p title={formatKhaiTu(khaiTu)}> Khai tử </p>}
                      {filterTamTru(tamTru).length > 0 && (
                        <p title={formatTamTru(filterTamTru(tamTru))}>
                          {" "}
                          Tạm trú{" "}
                        </p>
                      )}
                      {fitlerTamVang(tamVang).length > 0 && (
                        <p title={formatTamVang(fitlerTamVang(tamVang))}>
                          {" "}
                          Tạm vắng{" "}
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="btn-TS"
                      variant="contained"
                      color="secondary"
                      onClick={async () => {
                        await deleteNK({
                          variables: {
                            input: parseInt(ID),
                          },
                        }).catch((e) => {
                          console.log(e.message);
                        });
                        await refetch();

                        // setState(InforSearchedData.timNhanKhau.filter(e=> e.ID !== ID))
                      }}
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ),
            )}
          </TableBody>
        </Table>
        {InforError && <h1> There was an error fetching the data</h1>}
      </div>
    </div>
  );
}

const formatKhaiTu = ({ soGiayKhaiTu, ngayKhai, nguoiKhai, lyDoChet }) => {
  return `
    số giấy khai tử: ${soGiayKhaiTu}
    ngày khai tử: ${moment(parseInt(ngayKhai)).format("DD-MM-YYYY")}
    người khai: ${nguoiKhai?.hoTen}
    lý do chết: ${lyDoChet}
  
  `;
};

const formatTamTru = (danhSach) => {
  return danhSach
    .map(
      ({maGiayTamTru,soDienThoaiNguoiDangKy,tuNgay,denNgay,lyDo},index) => `
      ${index+1}-từ ngày: ${moment(parseInt(tuNgay)).format(
        "DD-MM-YYYY",
      )}, đến ngày: ${moment(parseInt(denNgay)).format(
          "DD-MM-YYYY",
        )}, SDT:${soDienThoaiNguoiDangKy} lý do:${lyDo}, mã tạm trú: ${maGiayTamTru}
  `,
    )
    .join("\n");
};
const formatTamVang = (danhSach) => {
  return danhSach
    .map(
      ({ maGiayTamVang, tuNgay, denNgay, lyDo,noiTamTru },index) => ` 
      ${index+1}-từ ngày: ${moment(parseInt(tuNgay)).format(
      "DD-MM-YYYY",
    )}, đến ngày: ${moment(parseInt(denNgay)).format(
        "DD-MM-YYYY",
      )}, nơi tạm trú: ${noiTamTru}, lý do:${lyDo}, mã tạm vắng: ${maGiayTamVang}
  `,
    )
    .join("\n");
};

const filterTamTru = (ds) => {
  return ds.filter((e) => {
    return moment().isBefore(parseInt(e.denNgay));
  });
};
const fitlerTamVang = (ds) => {
  return ds.filter((e) => {
    return moment().isBefore(parseInt(e.denNgay));
  });
};
