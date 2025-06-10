import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MdOutlineBarChart } from "react-icons/md";
import { FaLandmark } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { GiExplosiveMaterials } from "react-icons/gi";
import { MdDashboard } from "react-icons/md";
import { MdPersonAdd } from "react-icons/md";
import { IoIosDocument } from "react-icons/io";
import { BiSolidUserDetail } from "react-icons/bi";

function Home() {
    const navigate = useNavigate()
    function handleSuperVisor() {
        navigate("/appuserregistration")
    }

    const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role
    console.log(role)
    return (
        <>
            <h1 style={{ textAlign: "center", marginTop: "25px" }}>
                Welcome To RoyaalMede Software
            </h1>



            {
                role === "Admin" && (
                    <div className="admin_dashboard_container_count">
                        <div className="lead_container" onClick={()=>navigate("/lead")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><MdOutlineBarChart /></p>
                            </div>
                            <h4> Lead Management</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/landpurchase")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><FaLandmark /></p>
                            </div>
                            <h4> Land Management</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/flat")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><FaRegBuilding /></p>
                            </div>
                            <h4>Flat Management</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/clist")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><MdGroups /></p>
                            </div>
                            <h4> Customer Details</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/material")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><GiExplosiveMaterials /></p>
                            </div>
                            <h4>Material Management</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/contractor")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><MdDashboard /></p>
                            </div>
                            <h4>Contractors Details</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/employee")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><MdPersonAdd /></p>
                            </div>
                            <h4>Add Staff</h4>
                        </div>
                        <div className="lead_container" onClick={()=>navigate("/letter")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><IoIosDocument /></p>
                            </div>
                            <h4>Letters</h4>
                        </div>

                        <div className="lead_container" onClick={()=>navigate("/enquiry")} style={{cursor:"pointer"}}>
                            <div className="lead_logo">
                                <p><BiSolidUserDetail /></p>
                            </div>
                            <h4>Enquiry Details</h4>
                        </div>
                    </div>
                )
            }

            {
                role === "Employee" && (
                    <div className="lead_container">
                        <div className="lead_logo">
                            <p><MdOutlineBarChart /></p>
                        </div>
                        <h4> Lead Management</h4>
                    </div>
                )
            }

        </>
    )
}

export default Home