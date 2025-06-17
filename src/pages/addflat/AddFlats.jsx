import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import './AddFlat.css'
import { BsFillBuildingsFill, FaEye } from "react-icons/bs";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiOutlineClockCircle } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { BASE_URL } from "../../config";
import { FaRegEdit } from "react-icons/fa";

function Flat() {
  const { id } = useParams()
  console.log(id)

  const [AddScheme, setAddScheme] = useState(false)
  const [selectStatus, setSelectStatus] = useState("")
  const [Schemename, setSchemeName] = useState("")
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [myLand, setMyLand] = useState([])
  const [showCount, setShowCount] = useState("")
  const navigate = useNavigate()
  const [count, setCount] = useState(0)
  const [totalFlat, setTotalFlat] = useState("")
  const [buildingSize, setBuildingSize] = useState("")


  const [showEditSchemeForm, setShowEditSchemeForm] = useState(false);
  const [editSchemeId, setEditSchemeId] = useState(null);
  function handlescheme(e) {
    e.preventDefault()
    setAddScheme(!AddScheme)
  }

  async function handleCreateScheme(e) {
    e.preventDefault()
    const obj = {
      name: Schemename,
      status: selectStatus,
      landId: id,
      totalflat: totalFlat,
      buildingSize
    }
    if (!id) {
      return alert("project start from land")
    }
    try {
      const reponse = await axios.post(`${BASE_URL}/createProject`, obj, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      console.log(reponse)
      alert("add Scheme Successfully")
      setAddScheme("")
      setCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    async function getLand() {
      try {
        const response = await axios.get(`${BASE_URL}/getAllProjects`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        })
        console.log(response.data)
        setMyLand(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    getLand()
  }, [id, token, count])

  function handleclick(id, newname) {
    console.log(id)
    if (!id) {
      return alert("Project has not started yet"); // Custom alert message
    }
    console.log(id);
    navigate(`/flatlist/${id}`, { state: { newname } });

  }

  useEffect(() => {
    async function getingCount() {
      try {
        const reponse = await axios.get(`${BASE_URL}/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        console.log(reponse.data)
        setShowCount(reponse.data)
      } catch (error) {
        console.log(error)
      }
    }

    getingCount()
  }, [])

  // const confirmDelete = async (id) => {
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       try {
  //         await axios.delete(`${BASE_URL}/deleteProject/${id}`, {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //             "Content-Type": "application/json",
  //           },
  //         });
  //         setCount((prevCount) => prevCount + 1);

  //         Swal.fire("Deleted!", "The residency has been deleted.", "success");
  //       } catch (error) {
  //         console.error(error);
  //         Swal.fire(
  //           "Error!",
  //           "Something went wrong while deleting the residency.",
  //           "error"
  //         );
  //       }
  //     }
  //   });
  // };


  async function handleEdit(id) {
    setAddScheme(false);
    setEditSchemeId(id);
    setShowEditSchemeForm(true);
    try {
      const response = await axios.get(`${BASE_URL}/getProjectById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
      if (response.data) {
        setSchemeName(response.data.name);
        setSelectStatus(response.data.status);
        setTotalFlat(response.data.totalflat || "");
        setBuildingSize(response.data.buildingSize || "");
        setAddScheme(true);
      } else {
        alert("No data found for the given ID");
      }
    } catch (error) {
      console.error("Error fetching project data:", error);
    }
  }


  function handleeditScheme(e) {
    e.preventDefault();
    const obj = {
      name: Schemename,
      status: selectStatus,
      totalflat: totalFlat,
      buildingSize: buildingSize
    };
    if (!editSchemeId) {
      return alert("Project ID is required for editing");
    }
    axios.put(`${BASE_URL}/updateProject/${editSchemeId}`, obj, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log(response.data);
        alert("Scheme updated successfully");
        setShowEditSchemeForm(false);
        setAddScheme(false);
        setCount((prevCount) => prevCount + 1);
      })
      .catch((error) => {
        console.error("Error updating project:", error);
      });
  }
  return (
    <>
      <div className="Add_flat_main_wrapper">
        <h1>Flat Scheme Management System</h1>

        <div className="add_seheme_btn">
          <button onClick={handlescheme} >Add Scheme</button>
        </div>


        {/* fetch All scheme */}
        <div className="show_all_resigency_card_wrapper">
          {Array.isArray(myLand) && myLand.map((item, index) => {
            const countData = showCount[item.id];
            const availableCount = countData ? countData.AVAILABLE : 0;
            const bookedCount = countData ? countData.BOOKED : 0;

            return (
              <div key={index} className="flatcontainer">
                {/* <button className="residency_delete" onClick={() => confirmDelete(item.id)}><FaTrashAlt /></button> */}
                <button className="residency_delete" style={{ color: "rgb(255, 255, 255)", background: "rgb(6, 151, 177)" }} onClick={() => handleEdit(item.id)}><FaRegEdit /></button>
                <BsFillBuildingsFill size={80} color="rgb(6, 151, 177)" onClick={() => handleclick(item.id, item.name)} style={{ cursor: "pointer" }} />
                <p onClick={() => handleclick(item.id, item.name)} style={{ cursor: "pointer" }}> <b>{item.name}   </b></p>
                <p className="status" ><b> {item.status} </b> </p>
                <div className="span">
                  <span className="show_book_count"> <AiFillCheckCircle style={{ fontSize: "25px", color: "red" }} />  Booked <br /> {bookedCount || 0}</span>
                  <span className="show_available_count_available"> <AiOutlineClockCircle style={{ fontSize: "25px", color: "green" }} /> Available <br /> {availableCount || 0}</span>
                  <span className="show_available_count_available"> Total Flat  <br /> {item.totalflat || "N/A"}</span>
                  <span className="show_available_count_available"> Building Size  <br /> {item.buildingSize || "N/A"}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Scheme Here */}
        {
          AddScheme && (
            <>
              <div className="AddSchemeForm_wrapper" >
                <button className="add_scheme_cross_button" onClick={() => {
                  setAddScheme(false);
                  setShowEditSchemeForm(false);
                }}>X</button>
                <form onSubmit={handleCreateScheme} className="AddSchemeForm" >
                  <div>
                    <select name="" id="" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="AddSchemeForm_select" >
                      <option value="">
                        select
                      </option>
                      <option value="IN_PROGRESS">
                        IN_PROGRESS
                      </option>
                      <option value="IN_PROGRESS">
                        COMPLETE
                      </option>
                      <option value="IN_PROGRESS">
                        INACTIVE
                      </option>
                    </select>
                    <input type="text" placeholder="Enter Total flat" value={totalFlat} onChange={(e) => setTotalFlat(e.target.value)} />
                    <input type="text" placeholder="Enter Building Size" value={buildingSize} onChange={(e) => setBuildingSize(e.target.value)} />
                    <input type="text" value={Schemename} onChange={(e) => setSchemeName(e.target.value)} placeholder="Enter Project Name" className="AddSchemeForm_input" />
                  </div>
                  <button className="addschemecreate_vutton">Create Scheme</button>
                </form>

              </div>
            </>
          )
        }
      </div>

      {
        showEditSchemeForm && (
          <div className="AddSchemeForm_wrapper">
            <button className="add_scheme_cross_button" onClick={() => {
              setShowEditSchemeForm(false);
              setAddScheme(false); 
            }}>X</button>
            <form onSubmit={handleeditScheme} className="AddSchemeForm">
              <div>
                <select name="" id="" value={selectStatus} onChange={(e) => setSelectStatus(e.target.value)} className="AddSchemeForm_select">
                  <option value="">
                    select
                  </option>
                  <option value="IN_PROGRESS">
                    IN_PROGRESS
                  </option>
                  <option value="COMPLETE">
                    COMPLETE
                  </option>
                  <option value="INACTIVE">
                    INACTIVE
                  </option>
                </select>
                <input type="text" placeholder="Enter Total flat" value={totalFlat} onChange={(e) => setTotalFlat(e.target.value)} />
                <input type="text" placeholder="Enter Building Size" value={buildingSize} onChange={(e) => setBuildingSize(e.target.value)} />
                <input type="text" value={Schemename} onChange={(e) => setSchemeName(e.target.value)} placeholder="Enter Project Name" className="AddSchemeForm_input" />
              </div>
              <button className="addschemecreate_vutton">Update Scheme</button>
            </form>
          </div>
        )
      }
    </>
  );
}

export default Flat;
