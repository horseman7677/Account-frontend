"use client";
import { useEffect, useState } from "react";
import classes from "./page.module.css";
import DataTable from "@/components/table/DataTable";
import { Provider } from "react-redux";
import Store from "@/redux/Store";
import Navbar from "@/components/navbar/Navbar";
// import Footer from "@/components/footer/Footer";

export default function Home() {
  const [account, setAccount] = useState([]);

  // useEffect(() => {
  //   axios.get("http://localhost:8080/horseman/all-data").then((res) => {
  //     console.log(res.data);
  //     setAccount(res.data);
  //   });
  //   // console.log("hello horseman...");
  // }, []);

  return (
    <Provider store={Store}>
      <div className={classes.container}>
        <div className={classes.wrapper}>
          <Navbar />
          <DataTable />
        </div>
      </div>
    </Provider>
  );
}
