import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../config';
import "./singlevendor.css"

function SingleVendor() {
    const { projectId, vendorId } = useParams();
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;

    // Get IDs from URL path
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const myvendorname = queryParams.get("name");
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [bills, setBills] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [billNo, setBillNO] = useState("")
    const [price, setPrice] = useState("");
    const [materialList, setmaterialList] = useState([])
    const [refreshKey, setrefreshKey] = useState(0)
    const [showpaymentform, setshowpaymentform] = useState(false)
    const [billDate, setbillDate] = useState("")
    const [billAmount, setBillAmount] = useState("")
    const [billRemark, setBillRemark] = useState("")
    const [billStatus, setBillStatus] = useState("")
    const [billId, setBillId] = useState("")
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = [{
            name,
            billNo: billNo,
            type,
            quantity,
            price: String(price).replace(/,/g, "")
        }];
        console.log(formData)
        try {
            const response = await axios.post(`${BASE_URL}/projects/${projectId}/${vendorId}/add-expense`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
            console.log(response);
            alert("Form successfully submitted");
            setName("");
            setType("");
            setQuantity("");
            setPrice("");
            setrefreshKey(refreshKey + 1)

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        async function getallmateialList() {
            try {
                const response = await axios.get(`${BASE_URL}/bills/${vendorId}/${projectId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                })
                console.log(response.data)
                setBills(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        getallmateialList()
    }, [refreshKey])


    function handleaddbill(id) {
        setBillId(id)
        setshowpaymentform(true)
    }


    async function handleAddpaymentTOBill(e) {
        e.preventDefault()

        const formData = {
            payDate: billDate,
            amount: billAmount.replace(/,/g, ""),
            remark: billRemark,
            paymentStatus: billStatus,
            vendorId: vendorId,
            projectId:projectId
        }
        console.log(formData)
        try {
            const response = await axios.post(`${BASE_URL}/Material/${billId}/payments`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            if (response.status === 200) {
                alert("Payment added Successfully")
                setrefreshKey(refreshKey + 1)
                setBillAmount("")
                setBillRemark("")
                setBillStatus("")
                setbillDate("")
            }
        } catch (error) {
            console.log(error)
        }


    }
    return (
        <>
            <div className="Addmaterialbutton_wrapper">
                <button onClick={() => setShowAddMaterial(!showAddMaterial)} >Add Material</button>

            </div>


            {
                showAddMaterial && (

                    <div className="addMeterialformwrapper">
                        <div className="hideAddmaterial_button">
                            <button onClick={() => setShowAddMaterial(!showAddMaterial)} className='crossMetetialform_btn'>X</button>
                        </div>
                        <form onSubmit={handleSubmit} className="addMeterialform">
                            <div>
                                <label className="addMeteriallable">
                                    Name:
                                    <input
                                        type="text"
                                        value={name}
                                        placeholder='Meterial Name'
                                        onChange={(e) => setName(e.target.value)}
                                        className="addMeterialinput"
                                        required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Type:
                                </label>
                                <select name="" id="" value={type} onChange={(e) => setType(e.target.value)} required className="addMeterialselect">
                                    <option value="">Select Type</option>
                                    <option value="MATERIAL">MATERIAL</option>
                                    <option value="LABOUR">LABOUR</option>
                                    <option value="OTHER">OTHER</option>
                                </select>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Quantity:
                                    <input
                                        type="number"
                                        value={quantity}
                                        placeholder='Meterial quantity'
                                        className="addMeterialinput"
                                        onChange={(e) => setQuantity(Number(e.target.value))}
                                        required
                                    />
                                </label >
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Bill No:
                                    <input
                                        type="text"
                                        value={billNo}
                                        placeholder='Enter bill No'
                                        className="addMeterialinput"
                                        onChange={(e) => setBillNO(e.target.value)}

                                    // required
                                    />
                                </label>
                            </div>
                            <div>
                                <label className="addMeteriallable">
                                    Price:
                                    <input
                                        type="text"
                                        value={price}
                                        placeholder='Enter price'
                                        className="addMeterialinput"
                                        onChange={(e) => setPrice(e.target.value)}
                                    />
                                </label>
                            </div>



                            <button type="submit" className="addMeterialsubmitbutton">Submit</button>
                        </form>
                    </div>

                )
            }



            <div className="bill-container">
                {bills.map((bill, index) => (
                    <div key={index} className="bill-card">
                        <div className="bill_no_container">
                            <h2 className="bill-header">Bill No: {bill.billNo}</h2>
                            {
                                role === "Admin" && (
                                    <button onClick={() => handleaddbill(bill.billNo)} className='add_payment_button'> Add Payment</button>
                                )
                            }
                        </div>

                        <p className="vendor-info">
                            Vendor: {bill.vendor.name} ({bill.vendor.phoneno})
                        </p>
                        <div className="Materials_section">
                            <h3 className="Materials_section-header">Materials:</h3>
                            <table className="materials-table">
                                <thead>
                                    <tr>
                                        <th>Material</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bill.materials.map((mat) => (
                                        <tr key={mat.id}>
                                            <td>{mat.name}</td>
                                            <td>{mat.quantity}</td>
                                            <td>₹{mat.price?.toLocaleString()}</td>
                                            <td>{new Date(mat.addedOn).toLocaleDateString("en-GB")}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="materials-section">
                            <h3 className="materials-section-header">Payments</h3>
                            <div className="table-container">
                                <table className="payments-table">
                                    <thead>
                                        <tr>
                                            <th>Amount (₹)</th>
                                            <th>Payment Mode</th>
                                            <th>Note</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {bill.payment.map((pay, idx) => (
                                            <tr key={idx}>
                                                <td>₹{pay.expenseAmount?.toLocaleString()}</td>
                                                <td>{pay.expensePayStatus}</td>
                                                <td>{pay.remark}</td>
                                                <td>{new Date(pay.expensePayDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="amount-details">
                            <p>Total: ₹{bill.total.toLocaleString()}</p>
                            <p>Paid: ₹{bill.vendorPaidAmount.toLocaleString()}</p>
                            <p>Remaining: ₹{bill.remainingAmount.toLocaleString()}</p>
                        </div>
                    </div>
                ))}
            </div>


            {showpaymentform && (
                <div className="show_payment_form_container">
                    <form className='show_payment_form' onSubmit={handleAddpaymentTOBill}>
                        <button onClick={() => setshowpaymentform(false)} className='show_payment_form_close'>X</button>

                        <input type="date" className='show_payment_form_input' value={billDate || new Date().toISOString().split("T")[0]} onChange={(e) => setbillDate(e.target.value)} />
                        <input type="text" placeholder='Enter Amount' className='show_payment_form_input' value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
                        <input type="text" placeholder='Note' className='show_payment_form_input' value={billRemark} onChange={(e) => setBillRemark(e.target.value)} />
                        <select className='show_payment_form_select' value={billStatus} onChange={(e) => setBillStatus(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="CASH">Cash</option>
                            <option value="CHECK">Check</option>
                            <option value="UPI">UPI</option>
                            <option value="RTGS">RTGS</option>
                            <option value="NEFT">NEFT</option>
                        </select>
                        <button className='show_payment_form_submit_button'>Submit</button>
                    </form>
                </div>
            )}

        </>
    )
}

export default SingleVendor