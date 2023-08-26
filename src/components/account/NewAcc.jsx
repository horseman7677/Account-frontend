import { handleDialog } from "@/redux/reducers/ProfileSlice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const accData = {
  customerNumber: "",
  companyName: "",
  countryCode: "",
  created_time: "",
  invoiceAmount: "",
};

const NewAcc = () => {
  //   const [open, setOpen] = useState(true);
  const [data, setData] = useState(accData);
  const open = useSelector((state) => state.profile.open);
  const dispatch = useDispatch();

  const renderSave = (e) => {
    e.preventDefault();
    // console.log(data);
    axios.post("http://localhost:8080/horseman/add", data).then((res) => {
      console.log("created successfully...");
    });
    dispatch(handleDialog(false));
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    // console.log(e.target.value);
    setData({ ...data, [name]: value });
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Add Account</DialogTitle>
      <DialogContent>
        <TextField
          style={{ padding: 5 }}
          variant="outlined"
          type="text"
          placeholder="Customer Number"
          name="customerNumber"
          value={data.customerNumber}
          onChange={handleInput}
        ></TextField>

        <TextField
          style={{ padding: 5 }}
          variant="outlined"
          type="text"
          placeholder="Company Name"
          name="companyName"
          value={data.companyName}
          onChange={handleInput}
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
        ></TextField>
        <TextField
          style={{ width: "50%", padding: 5 }}
          variant="outlined"
          type="date"
          name="created_time"
          value={data.created_time}
          onChange={handleInput}
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
            // console.log("add cancel");
            dispatch(handleDialog(false));
          }}
        >
          Cancel
        </Button>
        <Button onClick={renderSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewAcc;
