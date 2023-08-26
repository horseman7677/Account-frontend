"use client";
import React, { useEffect, useState } from "react";
import classes from "./navbar.module.css";
import Link from "next/link";
import { Button, ButtonGroup } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import NewAcc from "../account/NewAcc";
import { handleDialog, handleEditDialog } from "@/redux/reducers/ProfileSlice";
import EditAcc from "../account/EditAcc";

// const buttons = [
//   <Button key="edit">EDIT</Button>,
//   <Button key="delete">DELETE</Button>,
// ];

const Navbar = () => {
  const { id, enableEdit } = useSelector((state) => state.profile);
  // const [enableEditBtn, setEnableEdit] = useState(enableEdit);
  const dispatch = useDispatch();

  const renderAdd = () => {
    // setOpen(true);
    dispatch(handleDialog(true));
  };

  const renderEdit = () => {
    // e.preventDefault();
    // console.log("edit 200");
    dispatch(handleEditDialog(true));
  };

  const renderDelete = (e) => {
    e.preventDefault();
    let toNumber = parseInt(id);

    axios
      .delete(`http://localhost:8080/horseman/delete/${toNumber}`)
      .then(() => {
        console.log("deleted successfully....");
      });
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.left}></div>
        <div className={classes.middle}>
          <Link href="/">
            <h2>HORSEMAN</h2>
            <h5>COMPANY</h5>
          </Link>
        </div>
        <div className={classes.right}>
          <ButtonGroup
            color="secondary"
            aria-label="medium secondary button group"
          >
            <Button key="add" onClick={renderAdd}>
              ADD
            </Button>
            <Button key="edit" onClick={renderEdit} disabled={enableEdit}>
              EDIT
            </Button>
            <Button key="delete" onClick={renderDelete}>
              DELETE
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <NewAcc />
      <EditAcc />
      {/* <Dialog open={open}>
        <DialogTitle>Add Account</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button onClick={renderSave}>Save</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Navbar;
