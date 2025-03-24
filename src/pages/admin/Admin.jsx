

import React, { useState, useEffect } from "react";
import "./Admin.css";
import logo from "../../assets/royal.png";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
 
  FaBoxes,
  FaBuilding,
  FaFileAlt,
  FaLandmark,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";


function Admin() {
  const navigate = useNavigate()
  const [icon, setIcon] = useState(false);
  const [role, setRole] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
   
  };

  useEffect(() => {
    const gettingRole = JSON.parse(
      localStorage.getItem("employeROyalmadeLogin")
    ) || {};
    setRole(gettingRole.role); 
  }, []);

  function handleLogIn() {
    navigate("/login")
  }

  function handleLogOut() {
    localStorage.removeItem("employeROyalmadeLogin")
    navigate("/login")
  }
  return (
    <>
      <header className="admin-header">
        <div className="header-icon">
          <div
            className="hidden"
            onClick={() => {
              setIcon(!icon);
            }}
          >
            {icon ? "" : <GiHamburgerMenu size={40} color="#0dada5" className="hamberger_icon" style={{ cursor: "pointer" }} />}
          </div>
          <div className="hearder_div">
            <h1> <b style={{ color: "#213a99" }}>R</b><b style={{ color: "red" }}>O</b><b style={{ color: "#fdcb07" }}>Y</b><b style={{ color: "#213a99" }}>A</b><b style={{ color: "#fdcb07" }}>A</b><b style={{ color: "green" }}>L</b><b style={{ color: "red" }}>M</b><b style={{ color: "#213a99" }}>E</b><b style={{ color: "green" }}>D</b><b style={{ color: "red" }}>E</b></h1>

          </div>
          {
            role ? <button onClick={handleLogOut} className="login_button"> LogOut</button> : <button className="login_button" onClick={handleLogIn}>  Login </button>
          }

        </div>

      </header>

      <aside>
        <div className={icon ? "open" : "sidebar"}>
          <div style={{ display: "flex", justifyContent: "right" }}>
            <MdCancel className="cancel" onClick={() => setIcon(!icon)} />
          </div>
          <img
            src={logo}
            alt=""
            style={{ backgroundColor: "white", width: "100%" }}
          />
          <div className="items">
            <div className="hospital">

              {role === "Admin" && (
                <>
                  <div className="link_container">
                    <Link to="/" onClick={() => setIcon(!icon)}>
                      <FaTachometerAlt
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      DashBoard
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/lead"
                      className="click_link"
                      onClick={() => setIcon(!icon)}
                    >
                      <FaFileAlt
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Lead Management
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/landpurchase"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaLandmark
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Land Management
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/flat"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaBuilding
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Flat Management
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/clist"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaUsers
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Customer Details
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/material"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaBoxes
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Material Management
                    </Link>
                  </div>
                  <div className="link_container">
                    <Link
                      to="/contractor"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaBoxes
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Contractor
                    </Link>
                  </div>

                  <div className="link_container">
                    <Link
                      to="/employee"
                      className="click_link"
                      onClick={() => setIcon(!icon)}
                    >
                      <FaUserFriends
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      <p>Add Staff</p>
                    </Link>
                  </div>
                  <div className="link_container">
                    <Link
                      to="letter"
                      className="click_link"
                      onClick={() => setIcon(!icon)}
                    >
                      <RiFilePaper2Fill
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      <p>Latter</p>
                    </Link>
                  </div>
                </>
              )}
              {role === "AppUser" && (
                <>
                  <div className="link_container">
                    <Link
                      to="/material"
                      onClick={() => setIcon(!icon)}
                      className="click_link"
                    >
                      <FaBoxes
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Material Management
                    </Link>
                  </div>

                </>
              )}
               {role === "Employee" && (
                <>
                 <div className="link_container">
                    <Link
                      to="/lead"
                      className="click_link"
                      onClick={() => setIcon(!icon)}
                    >
                      <FaFileAlt
                        style={{ color: "white", fontSize: "1.5rem" }}
                      />
                      Lead Management
                    </Link>
                  </div>

                </>
              )}
            </div>
          </div>
        </div>
        <section>
          <Outlet />
        </section>
      </aside>
    </>
  );
}

export default Admin;
