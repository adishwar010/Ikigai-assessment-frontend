import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import logo1 from "../images/logo.png";
import ADSATable from "./ADSATable";
import exportFromJSON from "export-from-json";
import AdminBoxes from "./AdminBoxes";

const ADSATreg = () => {
  const fileName = "A-DSAT Registration";
  const exportType = "xls";

  const ExportToExcel = () => {
    exportFromJSON({ data, fileName, exportType });
  };

  let history = useHistory();
  const [no, setno] = useState([]);
  const [data, setData] = useState([]);

  function adminHome() {
    history.push("/adminroutes");
  }

  useEffect(async () => {
    if (localStorage.getItem("Admin")) {
      const config = {
        headers: {
          Authorization: `Admin ${localStorage.getItem("Admin")}`,
        },
      };
      try {
        const res = await axios.get("/api/v1/admin/registrationStats", config);

        console.log(res.data.data.numberOfUserRegistered);
        setno(res.data.data.numberOfUserRegistered);
        setData(res.data.data.users);
      } catch (err) {
        console.log(err);
        if (err.response && err.response.data) alert(err.response.data.message);
      }
    } else {
    }
  }, []);

  return (
    <>
      <div className="container-fluid admn ">
        <div className="row ml-3 ">
          <Link to="/adminroutes">
            <img src={logo1} />
          </Link>
        </div>
      </div>

      <AdminBoxes />

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: "#0E3B7D", color: "white" }}
          onClick={adminHome}
        >
          Go Back
        </button>
      </div>

      <div className="container text-center pt-5">
        <h3 className="pt-2 mb-4">A-DSAT Registrations</h3>
        <div className="mb-4">
          <h6>Total No. of Registrations :{" " + no}</h6>
        </div>
        <div className="Container mb-4">
          <header className="App-header" style={{ textAlign: "center" }}>
            <button type="button" class="btn btn-info" onClick={ExportToExcel}>
              Export To Excel
            </button>
          </header>
        </div>
        <ADSATable />
      </div>
    </>
  );
};

export default ADSATreg;
