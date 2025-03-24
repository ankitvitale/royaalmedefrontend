import axios from 'axios';
import React, { useEffect, useState } from 'react';
import logo from "../../assets/royal.png"
import {
    FaMapMarkerAlt,
    FaEnvelope,
    FaGlobe,
    FaPhoneAlt,
} from "react-icons/fa";
import { useRef } from "react";
import html2pdf from "html2pdf.js";
import "../latters/Latter.css"
import { BASE_URL } from '../../config';
function DemandLetter() {
    const letterRef = useRef()
    const token = JSON.parse(
        localStorage.getItem("employeROyalmadeLogin")
    )?.token;
    const [showDemandlatter, setShowDemandlatter] = useState(false)
    const [singleDemadlatter, setsingleDemadlatter] = useState("")
    const [formData, setFormData] = useState({
        name: '',
        faltno: '',
        amount: '',
        sitename: '',
        favorOf: '',
        bankName: '',
        branch: '',
        acNo: ''
    });
    const [alldemandlattertable, setalldemandlattertable] = useState([])
    const [refreshkey, setrefreshKey] = useState("")
    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/createDemandLetter`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Replace with actual token
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                setrefreshKey(refreshkey + 1)
                // Handle success (e.g., show success message, reset form, etc.)
            } else {
                console.log('Failed to submit the form');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        async function getallDemand() {
            try {
                const response = await axios.get(`${BASE_URL}/getAllDemandLetters`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response.data)
                setalldemandlattertable(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getallDemand()
    }, [refreshkey])


    const handleDownload = () => {
        const element = letterRef.current;

     
        const width = 750; 
        const height = element.scrollHeight + 220;

      
        const options = {
            margin: [10, 10], 
            filename: "Demand_lette.pdf",
            image: { type: "jpeg", quality: 0.8 },
            html2canvas: {
                scale: 2,
                useCORS: true,
            },
            jsPDF: {
                unit: "px",
                format: [width, height],
                orientation: "portrait",
            },
        };

      
        html2pdf().from(element).set(options).save();
    };
    async function handleDeleteDemand(id) {
        try {
            const response = await axios.delete(`${BASE_URL}/deleteDemandLetter/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response)
            setrefreshKey(refreshkey + 1)
        } catch (error) {
            console.log(error)
        }
    }

    async function handleShowdemadlatter(id) {
        try {
            const response = await axios.get(`${BASE_URL}/getDemandLetterById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)

            setsingleDemadlatter(response.data)
            setShowDemandlatter(true)
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>


            <div>
                <p className='demand_letter_page_heading'>
                    Demand Letter
                </p>
                <div className="demand_latter_form_wrapper">
                    <form onSubmit={handleSubmit} className='demad_latter_form'>
                        <input
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'
                        />
                        <input
                            type="text"
                            name="faltno"
                            placeholder="Falt No"
                            value={formData.faltno}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="number"
                            name="amount"
                            placeholder="Amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="sitename"
                            placeholder="Site Name"
                            value={formData.sitename}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="favorOf"
                            placeholder="Favor Of"
                            value={formData.favorOf}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="bankName"
                            placeholder="Bank Name"
                            value={formData.bankName}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="branch"
                            placeholder="Branch"
                            value={formData.branch}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <input
                            type="text"
                            name="acNo"
                            placeholder="Account No"
                            value={formData.acNo}
                            onChange={handleChange}
                            required
                            className='demand_latter_form_input'

                        />
                        <button type="submit" className='demand_latter_form_submit_button'>Submit</button>
                    </form>
                </div>

            </div>



            {/*  demand latter table   */}
            <div className="demand_latter_table_wrapper">
                <table className='demand_latter_table'>
                    <thead className='demand_latter_thead'>
                        <tr>
                            <th>Name</th>
                            <th>Falt No</th>
                            <th>Amount</th>
                            <th>Site Name</th>
                            <th>Favor Of</th>
                            <th>Bank Name</th>
                            <th>Branch</th>
                            <th>Account No</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody className='demand_latter_tbody'>
                        {alldemandlattertable.map((demand, index) => (
                            <tr key={index}>
                                <td>{demand.name}</td>
                                <td>{demand.faltno}</td>
                                <td>{demand.amount}</td>
                                <td>{demand.sitename}</td>
                                <td>{demand.favorOf}</td>
                                <td>{demand.bankName}</td>
                                <td>{demand.branch}</td>
                                <td>{demand.acNo}</td>
                                <td>
                                    <button onClick={() => handleShowdemadlatter(demand.id)} className='latter_show_button'> Show</button>
                                    <button onClick={() => handleDeleteDemand(demand.id)} className='latter_show_delete'> Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* demand latter end */}

            {/* //   ****************** demand latter pdf data  */}
            {
                showDemandlatter && singleDemadlatter && (
                    <div
                        className="demand_latter_main_wrapper"
                     
                    >
                        <button onClick={handleDownload} className='demand_latter_dowmlode_button'> downlode</button>
                        <button onClick={()=>setShowDemandlatter(false)} className='demand_latter_close_button'>  Close</button>
                        <div className="demand_latter_container">
                            <div
                                ref={letterRef}
                                style={{
                                    fontFamily: "Arial, sans-serif",
                                    width: "100%",
                                    margin: "auto",
                                    padding: "20px",
                                    height: "auto",
                                    border: "1px solid #ccc",
                                    pageBreakAfter: "always",
                                }}
                            >
                                {/* Header */}
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


                                <hr
                                    style={{
                                        border: "1px solid rgb(167, 5, 86)",
                                        marginBottom: "2px",
                                    }}
                                />
                                <hr style={{ border: "3px solid rgb(167, 5, 86)" }} />

                                <h2 style={{ textAlign: "center", marginTop: "20px" }}>
                                    DEMAND LETTER
                                </h2>
                                <p style={{ marginTop: "5px" }}> To,</p>
                                <p>Mr/Mrs,</p>
                                <b> {singleDemadlatter.name}</b>
                                <p> Address</p>
                                <p style={{ textAlign: "center" }}>
                                    Subject : Demand of Disbursement
                                </p>
                                <p style={{ marginTop: "20px" }}> Ref.Your Flat No <b>{singleDemadlatter.faltno}  </b> </p>

                                <p style={{ marginTop: "30px" }}> Dear Sir / Madam ,</p>
                                <p style={{ marginTop: "10px" }}>
                                    You will be pleased to know that the work the stage maintained
                                    below has been completed within its scheduled course of time.
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    You are requested to release the payment of Rs <b>{singleDemadlatter.amount}</b>
                                </p>
                                <p style={{ marginTop: "10px" }}>
                                    Due, against this stage of our site
                                </p>
                                <p style={{ marginTop: "10px" }}> In favor of <b>{singleDemadlatter.favorOf}    </b>  </p>
                                <p style={{ marginTop: "10px" }}> Bank Name <b>{singleDemadlatter.bankName}  </b> </p>
                                <p style={{ marginTop: "10px" }}> Bank Branch  <b> {singleDemadlatter.branch}</b></p>
                                <p style={{ marginTop: "10px" }}> A/c No. <b>  {singleDemadlatter.acNo}</b> </p>
                                <p style={{ marginTop: "10px" }}>
                                    Kindly arrange the same and please extend your esteemed
                                    co-operation to achieve the target in time
                                </p>
                                <p style={{ marginTop: "10px" }}> Thanking you anticipation </p>
                                <p style={{ marginTop: "10px" }}> Yours truly,</p>
                                <p style={{ marginTop: "50px" }}> ( Authorized Signatory)</p>
                            </div>
                        </div>
                    </div>


                )
            }






        </>

    );
}

export default DemandLetter;
