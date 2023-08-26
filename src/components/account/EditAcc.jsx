import { handleEditDialog } from "@/redux/reducers/ProfileSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const accData = {
  customerNumber: "",
  companyName: "",
  countryCode: "",
  created_time: "",
  invoiceAmount: "",
};

const EditAcc = () => {
  const { editId, editOpen } = useSelector((state) => state.profile);
  const [data, setData] = useState(accData);

  const dispatch = useDispatch();

  const loadData = () => {
    let toNumber = parseInt(editId);
    console.log(toNumber);
    if (toNumber != NaN) {
      // console.log("entering....");
      axios
        .get(`http://localhost:8080/horseman/byId/${toNumber}`)
        .then((res) => {
          console.log(res.data.created_time.toString().split("T")[0]);
          // let currDate = new Date();
          // currDate.toString().split("T");
          // console.log(currDate);
          accData.created_time = res.data.created_time.toString().split("T")[0];
          setData(res.data);
        });
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setData({ ...data, [name]: value });
  };

  const renderSave = (e) => {
    e.preventDefault();
    console.log(data);
    axios.put("http://localhost:8080/horseman/update", data).then((res) => {
      console.log("update successfully...");
    });
    dispatch(handleEditDialog(false));
  };

  useEffect(() => {
    console.log(editId);
    loadData();
  }, [editOpen]);

  return (
    <Dialog open={editOpen}>
      <DialogTitle>Edit Account</DialogTitle>
      <DialogContent>
        <TextField
          style={{ padding: 5 }}
          variant="outlined"
          type="text"
          placeholder="Customer Number"
          name="customerNumber"
          value={data.customerNumber}
          onChange={handleInput}
          disabled
        ></TextField>

        <TextField
          style={{ padding: 5 }}
          variant="outlined"
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={data.companyName}
          onChange={handleInput}
          disabled
        ></TextField>
        <br />
        <TextField
          style={{ padding: 5 }}
          variant="outlined"
          type="text"
          placeholder="Country Code"
          name="countryCode"
          value={data.countryCode}
          onChange={handleInput}
          disabled
        ></TextField>
        <TextField
          style={{ width: "50%", padding: 5 }}
          variant="outlined"
          type="text"
          name="created_time"
          value={data.created_time}
          onChange={handleInput}
          disabled
        ></TextField>
        <br />
        <TextField
          style={{ width: "100%", padding: 5 }}
          variant="outlined"
          type="number"
          placeholder="Invoice Amount"
          name="invoiceAmount"
          value={data.invoiceAmount}
          onChange={handleInput}
        ></TextField>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            dispatch(handleEditDialog(false));
          }}
        >
          Cancel
        </Button>
        <Button onClick={renderSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditAcc;
