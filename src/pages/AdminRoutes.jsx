import React, { useState, useEffect } from 'react';
import logo1 from '../images/logo.png';
import { useHistory } from 'react-router-dom';
import AdminBoxes from './AdminBoxes';
import 'sweetalert/dist/sweetalert.css';
import swal from 'sweetalert';

const AdminRoutes = () => {
  let history = useHistory();

  const logout = () => {
    localStorage.removeItem('Admin');
    history.push('/admin');
  };

  function result() {
    history.push('/admin1');
  }
  function slotcheck() {
    history.push('/studentslots');
  }
  function registrations() {
    history.push('/A-DSAT_Registration');
  }

  const getExpirationDate = (jwtToken) => {
    if (!jwtToken) {
      return null;
    }

    const jwt = JSON.parse(atob(jwtToken.split('.')[1]));

    // multiply by 1000 to convert seconds into milliseconds
    const expdatetime = new Date(jwt && jwt.exp && jwt.exp * 1000);
    const time = new Date(expdatetime).toLocaleTimeString('en', {
      timeStyle: 'short',
      hour12: true,
      timeZone: 'IST',
    });

    return expdatetime || null;
    // const ex = isExpired(expdatetime);
    // return expdatetime + time + ex || null;
  };

  const isExpired = (exp) => {
    if (!exp) {
      return false;
    }

    return Date.now() > exp;
  };

  const styles= { borderRadius: '10px',
   margin: '10px',
   "box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
  " -webkit-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)",
   "-moz-box-shadow": "10px 10px 5px -5px rgba(174,174,174,0.75)" ,
  width : '350px'
  };

  useEffect(async () => {
    if (localStorage.getItem('Admin')) {
      // let x = getExpirationDate(localStorage.getItem("Admin"));
      // console.log("token expp. date :", x);
      const exp = isExpired(getExpirationDate(localStorage.getItem('Admin')));
      console.log(exp);
      if (exp == true) {
        swal(
          {
            title: 'Session Expired',
            text: 'Please Login again !!',
            type: 'warning',
            confirmButtonColor: '#0E3B7D',
            confirmButtonText: 'Ok',
            closeOnConfirm: true,
            customClass: 'Custom_Cancel',
          },
          function (isConfirm) {
            if (isConfirm) {
              logout();
            } else {
            }
          }
        );
      }
    } else {
      history.push('/admin');
    }
  }, []);

  return (
    <>
      <div className="container-fluid admn">
        <div className="row  pt-2 ml-3 pb-2">
          <img src={logo1} />
        </div>
      </div>

      <AdminBoxes />

      <div className="container mt-3 text-white">
        <button
          className="btn float-right"
          style={{ backgroundColor: '#0E3B7D', color: 'white' }}
          onClick={logout}
        >
          Log Out
        </button>
      </div>

      <div className="text-center pt-5">
        <h1> Welcome to Admin Panel</h1>
        {/* <h5>Choose the option</h5> */}
      </div>

      <div className="container text-center mt-5 mb-5">
        <div className="row align-items-center  d-flex justify-content-center">
          {/* <div className="col-12 col-lg-4">
            <div class="card text-center">
              <div class="card-header">Students Outcome</div>
              <div class="card-body">
                <h5 class="card-title">Proficiency Assessment Result</h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Check the results of all the Proficiency tests  and ......
                </p>
                <button className="btn btn-danger " onClick={result}>
                  See Result
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div> */}

          {/* //// */}
          <div className="col-12 col-lg-4 mt-5 mt-lg-0">
            <div class="card text-center" style={styles}>
              <div class="card-header">Training Program</div>
              <div class="card-body">
                <h5 class="card-title">Proficiency Assessment </h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Add tests and all details according to the module
                  availables...
                </p>
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    history.push('/trainingadmin');
                  }}
                >
                  Check
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          {/* //// */}
          {/* Slot Checking /////////////////////////////// */}
          {/* <div className="col-12 col-lg-4 mt-5 mt-lg-0 ">
            <div class="card text-center">
              <div class="card-header">Make your own Strategy</div>
              <div class="card-body">
                <h5 class="card-title">Students Slots</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Check aloted Time Slots and Date to Students
                </p>
                <button className="btn btn-danger " onClick={slotcheck}>
                  Check Slots
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div> */}
          {/* /////////////////////////////// */}
          <div className="col-12 col-lg-4 mt-5 mt-lg-0 mb-5 mb-lg-0">
            <div class="card text-center" style={styles}>
              <div class="card-header">Registrations</div>
              <div class="card-body">
                <h5 class="card-title">Registrations for Proficiency Test</h5>
                <p class="card-text" style={{ fontSize: '17px' }}>
                  Check Registered students information....
                  <br />
                </p>
                <button className="btn btn-danger " onClick={registrations}>
                  Check Registration
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
        </div>

        {/* <div className="row">
          <div className="col-12 col-lg-4 mt-0 mt-lg-4">
            <div class="card text-center">
              <div class="card-header">Training Program</div>
              <div class="card-body">
                <h5 class="card-title">Students Classes</h5>
                <p class="card-text" style={{ fontSize: "17px" }}>
                  Alot time table to trainers for classes, check attendance
                  etc..
                </p>
                <button
                  className="btn btn-danger "
                  onClick={() => {
                    history.push("/trainingadmin");
                  }}
                >
                  Check
                </button>
              </div>
              <div class="card-footer text-muted">Admin</div>
            </div>
          </div>
          <div className="col-12 col-lg-4"></div>
          <div className="col-12 col-lg-4"></div>
        </div> */}
      </div>
    </>
  );
};

export default AdminRoutes;
