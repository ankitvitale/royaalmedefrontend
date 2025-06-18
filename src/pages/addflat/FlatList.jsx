import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { FaEye, FaTrashAlt, FaHome, FaHashtag, FaBuilding, FaLayerGroup, FaMoneyBillWave, FaTag, FaUserPlus } from "react-icons/fa";
import { BASE_URL } from '../../config';
function FlatList() {
    const { id } = useParams()
    const location = useLocation();
    const { newname } = location.state || {};
    console.log(newname)
    const [bookingId, setBookindId] = useState("")
    const navigate = useNavigate()
    const [showFlat, setShowFlat] = useState(false)
    const [name, setName] = useState("")
    const [flatType, setFlatType] = useState("")
    const [Residency, setResidency] = useState("")
    const [Availability, setAvailability] = useState("")
    const [floorNumber, setFloorNumber] = useState("")
    const [FlatNumber, setflatNumber] = useState("")
    const [flatPrice, setFlatprice] = useState("")
    const [showflatNumber, setShowFlatNumber] = useState([])
    const [flatDetailpopUp, setflatDetailpopUp] = useState(false)
    const [singledata, setsingledata] = useState([])
    const [Showcustomer, setShowCustomer] = useState(false)
    const [flatid, setFlatId] = useState("")
    const [refreshKey, setRefreshKey] = useState(0);
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    const [dealPrice, setDealPrice] = useState();
    const [tokenAmount, setTokenAmount] = useState();
    const [agreementAmount, setAgreementAmount] = useState();
    const [stampDutyAmount, setStampDutyAmount] = useState();
    const [registrationAmount, setRegistrationAmount] = useState();
    const [gstAmount, setGstAmount] = useState();
    const [electricWaterAmmount, setElectricWaterAmount] = useState();
    const [legalChargesAmmout, setLegalChargesAmount] = useState();
    const [bookedOn, setBookedOn] = useState("");
    const [bookingStatus, setBookingStatus] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [aadharNumber, setAadharNumber] = useState("");
    const [address, setAddress] = useState("");
    const [panCard, setPanCard] = useState("");
    const [agentName, setAgentName] = useState("");
    const [brokerage, setBrokerage] = useState();
    const [loan, setloan] = useState("");
    const [facing, setFacing] = useState("");
    const [area, setArea] = useState("");

    const [customerId, setCustomerId] = useState("")

    const [flatDetailEditId, setFlatDetailEditId] = useState("")
    const [flatDetailEditForm, setFlatDetailEditForm] = useState(false)
    function handleAddFlat() {
        setShowFlat(!showFlat)
    }
    function closeAddflat() {
        setShowFlat(!showFlat)
    }

    async function handleNewFlat(e) {
        e.preventDefault();

        if (!Residency || !flatType || !Availability || !floorNumber || !FlatNumber || !flatPrice) {
            return alert("Please fill in all fields before submitting!");
        }

        const obj = {
            name: newname,
            residencyType: Residency,
            flatType: flatType,
            availabilityStatus: Availability,
            floorNumber: floorNumber,
            identifier: FlatNumber,
            price: flatPrice.replace(/,/g, ""),
            projectId: id,
            area: area,
            facing: facing
        };

        console.log("Request Object:", obj);
        try {
            const response = await axios.post(`${BASE_URL}/createResidency`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Response:", response);
            alert("flat list created successfully")
            setFlatType("")
            setResidency("")
            setAvailability("")
            setFloorNumber("")
            setflatNumber("")
            setFlatprice("")
            setFacing("")
            setArea("")
            setShowFlat(false)
            setRefreshKey(refreshKey + 1)

        } catch (error) {
            console.error("Error creating residency:", error);
            alert("Failed to create residency. Please try again.");
        }
    }

    useEffect(() => {
        async function gettingFlat() {

            try {
                const resonse = await axios.get(`${BASE_URL}/project/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                })
                console.log(resonse.data)
                setShowFlatNumber(resonse.data)
            } catch (error) {
                console.log(error)
            }
        }
        gettingFlat()
    }, [id, refreshKey])

    async function handleShowflatDetail(id) {
        console.log(id)
        try {
            const response = await axios.get(`${BASE_URL}/allResidencybyid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            setBookindId(response?.data?.booking?.id)

            setsingledata(response.data)
            setFlatId(id)
            setflatDetailpopUp(true)
        } catch (error) {
            console.log(error)
        }
    }

    function handlecloseflat() {
        setflatDetailpopUp(false)

    }
    function handleShowCustomerForm() {
        setflatDetailpopUp(false)
        setShowCustomer(true)
    }
    function handleCloseCustomer() {
        setShowCustomer(false)

    }

    async function handleAddCustomer(e) {
        e.preventDefault();
        const formData = {
            dealPrice: dealPrice.replace(/,/g, ""),
            tokenAmount: tokenAmount.replace(/,/g, ""),
            agreementAmount: agreementAmount.replace(/,/g, ""),
            stampDutyAmount: stampDutyAmount.replace(/,/g, ""),
            registrationAmount: registrationAmount.replace(/,/g, ""),
            gstAmount: gstAmount.replace(/,/g, ""),
            electricWaterAmmount: electricWaterAmmount.replace(/,/g, ""),
            legalChargesAmmout: legalChargesAmmout.replace(/,/g, ""),
            bookedOn,
            bookingStatus,
            customerDto: {
                name: customerName,
                phoneNumber,
                email,
                aadharNumber,
                address,
                panCard,
                agentName,
                brokerage,
                loan,
            },
            residencyDto: { id: flatid },
        };
        try {
            const response = await axios.post(`${BASE_URL}/createBooking`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            const myId = (response.data.id)
            navigate(`/flatowner/${myId}`)
            alert("customer Added Successfully")
            setDealPrice("")
            setTokenAmount("")
            setAgreementAmount("")
            setStampDutyAmount("")
            setRegistrationAmount("")
            setGstAmount("")
            setElectricWaterAmount("")
            setLegalChargesAmount("")
            setBookedOn("")
            setBookingStatus("")
            setName("")
            setPhoneNumber("")
            setEmail("")
            setAadharNumber("")
            setAddress("")
            setPanCard("")
            setAgentName("")
            setBrokerage("")
            setloan("")
            setShowCustomer(false)

        } catch (error) {
            console.log(error)
        }

    }

    async function handlepassId(id) {

        try {
            const response = await axios.get(`${BASE_URL}/booking/${bookingId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            const ids = (response?.data?.customer?.id || response?.data?.booking?.id)

            console.log(ids)
            if (response.status === 200) {
                navigate(`/flatowner/${bookingId}`)
            }

        } catch (error) {
            console.log(error)
        }

    }

    async function handleflatdelete(id) {
        const flatdelete = window.confirm("Are you sure to delete ?")
        if (!flatdelete) return
        try {
            const response = await axios.delete(`${BASE_URL}/deleteResidency/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            alert("flat deleted")
            setRefreshKey(refreshKey + 1)
        } catch (error) {
            console.log(error)
        }

    }

    const groupedFlats = showflatNumber.reduce((acc, flat) => {
        if (!acc[flat.floorNumber]) acc[flat.floorNumber] = [];
        acc[flat.floorNumber].push(flat);
        return acc;
    }, {});


    const sortedFloors = Object.keys(groupedFlats).sort((a, b) => b - a);



    async function handleEditFlatDetail(id) {
        setFlatDetailEditId(id)
        setFlatDetailEditForm(true)
        setflatDetailpopUp(false)

        try {
            const response = await axios.get(`${BASE_URL}/allResidencybyid/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            })
            console.log(response.data)
            const flatData = response.data;
            setName(flatData.name);
            setFlatType(flatData.flatType);
            setResidency(flatData.residencyType);
            setAvailability(flatData.availabilityStatus);
            setFloorNumber(flatData.floorNumber);
            setflatNumber(flatData.identifier);
            setFlatprice(flatData.price);
            setFacing(flatData.facing);
            setArea(flatData.area);
            setFlatId(id);

        } catch (error) {
            console.error("Error fetching flat details:", error);
        }

    }

    async function handleUpdateFlatDetail(e) {
        e.preventDefault();

        if (!Residency || !flatType || !Availability || !floorNumber || !FlatNumber || !flatPrice) {
            return alert("Please fill in all fields before submitting!");
        }

        const obj = {
            id: flatDetailEditId,
            name: newname,
            residencyType: Residency,
            flatType: flatType,
            availabilityStatus: Availability,
            floorNumber: floorNumber,
            identifier: FlatNumber,
            price: String(flatPrice).replace(/,/g, ""),
            area: area,
            facing: facing
        };

        try {
            const response = await axios.put(`${BASE_URL}/updateresidency/${flatDetailEditId}`, obj, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log("Response:", response);
            alert("Flat details updated successfully");
            setName("");
            setFlatType("");
            setResidency("");
            setAvailability("");
            setFloorNumber("");
            setflatNumber("");
            setFlatprice("");
            setFacing("");
            setArea("");
            setFlatId("");
            setFlatDetailEditForm(false);
            setRefreshKey(refreshKey + 1);
        } catch (error) {
            console.error("Error updating flat details:", error);
        }
    }
    return (
        <>

            <div className="add_flat_button" >
                <button onClick={handleAddFlat} > Add Flat</button> <br />
            </div>

            <div className="flat_number_container">
                {sortedFloors.map((floor) => (
                    <div key={floor}>
                        <h3>Floor {floor}</h3>
                        <div className="flats_container">
                            {groupedFlats[floor].map((item) => (
                                <div className="flat_numbers" key={item.id}>
                                    <button
                                        onClick={() => handleShowflatDetail(item.id)}
                                        className={item.availabilityStatus === "BOOKED" ? "book" : "available"}
                                    >
                                        {item.identifier}
                                    </button>
                                    <button className="delete_flat" onClick={() => handleflatdelete(item.id)}>
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            ))}
                        </div>

                    </div>
                ))}
            </div>


            <div className={`flat_Detail_Container ${flatDetailpopUp ? 'visible' : ''}`}>
                {flatDetailpopUp && singledata && (
                    <div className="flat-detail-card">
                        <button className="singleflat_close_button" onClick={handlecloseflat}>✖</button>
                        <button style={{ height: "30px", marginLeft: "10px", width: "50px", background: "#0476a7", color: "white", border: "none", borderRadius: "4px" }} onClick={() => handleEditFlatDetail(singledata.id)}>Edit</button>
                        <h3 className="flat-title"> <FaEye /> Flat Details</h3>
                        <div className="flat-info">
                            {/* <p><strong>Scheme ID:</strong> {singledata.id}</p> */}
                            <p><strong> <FaHome style={{ color: "#0476a7", fontSize: "20px" }} />  Scheme Name:</strong> {newname}</p>
                            <p><strong> <FaHashtag style={{ color: "#0476a7", fontSize: "20px" }} /> Flat Number:</strong> {singledata.identifier}</p>
                            <p><strong><FaTag style={{ color: "#0476a7", fontSize: "20px" }} />  Status:</strong> {singledata.availabilityStatus}</p>
                            <p><strong> <FaBuilding style={{ color: "#0476a7", fontSize: "20px" }} /> Type:</strong> {singledata.flatType}</p>
                            <p><strong ><FaLayerGroup style={{ color: "#0476a7", fontSize: "20px" }} /> Floor Number:</strong> {singledata.floorNumber}</p>
                            <p><strong> <FaMoneyBillWave style={{ color: "#0476a7", fontSize: "20px" }} /> Price:</strong> ₹{singledata.price ? singledata.price.toLocaleString() : "N/A"}</p>
                            <p><strong >  <FaBuilding style={{ color: "#0476a7", fontSize: "20px" }} /> Residency Type:</strong> {singledata.residencyType}</p>
                            <p><strong > <FaHashtag style={{ color: "#0476a7", fontSize: "20px" }} />  Facing:</strong> {singledata.facing} </p>
                            <p><strong >  <FaBuilding style={{ color: "#0476a7", fontSize: "20px" }} /> Area:</strong> {singledata.area} Sq.ft</p>
                        </div>
                        {
                            singledata.availabilityStatus === "BOOKED" ? <button className='coustomer_view_button' onClick={() => handlepassId(singledata?.booking.id)} > <FaEye style={{ fontSize: "20px" }} /> View Customer</button> :
                                <button className="add-customer-button" onClick={handleShowCustomerForm}>
                                    <FaUserPlus style={{ fontSize: "18px" }} />  Add Customer
                                </button>
                        }

                    </div>
                )}
            </div>


            {
                Showcustomer && (
                    <>
                        <form onSubmit={handleAddCustomer} className='add_customer_form'>
                            <button onClick={handleCloseCustomer} className='close_cutomer_form_button'> X</button>

                            <h3 className='add_customer_h3'>Booking Details </h3>

                            <label className='add_customer_label'>Deal Price:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={dealPrice}
                                onChange={(e) => setDealPrice(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Token Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={tokenAmount}
                                onChange={(e) => setTokenAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Agreement Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={agreementAmount}
                                onChange={(e) => setAgreementAmount(e.target.value)}
                            />
                            <br />

                            <label className='add_customer_label'>Stamp Duty Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={stampDutyAmount}
                                onChange={(e) => setStampDutyAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Registration Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={registrationAmount}
                                onChange={(e) => setRegistrationAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>GST Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={gstAmount}
                                onChange={(e) => setGstAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Electric & Water Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={electricWaterAmmount}
                                onChange={(e) => setElectricWaterAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Legal Charges Amount:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={legalChargesAmmout}
                                onChange={(e) => setLegalChargesAmount(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Booked On:</label>
                            <input className='add_customer_input'
                                type="date"
                                value={bookedOn || new Date().toISOString().split("T")[0]}
                                onChange={(e) => setBookedOn(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Booking Status:</label>
                            <select className='add_customer_select'
                                value={bookingStatus}
                                onChange={(e) => setBookingStatus(e.target.value)}
                                required>
                                <option value=""> Select Status</option>
                                <option value="COMPLETE">Complete</option>
                                <option value="PENDING">Pending</option>
                            </select>
                            <br />

                            <h4 className='add_customer_h4'>Customer Details</h4>

                            <label className='add_customer_label'>Name:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Phone Number:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Email:</label>
                            <input className='add_customer_input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <br />

                            <label className='add_customer_label' >Aadhar Number:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={aadharNumber}
                                onChange={(e) => setAadharNumber(e.target.value)} />
                            <br />
                            <label className='add_customer_label'>PAN Card:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={panCard}
                                onChange={(e) => setPanCard(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Address:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)} />
                            <br />


                            <label className='add_customer_label'>Agent Name:</label>
                            <input className='add_customer_input'
                                type="text"
                                value={agentName}
                                onChange={(e) => setAgentName(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Brokerage:</label>
                            <input className='add_customer_input'
                                type="number"
                                value={brokerage}
                                onChange={(e) => setBrokerage(e.target.value)} />
                            <br />

                            <label className='add_customer_label'>Loan Status:</label>
                            <select className='add_customer_select'
                                value={loan}
                                onChange={(e) => setloan(e.target.value)}
                                required>
                                <option value=""> Select Status</option>
                                <option value="YES">YES</option>
                                <option value="NO">NO</option>
                            </select>

                            <button type="submit" className='add_customer_submit_button'>Submit</button>
                        </form>
                    </>
                )
            }

            {/* ************************ end customer form end */}


            {/* add new flat************** */}
            <div className="add_newflat_container">
                {
                    showFlat && (
                        <>


                            <div className="add_flat">
                                <div className="AddFlatClose">
                                    <button onClick={closeAddflat}> x</button>
                                </div>
                                <form className='add_flat_form' action="" onSubmit={handleNewFlat}>
                                    <label className='add_flat_label' htmlFor="">Name:</label>
                                    <input className='add_flat_input' type="text" value={newname} onChange={(e) => setName(e.target.value)} />
                                    <label className='add_flat_label' htmlFor=""> Residency Type</label>
                                    <select className='add_flat_select' name="" id="" value={Residency} onChange={(e) => setResidency(e.target.value)}>
                                        <option value=""> Select Type</option>
                                        <option value="FLAT">Flat</option>
                                        <option value="HOUSE"> HOUSE</option>
                                        <option value="OTHER">other</option>
                                    </select>
                                    <label className='add_flat_label' htmlFor=""> flat Type</label>
                                    <select className='add_flat_select' name="" id="" value={flatType} onChange={(e) => setFlatType(e.target.value)}>
                                        <option value=""> Select flat Type</option>
                                        <option value="ONE_BHK">1 BHK</option>
                                        <option value="TWO_BHK">2 BHK</option>
                                        <option value="THREE_BHK">3 BHK</option>
                                        <option value="FOUR_BHK">4 BHK</option>
                                        <option value="FIVE_BHK">5 BHK</option>
                                    </select>
                                    <label className='add_flat_label'> Availability Status</label>
                                    <select className='add_flat_select' name="" id="" value={Availability} onChange={(e) => setAvailability(e.target.value)}>
                                        <option value=""> Select Available</option>
                                        <option value="AVAILABLE">AVAILABLE</option>
                                        <option value="BOOKED">BOOKED</option>
                                    </select>
                                    <label className='add_flat_label'>Area</label>
                                    <input className='add_flat_input' type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                                    <label className='add_flat_label'>Facing</label>
                                    <input className='add_flat_input' type="text" value={facing} onChange={(e) => setFacing(e.target.value)} />
                                    <label className='add_flat_label'>Floor Number</label>
                                    <input className='add_flat_input' type="number" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                                    <label className='add_flat_label'>Flat Number</label>
                                    <input className='add_flat_input' type="number" value={FlatNumber} onChange={(e) => setflatNumber(e.target.value)} />
                                    <label className='add_flat_label'>Price</label>
                                    <input className='add_flat_input' type="text" value={flatPrice} onChange={(e) => setFlatprice(e.target.value)} />

                                    <button className='add_flat_button_submit' type='submit'>Add Flat</button>
                                </form>
                            </div>
                        </>
                    )
                }
            </div>
            {/* *************  End New flat */}




            {
                flatDetailEditForm && (
                    <div className='add_newflat_container'>
                        <div className="add_flat">
                            <div className="AddFlatClose">
                                <button onClick={() => setFlatDetailEditForm(false)}> x</button>
                            </div>
                            <h2> Edit Flat Details</h2>
                            <form className='add_flat_form' onSubmit={handleUpdateFlatDetail} >
                                <label className='add_flat_label' htmlFor="">Name:</label>
                                <input className='add_flat_input' type="text" value={newname} onChange={(e) => setName(e.target.value)} />
                                <label className='add_flat_label' htmlFor=""> Residency Type</label>
                                <select className='add_flat_select' name="" id="" value={Residency} onChange={(e) => setResidency(e.target.value)}>
                                    <option value=""> Select Type</option>
                                    <option value="FLAT">Flat</option>
                                    <option value="HOUSE"> HOUSE</option>
                                    <option value="OTHER">other</option>
                                </select>
                                <label className='add_flat_label' htmlFor=""> flat Type</label>
                                <select className='add_flat_select' name="" id="" value={flatType} onChange={(e) => setFlatType(e.target.value)}>
                                    <option value=""> Select flat Type</option>
                                    <option value="ONE_BHK">1 BHK</option>
                                    <option value="TWO_BHK">2 BHK</option>
                                    <option value="THREE_BHK">3 BHK</option>
                                    <option value="FOUR_BHK">4 BHK</option>
                                    <option value="FIVE_BHK">5 BHK</option>
                                </select>
                                <label className='add_flat_label'> Availability Status</label>
                                <select className='add_flat_select' name="" id="" value={Availability} onChange={(e) => setAvailability(e.target.value)}>
                                    <option value=""> Select Available</option>
                                    <option value="AVAILABLE">AVAILABLE</option>
                                    <option value="BOOKED">BOOKED</option>
                                </select>
                                <label className='add_flat_label'>Area</label>
                                <input className='add_flat_input' type="text" value={area} onChange={(e) => setArea(e.target.value)} />
                                <label className='add_flat_label'>Facing</label>
                                <input className='add_flat_input' type="text" value={facing} onChange={(e) => setFacing(e.target.value)} />
                                <label className='add_flat_label'>Floor Number</label>
                                <input className='add_flat_input' type="number" value={floorNumber} onChange={(e) => setFloorNumber(e.target.value)} />
                                <label className='add_flat_label'>Flat Number</label>
                                <input className='add_flat_input' type="number" value={FlatNumber} onChange={(e) => setflatNumber(e.target.value)} />
                                <label className='add_flat_label'>Price</label>
                                <input className='add_flat_input' type="text" value={flatPrice} onChange={(e) => setFlatprice(e.target.value)} />

                                <button className='add_flat_button_submit' type='submit'>Update Flat</button>
                            </form>
                        </div>
                    </div>

                )
            }

        </>
    )
}

export default FlatList