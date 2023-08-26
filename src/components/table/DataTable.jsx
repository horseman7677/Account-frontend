import React, { useEffect, useRef, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useDispatch } from "react-redux";
import { delId, enableEditBtm, setEId } from "@/redux/reducers/ProfileSlice";

const columns = [
  // { field: "id", headerName: "ID", width: 70 },
  { field: "customerNumber", headerName: "Customer Number", width: 130 },
  { field: "companyName", headerName: "Coustomer Name", width: 150 },
  { field: "countryCode", headerName: "Country Code", width: 130 },
  { field: "invoiceAmount", headerName: "Invoice Amount", width: 130 },
  { field: "created_time", headerName: "Invoice Date", width: 150 },
];

// const rows = [
//   { id: 1, coustomerName: "rahul" },
//   { id: 2, coustomerName: "kumar" },
// ];

const DataTable = () => {
  // const id = useSelector((state) => state.profile.id);
  const dispatch = useDispatch();

  const [account, setAccount] = useState([]);
  const [del, setDelete] = useState([]);
  const [editId, setEditId] = useState([]);
  // console.log(del);

  useEffect(() => {
    axios.get("http://localhost:8080/horseman/all-data").then((res) => {
      // console.log(res.data);
      setAccount(res.data);
    });
  }, [account]);

  useEffect(() => {
    dispatch(delId(del));
    // console.log(id);
  }, [del]);

  useEffect(() => {
    // console.log(editId);
    dispatch(setEId(editId));
  }, [editId]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={account}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={(id) => {
          // console.log(id);
          if (id.length === 1) {
            setEditId(id);
            dispatch(enableEditBtm(false));
          } else {
            // setEditId([0]);
            dispatch(enableEditBtm(true));
          }
          setDelete(id);
        }}
      />
    </div>
  );
};

export default DataTable;
