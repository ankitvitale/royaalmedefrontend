import React, { useEffect, useState } from 'react'
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import { useRef } from "react";
import logo from "../../assets/royal.png"
import html2pdf from "html2pdf.js";
import axios from 'axios';
import "./Latter.css"
import { BASE_URL } from '../../config';

function AllotmentLatter() {
    const letterRef = useRef();
    const [ShowAllotmentLatter, setShowAllotmentLatter] = useState(false)
    const [apartmentName, setApartmentName] = useState("");
    const [khno, setKhno] = useState("");
    const [mouzeNo, setMouzeNo] = useState("");
    const [sheetNo, setSheetNo] = useState("");
    const [citySurveyNo, setCitySurveyNo] = useState("");
    const [name, setName] = useState(" ");
    const [totalamount, setTotalamount] = useState("");
    const [totalamountword, setTotalamountword] = useState(" ");
    const [agreementDate, setAgreementDate] = useState("")
    const [sqmtrs, setSqmtrs] = useState("");
    const [sqft, setSqft] = useState("");
    const [refreshKey, setrefreshkey] = useState("")
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const [getAllAllotment, setgetAllAllotment] = useState([])
    const [singleAllotmentlatter, setsingleAllotmentlatter] = useState("")

    const currentDate= new Date().toISOString().split("T")[0]
    const myCurrentDate= (new Date(currentDate).toLocaleDateString("en-GB") )

    const handleDownload = () => {
        const element = letterRef.current;
        const options = {
            margin: 0.5,
            filename: `ALLOTMENT_LETTER ${singleAllotmentlatter.name}.pdf`,
            image: { type: "jpeg", quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
        };

        html2pdf().set(options).from(element).save();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Logic to submit the form data
        const formData = {
            apartmentName,
            khno,
            mouzeNo,
            sheetNo,
            citySurveyNo,
            name,
            totalamount,
            totalamountword,
            agreementDate: agreementDate || new Date().toISOString().split("T")[0],
            sqmtrs,
            sqft,
        };
        try {
            const response = await axios.post(`${BASE_URL}/createAlotmentLetter`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            setName("")
            setApartmentName("")
            setKhno("")
            setMouzeNo("")
            setSheetNo("")
            setCitySurveyNo("")
            setTotalamount("")
            setTotalamountword("")
            setAgreementDate("")
            setSqft("")
            setSqft("")
            setrefreshkey(refreshKey + 1)
            alert(" Allotment Form Successfully Submited")
        } catch (error) {
            console.log(error)
        }

    };


    useEffect(() => {
        async function gettingallotment() {
            try {
                const response = await axios.get(`${BASE_URL}/getAllAlotmentLetters`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                console.log(response.data)
                setgetAllAllotment(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        gettingallotment()
    }, [refreshKey])


    async function deleteallotment(id) {
        try {
            const reonse = await axios.delete(`${BASE_URL}/deleteAlotmentLetter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(reonse.data)
            setrefreshkey(refreshKey + 1)
        } catch (error) {
            console.log(error)
        }

    }
    async function showmyallotmentlatter(id) {
        try {
            const response = await axios.get(`${BASE_URL}/AlotmentLetterById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            setsingleAllotmentlatter(response.data)
            setShowAllotmentLatter(true)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <h2 style={{ textAlign: "center", marginTop: "50px" }}>   AllotmentLatter </h2>




            <div className="allotment_letter_form_wrapper">
                <form onSubmit={handleSubmit} className='alotment_latter_form'>
                    <div>
                        <label className='alotment_latter_form_label'>Apartment Name:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={apartmentName}
                            onChange={(e) => setApartmentName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label' >KHNO:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={khno}
                            onChange={(e) => setKhno(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Mouze No:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={mouzeNo}
                            onChange={(e) => setMouzeNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Sheet No:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={sheetNo}
                            onChange={(e) => setSheetNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>City Survey No:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={citySurveyNo}
                            onChange={(e) => setCitySurveyNo(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Name:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Total Amount:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={totalamount}
                            onChange={(e) => setTotalamount(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Total Amount in Words:</label>
                        <input
                            type="text"
                            className='alotment_latter_form_input'
                            value={totalamountword}
                            onChange={(e) => setTotalamountword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Agreement Date:</label>
                        <input
                            type="date"
                            className='alotment_latter_form_input'
                            value={agreementDate  || new Date().toISOString().split("T")[0]}
                            onChange={(e) => setAgreementDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Area in Square Meters:</label>
                        <input
                            type="number"
                            className='alotment_latter_form_input'
                            value={sqmtrs}
                            onChange={(e) => setSqmtrs(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className='alotment_latter_form_label'>Area in Square Feet:</label>
                        <input
                            type="number"
                            className='alotment_latter_form_input'
                            value={sqft}
                            onChange={(e) => setSqft(e.target.value)}
                        />
                    </div>
                    <button type="submit" className='alotment_latter_form_button'>Submit</button>
                </form>

            </div>


            {/*   allotment table  */}
            <div className="allotment_table_wrapper" >
                {
                    <table className="allotment_table">
                        <thead className="allotment_table_thead">
                            <tr>
                                <th>Apartment Name</th>
                                <th>KHNO</th>
                                <th>Mouze No</th>
                                <th>Sheet No</th>
                                <th>City Survey No</th>
                                <th>Name</th>
                                <th>Total Amount</th>
                                <th>Total Amount in Words</th>
                                <th>Agreement Date</th>
                                <th>Area in Square Meters</th>
                                <th>Area in Square Feet</th>
                                <th> Action</th>
                            </tr>
                        </thead>
                        <tbody className="allotment_table_tbody">
                            {getAllAllotment.map((allotment, index) => (
                                <tr key={index}>
                                    <td>{allotment.apartmentName}</td>
                                    <td>{allotment.khno}</td>
                                    <td>{allotment.mouzeNo}</td>
                                    <td>{allotment.sheetNo}</td>
                                    <td>{allotment.citySurveyNo}</td>
                                    <td>{allotment.name}</td>
                                    <td>{allotment.totalamount}</td>
                                    <td>{allotment.totalamountword}</td>
                                    <td>{new Date( allotment.agreementDate).toLocaleDateString("en-GB")}</td>
                                    <td>{allotment.sqmtrs}</td>
                                    <td>{allotment.sqft}</td>
                                    <td>
                                        <button onClick={() => showmyallotmentlatter(allotment.id)} className='latter_show_button'> Show</button>

                                        <button onClick={() => deleteallotment(allotment.id)} className='latter_show_delete'> Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }

            </div>


            {/* alltotment table End */}



            {
                ShowAllotmentLatter && singleAllotmentlatter && (
                    <div className="allotment_latter_main_container" >
                        <button  onClick={handleDownload} className='allotment_latter_downlode_button'> Downlode</button>
                        <button onClick={() => setShowAllotmentLatter(false)} className='allotment_latter_close_button' > Close</button>
                        <div className="allotment_latter_container" ref={letterRef}>
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
                                        src={logo}
                                        alt=""
                                    />
                                    <div
                                        style={{
                                            fontFamily: "Arial, sans-serif",
                                            lineHeight: "40px",
                                            width: "80%",
                                            margin: "auto",
                                            padding: "20px",
                                            color: "#000",

                                        }}
                                    >
                                        {/* Address Section */}
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

                                        {/* Email */}
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

                                        {/* Website */}
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

                                        {/* Phone */}
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
                                    </div>
                                </div>

                            <hr style={{ border: "1px solid rgb(167, 5, 86)", marginBottom: "2px" }} />
                            <hr style={{ border: "3px solid rgb(167, 5, 86)" }} />

                            <div className="allotment_latter_heading">
                                <h2 style={{ textAlign: "center", marginTop: "20px" }}>

                                    ALLOTMENT LETTER
                                </h2>
                                <p style={{ marginTop: "25px", lineHeight: "45px" }}>
                                    This is to certify that we have allotted the apartment <b>  {singleAllotmentlatter.apartmentName} </b>  situated at Kh.
                                    No. <b>{singleAllotmentlatter.khno}</b> , Mouza <b>{singleAllotmentlatter.mouzeNo}</b> , Sheet No. <b> {singleAllotmentlatter.sheetNo}</b>, City Survey
                                    No. <b> {singleAllotmentlatter.citySurveyNo}</b>,Nagpur to Mr./Mrs <b> {singleAllotmentlatter.name}</b> for the total consideration of
                                    Rs. <b> {singleAllotmentlatter.totalamount}</b>(Rupees. <b> {singleAllotmentlatter.totalamountword}</b>
                                    ) only under an Agreement Dt. <b> {new Date(singleAllotmentlatter.agreementDate).toLocaleDateString("en-GB")}</b>
                                    along with residential construction of about <b> {singleAllotmentlatter.sqmtrs}</b> Sq.mtrs ( <b>{singleAllotmentlatter.sqft}</b> Sq.Ft).
                                    We confirm that we have obtained necessary permission/s / approvals / sanction for construction of said building from all the concerned competent authorities.
                                    We assure you that the said building and the land apartment thereto are not
                                    subject to any encumbrance charges or liabilities of and that the entire property is free and marketable title of the said property and every part thereof.

                                </p>
                            </div>

                            <p style={{ marginTop: "35px" }}> Authorized Signatory</p>

                            <p> Date : {myCurrentDate} </p>

                        </div>

                    </div>


                )
            }


        </>
    )
}

export default AllotmentLatter