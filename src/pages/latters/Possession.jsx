import React, { useEffect, useState } from 'react'
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';
import Logo2 from "../../assets/Royalmedeinfra Logo.svg"
import "./Latter.css"
import axios from 'axios';
import { BASE_URL } from '../../config';
function Possession() {
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const [showPossession, setshowPossession] = useState(false)
    const letterref = useRef()
    const [from, setFrom] = useState("");
    const [date, setDate] = useState("");
    const [yourName, setYourName] = useState("");
    const [firstName, setFirstName] = useState("");

    const [flatNumber, setFlatNumber] = useState("");
    const [residencyName, setResidencyName] = useState("");
    const [address, setAddress] = useState("");
    const [possesionTable, setpossesionTable] = useState([])
    const [refreshKey, setrefreshKey] = useState(0)
    const [letterdata, setLetterData] = useState({})
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    function handleDownlodepossession() {
        const element = letterref.current;
        const options = {
            margin: 0.5,
            filename: `${letterdata.name} possession_letter.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    }


    async function handlepossessionSubmit(e) {
        e.preventDefault();

        const formdata = {
            // fromName: from,
            date: date || new Date().toISOString().split("T")[0],
            toName: yourName,
            name: firstName,
            flatNo: flatNumber,
            residencyName: residencyName,
            address
        };

        try {
            if (isEditMode && editId) {
                const response = await axios.put(`${BASE_URL}/PossessionLetter/${editId}`, formdata, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    alert("Possession letter updated successfully");
                }
            } else {
                const response = await axios.post(`${BASE_URL}/createPossessionLetter`, formdata, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                if (response.status === 200) {
                    alert("Form submitted successfully");
                }
            }
            resetForm();
            setrefreshKey(prev => prev + 1);
        } catch (error) {
            console.log(error);
        }
    }
    function resetForm() {
        // setFrom("");
        setDate("");
        setYourName("");
        setFirstName("");
        setFlatNumber("");
        setResidencyName("");
        setAddress("");
        setIsEditMode(false);
        setEditId(null);
    }
    function handleEditPossession(item) {
        setIsEditMode(true);
        setEditId(item.id);
        // setFrom(item.fromName);
        setDate(item.date?.split("T")[0] || "");
        setYourName(item.toName);
        setFirstName(item.name);
        setFlatNumber(item.flatNo);
        setResidencyName(item.residencyName);
        setAddress(item.address);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    useEffect(() => {
        async function getPossessionLetter() {
            try {
                const response = await axios.get(`${BASE_URL}/PossessionLetter`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response.data)
                const sortedData = [...response.data].sort((a, b) => b.id - a.id)
                setpossesionTable(sortedData)
            } catch (error) {
                console.log(error)
            }

        }
        getPossessionLetter()
    }, [refreshKey])

    async function handlepossionDelete(id) {
        const deletepaossioson = window.confirm("Are you sure to delete ?")
        if (!deletepaossioson) return
        try {
            const response = await axios.delete(`${BASE_URL}/PossessionLetter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                alert("letter delete Successfully")

            }
            setpossesionTable((prev) => prev.filter(item => item.id !== id));
            setrefreshKey(prev => prev + 1);

        } catch (error) {
            console.log(error)
        }

    }
    async function handleShowPossessionletter(id) {
        setshowPossession(true)
        try {
            const response = await axios.get(`${BASE_URL}/PossessionLetter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setLetterData(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>

            <h1 style={{ textAlign: 'center', marginTop: "50px", fontSize: "25px" }}> Possession Letter</h1>

            <div className="possession_letter_form_wrapper">
                <form className="possession_letter" onSubmit={handlepossessionSubmit}>
                    {/* <input
                        type="text"
                        placeholder="From"
                        className="possession_letter_input"
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    /> */}
                    <input
                        type="date"
                        className="possession_letter_input"
                        value={date || new Date().toISOString().split("T")[0]}
                        onChange={(e) => setDate(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="possession_letter_input"
                        value={yourName}
                        onChange={(e) => setYourName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="First Name"
                        className="possession_letter_input"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />

                    <input
                        type="number"
                        placeholder="Flat Number"
                        className="possession_letter_input"
                        value={flatNumber}
                        onChange={(e) => setFlatNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Residency Name"
                        className="possession_letter_input"
                        value={residencyName}
                        onChange={(e) => setResidencyName(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Enter Address"
                        className="possession_letter_input"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <button className="possession_letter_submit_button">
                        {isEditMode ? "Update" : "Submit"}
                    </button>

                </form>
            </div>


            <div className="possession_letter_wrapper">
                <table className="possession_table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            {/* <th>From Name</th> */}
                            <th>Date</th>
                            <th>To Name</th>
                            <th>Name</th>
                            <th>Flat No</th>
                            <th>Residency Name</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {possesionTable.length > 0 ? (
                            possesionTable.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index}</td>
                                    {/* <td>{item.fromName}</td> */}
                                    <td>{new Date(item.date).toLocaleDateString("en-GB")}</td>
                                    <td>{item.toName}</td>
                                    <td>{item.name}</td>
                                    <td>{item.flatNo}</td>
                                    <td>{item.residencyName}</td>
                                    <td>{item.address}</td>
                                    <td style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "5px", flexDirection: "column" }}>
                                        <button onClick={() => handleEditPossession(item)} className='possession_show'>Edit</button>
                                        <button onClick={() => handlepossionDelete(item.id)} className='possession_delete'> Delete</button>
                                        <button onClick={() => handleShowPossessionletter(item.id)} className='possession_show'>Show</button>

                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">No data available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>


            {
                showPossession && letterdata && (
                    <>
                        <div className="infra_letter_head_main_wrapper">
                            <div className="downlode_button">
                                <button onClick={handleDownlodepossession} className='royalinfra_downlode_button'> Download</button>
                                <button onClick={() => setshowPossession(false)} className='possion_close'>Close</button>
                            </div>
                            <div className="infraletter_head_wrapper" ref={letterref}>
                                <div
                                    style={{
                                        textAlign: "right",
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        color: "#000",
                                        marginLeft: "50px",
                                        marginTop: "20px"

                                    }}
                                >
                                    <img
                                        style={{
                                            height: "80px",
                                            width: "auto",
                                            objectFit: "contain",
                                        }}
                                        src={Logo2}
                                        alt=""
                                    />
                                    {/* <div
                                        style={{
                                            fontFamily: "Arial, sans-serif",
                                            lineHeight: "40px",
                                            width: "80%",
                                            margin: "auto",
                                            padding: "20px",
                                            color: "#000",

                                        }}
                                    >
                                     
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "right",
                                                alignItems: "center",
                                                marginBottom: "8px",
                                                fontSize: "14px"
                                            }}
                                        >
                                            <div style={{ lineHeight: "15px", marginRight: "13px", fontSize: "14px" }}>
                                                <p>Plot No. 28, 1st Floor, Govind Prabhau Nagar,</p>
                                                <p>Hudkeshwar Road, Nagpur - 440034</p>
                                            </div>
                                            <div
                                                style={{
                                                    backgroundColor: "#d34508",
                                                    padding: "10px",
                                                    borderRadius: "1px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FaMapMarkerAlt size={15} color="#ffff" />
                                            </div>
                                        </div>

                                     
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "right",
                                                alignItems: "center",
                                                marginBottom: "8px",
                                                fontSize: "14px",

                                            }}
                                        >
                                            <p style={{ marginRight: "13px" }}>royaalmede@gmail.com</p>
                                            <div
                                                style={{
                                                    backgroundColor: "#d34508",
                                                    padding: "10px",
                                                    borderRadius: "1px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FaEnvelope size={15} color="#ffff" />
                                            </div>
                                        </div>

                                       
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "right",
                                                alignItems: "center",
                                                marginBottom: "8px",
                                                fontSize: "14px",


                                            }}
                                        >
                                            <p style={{ marginRight: "15px" }}>www.royaalmede.co.in</p>
                                            <div
                                                style={{
                                                    backgroundColor: "#d34508",
                                                    padding: "10px",
                                                    borderRadius: "1px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FaGlobe size={15} color="#ffff" />
                                            </div>
                                        </div>

                                      
                                        <div
                                            style={{
                                                display: "flex",
                                                justifyContent: "right",
                                                alignItems: "center",
                                                marginBottom: "8px",

                                            }}
                                        >
                                            <p style={{ marginRight: "30px" }}>9028999253 | 9373450092</p>
                                            <div
                                                style={{
                                                    backgroundColor: "#d34508",
                                                    padding: "10px",
                                                    borderRadius: "1px",
                                                    height: "30px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FaPhoneAlt size={15} color="#ffff" />
                                            </div>
                                        </div>
                                    </div> */}
                                    <div className="relieving_company_details">
                                        <div className="relieving_detail_row">
                                            <div className="relieving_detail_text">
                                                <p>Plot No. 28, 1st Floor, Govind Prabhau Nagar,</p>
                                                <p>Hudkeshwar Road, Nagpur - 440034</p>
                                            </div>
                                            <div className="relieving_icon_box"><FaMapMarkerAlt size={15} color="#fff" /></div>
                                        </div>
                                        <div className="relieving_detail_row">
                                            <p className="relieving_detail_text">royaalmede@gmail.com</p>
                                            <div className="relieving_icon_box"><FaEnvelope size={15} color="#fff" /></div>
                                        </div>
                                        <div className="relieving_detail_row">
                                            <p className="relieving_detail_text">www.royaalmede.co.in</p>
                                            <div className="relieving_icon_box"><FaGlobe size={15} color="#fff" /></div>
                                        </div>
                                        <div className="relieving_detail_row">
                                            <p className="relieving_detail_text">9028999253 | 9373450092</p>
                                            <div className="relieving_icon_box"><FaPhoneAlt size={15} color="#fff" /></div>
                                        </div>
                                    </div>
                                </div>

                                <hr style={{ border: "1px solid rgb(167, 5, 86)", marginBottom: "2px", marginTop: "-5px" }} />
                                <hr style={{ border: "3px solid rgb(167, 5, 86)", marginTop: "4px" }} />




                                {/* <p style={{ marginTop: "25px", marginLeft: "80px" }}>From:- <b>{letterdata.fromName}   </b>      </p> */}
                                <p style={{ marginTop: "25px", marginLeft: "80px" }}>  Date: <b> {new Date(letterdata.date).toLocaleDateString("en-GB")}  </b>  </p>
                                <p style={{ marginLeft: "80px" }}>To, </p>
                                <p style={{ marginLeft: "80px" }}> Mr./Mrs./Ms.   </p>
                                <p style={{ marginLeft: "80px" }}>  <b> {letterdata.name}	   </b></p>
                                <p style={{ marginTop: "25px", marginLeft: "80px" }}>Sub: - Handing over possession of    </p>

                                <p style={{ marginTop: "25px", marginLeft: "80px", marginRight: "10px" }}>

                                    Dear Sir/Madam, I, the undersigned, Mr./Mrs./Ms. <b>{letterdata.name}</b> state that I have transferred
                                    my above flat to you, Mr./Mrs./Ms.{letterdata.name}	and have since received full payment towards the transfer of above
                                    Flat  <b>{letterdata.flatNo}  </b>and Shares of Society. Since, <b>{letterdata.address}  </b> , <b> {letterdata.residencyName}  </b>I have received full payment from you, I relinquish my rights for the above
                                    flat and hand over possession of the same, and you are at liberty to use and/or to sell, transfer, sublet at your will as you may wish
                                    within the rules and regulations of the society and I will have no objection or rights for the said flat.
                                </p>

                                <p style={{ marginLeft: "80px", marginTop: "60px" }}>faithfully,</p>
                                <p style={{ marginLeft: "80px", marginTop: "50px" }}>(ROYAALMEDE INFRAA)</p>


                            </div>
                        </div>




                    </>
                )
            }

        </>
    )
}

export default Possession