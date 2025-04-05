// import React, { useEffect } from 'react'
// import { useState } from 'react'
// import { useParams, useLocation } from 'react-router-dom';
// import axios from 'axios';
// import { BASE_URL } from '../../config';
// import "./singlevendor.css"

// function SingleVendor() {
//     const { projectId, vendorId } = useParams();
//     const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
//     const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;

//     // Get IDs from URL path
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);
//     const myvendorname = queryParams.get("name");
//     const [showAddMaterial, setShowAddMaterial] = useState(false)
//     const [bills, setBills] = useState([]);
//     const [name, setName] = useState("");
//     const [type, setType] = useState("");
//     const [quantity, setQuantity] = useState("");
//     const [billNo, setBillNO] = useState("")
//     const [price, setPrice] = useState("");
//     const [materialList, setmaterialList] = useState([])
//     const [refreshKey, setrefreshKey] = useState(0)
//     const [showpaymentform, setshowpaymentform] = useState(false)
//     const [billDate, setbillDate] = useState("")
//     const [billAmount, setBillAmount] = useState("")
//     const [billRemark, setBillRemark] = useState("")
//     const [billStatus, setBillStatus] = useState("")
//     const [billId, setBillId] = useState("")
//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = [{
//             name,
//             billNo: billNo,
//             type,
//             quantity,
//             price: String(price).replace(/,/g, "")
//         }];
//         console.log(formData)
//         try {
//             const response = await axios.post(`${BASE_URL}/projects/${projectId}/${vendorId}/add-expense`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             });
//             console.log(response);
//             alert("Form successfully submitted");
//             setName("");
//             setType("");
//             setQuantity("");
//             setPrice("");
//             setrefreshKey(refreshKey + 1)

//         } catch (error) {
//             console.log(error);
//         }
//     };

//     useEffect(() => {
//         async function getallmateialList() {
//             try {
//                 const response = await axios.get(`${BASE_URL}/bills/${vendorId}/${projectId}`, {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                         "Content-Type": "application/json"
//                     }
//                 })
//                 console.log(response.data)
//                 setBills(response.data)
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         getallmateialList()
//     }, [refreshKey])


//     function handleaddbill(id) {
//         setBillId(id)
//         setshowpaymentform(true)
//     }


//     async function handleAddpaymentTOBill(e) {
//         e.preventDefault()

//         const formData = {
//             payDate: billDate,
//             amount: billAmount.replace(/,/g, ""),
//             remark: billRemark,
//             paymentStatus: billStatus,
//             vendorId: vendorId,
//             projectId:projectId
//         }
//         console.log(formData)
//         try {
//             const response = await axios.post(`${BASE_URL}/Material/${billId}/payments`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${token}`,
//                     "Content-Type": "application/json"
//                 }
//             })
//             console.log(response.data)
//             if (response.status === 200) {
//                 alert("Payment added Successfully")
//                 setrefreshKey(refreshKey + 1)
//                 setBillAmount("")
//                 setBillRemark("")
//                 setBillStatus("")
//                 setbillDate("")
//             }
//         } catch (error) {
//             console.log(error)
//         }


//     }
//     return (
//         <>
//             <div className="Addmaterialbutton_wrapper">
//                 <button onClick={() => setShowAddMaterial(!showAddMaterial)} >Add Material</button>

//             </div>


//             {
//                 showAddMaterial && (

//                     <div className="addMeterialformwrapper">
//                         <div className="hideAddmaterial_button">
//                             <button onClick={() => setShowAddMaterial(!showAddMaterial)} className='crossMetetialform_btn'>X</button>
//                         </div>
//                         <form onSubmit={handleSubmit} className="addMeterialform">
//                             <div>
//                                 <label className="addMeteriallable">
//                                     Name:
//                                     <input
//                                         type="text"
//                                         value={name}
//                                         placeholder='Meterial Name'
//                                         onChange={(e) => setName(e.target.value)}
//                                         className="addMeterialinput"
//                                         required
//                                     />
//                                 </label>
//                             </div>
//                             <div>
//                                 <label className="addMeteriallable">
//                                     Type:
//                                 </label>
//                                 <select name="" id="" value={type} onChange={(e) => setType(e.target.value)} required className="addMeterialselect">
//                                     <option value="">Select Type</option>
//                                     <option value="MATERIAL">MATERIAL</option>
//                                     <option value="LABOUR">LABOUR</option>
//                                     <option value="OTHER">OTHER</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="addMeteriallable">
//                                     Quantity:
//                                     <input
//                                         type="number"
//                                         value={quantity}
//                                         placeholder='Meterial quantity'
//                                         className="addMeterialinput"
//                                         onChange={(e) => setQuantity(Number(e.target.value))}
//                                         required
//                                     />
//                                 </label >
//                             </div>
//                             <div>
//                                 <label className="addMeteriallable">
//                                     Bill No:
//                                     <input
//                                         type="text"
//                                         value={billNo}
//                                         placeholder='Enter bill No'
//                                         className="addMeterialinput"
//                                         onChange={(e) => setBillNO(e.target.value)}

//                                     // required
//                                     />
//                                 </label>
//                             </div>
//                             <div>
//                                 <label className="addMeteriallable">
//                                     Price:
//                                     <input
//                                         type="text"
//                                         value={price}
//                                         placeholder='Enter price'
//                                         className="addMeterialinput"
//                                         onChange={(e) => setPrice(e.target.value)}
//                                     />
//                                 </label>
//                             </div>



//                             <button type="submit" className="addMeterialsubmitbutton">Submit</button>
//                         </form>
//                     </div>

//                 )
//             }



//             <div className="bill-container">
//                 {bills.map((bill, index) => (
//                     <div key={index} className="bill-card">
//                         <div className="bill_no_container">
//                             <h2 className="bill-header">Bill No: {bill.billNo}</h2>
//                             {
//                                 role === "Admin" && (
//                                     <button onClick={() => handleaddbill(bill.billNo)} className='add_payment_button'> Add Payment</button>
//                                 )
//                             }
//                         </div>

//                         <p className="vendor-info">
//                             Vendor: {bill.vendor.name} ({bill.vendor.phoneno})
//                         </p>
//                         <div className="Materials_section">
//                             <h3 className="Materials_section-header">Materials:</h3>
//                             <table className="materials-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Material</th>
//                                         <th>Quantity</th>
//                                         <th>Price</th>
//                                         <th>Date</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {bill.materials.map((mat) => (
//                                         <tr key={mat.id}>
//                                             <td>{mat.name}</td>
//                                             <td>{mat.quantity}</td>
//                                             <td>₹{mat.price?.toLocaleString()}</td>
//                                             <td>{new Date(mat.addedOn).toLocaleDateString("en-GB")}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>

//                         <div className="materials-section">
//                             <h3 className="materials-section-header">Payments</h3>
//                             <div className="table-container">
//                                 <table className="payments-table">
//                                     <thead>
//                                         <tr>
//                                             <th>Amount (₹)</th>
//                                             <th>Payment Mode</th>
//                                             <th>Note</th>
//                                             <th>Date</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {bill.payment.map((pay, idx) => (
//                                             <tr key={idx}>
//                                                 <td>₹{pay.expenseAmount?.toLocaleString()}</td>
//                                                 <td>{pay.expensePayStatus}</td>
//                                                 <td>{pay.remark}</td>
//                                                 <td>{new Date(pay.expensePayDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>

//                         <div className="amount-details">
//                             <p>Total: ₹{bill.total.toLocaleString()}</p>
//                             <p>Paid: ₹{bill.vendorPaidAmount.toLocaleString()}</p>
//                             <p>Remaining: ₹{bill.remainingAmount.toLocaleString()}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>


//             {showpaymentform && (
//                 <div className="show_payment_form_container">
//                     <form className='show_payment_form' onSubmit={handleAddpaymentTOBill}>
//                         <button onClick={() => setshowpaymentform(false)} className='show_payment_form_close'>X</button>

//                         <input type="date" className='show_payment_form_input' value={billDate || new Date().toISOString().split("T")[0]} onChange={(e) => setbillDate(e.target.value)} />
//                         <input type="text" placeholder='Enter Amount' className='show_payment_form_input' value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
//                         <input type="text" placeholder='Note' className='show_payment_form_input' value={billRemark} onChange={(e) => setBillRemark(e.target.value)} />
//                         <select className='show_payment_form_select' value={billStatus} onChange={(e) => setBillStatus(e.target.value)}>
//                             <option value="">Select Payment Method</option>
//                             <option value="CASH">Cash</option>
//                             <option value="CHECK">Check</option>
//                             <option value="UPI">UPI</option>
//                             <option value="RTGS">RTGS</option>
//                             <option value="NEFT">NEFT</option>
//                         </select>
//                         <button className='show_payment_form_submit_button'>Submit</button>
//                     </form>
//                 </div>
//             )}

//         </>
//     )
// }

// export default SingleVendor

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import "./singlevendor.css";
import html2pdf from "html2pdf.js/dist/html2pdf";

function SingleVendor() {
    const { projectId, vendorId } = useParams();
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    const [showAddMaterial, setShowAddMaterial] = useState(false)
    const [materials, setMaterials] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [showBill, setshowBill] = useState(false)
    const [billId, setBillId] = useState("")
    const [showpaymentform, setshowpaymentform] = useState(false)
    const [billDate, setbillDate] = useState("")
    const [billAmount, setBillAmount] = useState("")
    const [billRemark, setBillRemark] = useState("")
    const [billStatus, setBillStatus] = useState("")
    const [refreshKey, setrefreshKey] = useState(0)
    const [forceRender, setForceRender] = useState(0);
    const [materialId, setmaterialId] = useState("")
    const [billNo, setBillNo] = useState("")
    const [materialEditFormShow, setmaterialEditFormShow] = useState(false)
    const [updateMaterialName, setupdateMaterialName] = useState("")
    const [UpdateMaterialType, setUpdateMaterialType] = useState("")
    const [updateMaterialQuantity, setupdateMaterialQuantity] = useState("")
    const [updateMaterialDate, setupdateMaterialDate] = useState("")
    const [updateMaterialPrice, setupdateMaterialPrice] = useState("")
    const [paymentId, setPaymentId] = useState("")
    const [showupdatePaymentForm, setshowupdatePaymentForm] = useState(false)
    const [updatepaymentDate, setupdatepaymentDate] = useState("")
    const [updatePaymentAmount, setupdatePaymentAmount] = useState("")
    const [updatePaymentstatus, setupdatePaymentstatus] = useState("")
    const [updatePaymentremark, setupdatePaymentremark] = useState("")
    const [paymentBillId, setpaymentBillId] = useState("")

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [quantity, setQuantity] = useState("");
    const [AddmaterialbillNo, setAddmaterialbillNo] = useState("")
    const [price, setPrice] = useState("");
    useEffect(() => {
        async function getAllBillNo() {
            try {
                const response = await axios.get(`${BASE_URL}/filteredMaterials`, {
                    params: { vendorId, projectId },
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                });
                setMaterials(response.data);
            } catch (error) {
                console.error("Error fetching materials:", error);
            }
        }
        if (vendorId && projectId) {
            getAllBillNo();
        }
    }, [vendorId, projectId, token, refreshKey]);


    async function onShowBill(billNo) {
        try {
            const response = await axios.get(`${BASE_URL}/SingleBill/${billNo}/${projectId}`, {

                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            console.log(response.data)
            setSelectedMaterial(response.data);
            setshowBill(true)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (billId) {
            onShowBill(billId);
        }
    }, [refreshKey, token, billId, forceRender]);

    function handleclickPaymentButton(id) {

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
            projectId: projectId
        }
        console.log(formData)
        try {
            const response = await axios.post(`${BASE_URL}/Material/${billId}/payments`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                alert("Payment added Successfully")
                setrefreshKey(refreshKey + 1)
                setshowpaymentform(false)
                setBillAmount("")
                setBillRemark("")
                setBillStatus("")
                setbillDate("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleDeletepayment(id) {
        const materailDelete = window.confirm("Are you sure to delete the Payment ?")
        if (!materailDelete) return
        try {
            const response = await axios.delete(`${BASE_URL}/VendorMeterialPayment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                alert("Payment deleted")
                setrefreshKey((prev) => prev + 1)
                setForceRender((prev) => prev + 1);
                setSelectedMaterial((prev) => ({
                    ...prev,
                    payment: prev.payment.filter((pay) => pay.id !== id)
                }))
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function handleEditmateril(id) {
        setmaterialId(id)
        setmaterialEditFormShow(true)
        try {
            const response = await axios.get(`${BASE_URL}/Material/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setBillNo(response.data.billNo)
            setupdateMaterialName(response.data.name)
            setUpdateMaterialType(response.data.type)
            setupdateMaterialQuantity(response.data.quantity)
            setupdateMaterialDate(response.data.addedOn)
            setupdateMaterialPrice(response.data.price)
        } catch (error) {
            console.log(error)
        }
    }

    async function handlematerialDelete(id) {
        const materialDetele = window.confirm("Are you sure to delete the material ?")
        if (!materialDetele) return
        try {
            const response = await axios.delete(`${BASE_URL}/DeleteVendorMeterial/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            if (response.status === 200) {
                setForceRender(forceRender + 1)
                setSelectedMaterial((prev) => ({
                    ...prev,
                    materials: prev.materials.filter((mat) => mat.id !== id)
                }));
            }
        } catch (error) {
            console.log(error)
        }

    }

    async function handleUpdatematerial(e) {
        e.preventDefault();

        const updatedMaterial = {
            id: materialId,
            name: updateMaterialName,
            type: UpdateMaterialType,
            quantity: updateMaterialQuantity,
            price: String(updateMaterialPrice || "").replace(/,/g, ""),

            billNo: billNo,
            addedOn: updateMaterialDate
        };
        try {
            const response = await axios.put(`${BASE_URL}/UpdateMaterial/${materialId}`, updatedMaterial, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 200) {
                alert("Material updated");

                setmaterialEditFormShow(false);

                setSelectedMaterial((prevData) => ({
                    ...prevData,
                    materials: prevData.materials.map((mat) =>
                        mat.id === materialId ? { ...mat, ...updatedMaterial } : mat
                    )
                }));


            }
        } catch (error) {
            console.error("Update failed:", error);
        }
    }

    async function handleEditpayment(id) {
        alert(id)
        setPaymentId(id)
        setshowupdatePaymentForm(true)
        try {
            const response = await axios.get(`${BASE_URL}/SingleMeteralPayment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setpaymentBillId(response.data.billNo)
            setupdatepaymentDate(response.data.payDate)
            setupdatePaymentAmount(response.data.amount)
            setupdatePaymentremark(response.data.remark)
            setupdatePaymentstatus(response.data.paymentStatus)
        } catch (error) {
            console.log(error)
        }

    }

    async function handleUpdatepayment(e) {
        e.preventDefault()
        const fordata = {
            vendorId,
            projectId,
            id: paymentId,
            payDate: updatepaymentDate,
            amount: String(updatePaymentAmount).replace(/,/g, ""),

            remark: updatePaymentremark,
            billNo: paymentBillId,
            paymentStatus: updatePaymentstatus
        }

        try {
            const response = await axios.put(`${BASE_URL}/Material/${paymentBillId}/payments/${paymentId}`, fordata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            if (response.status === 200) {
                alert("payment updated")
                setshowupdatePaymentForm(false)
                setrefreshKey((prev) => prev + 1);
                await onShowBill(paymentBillId);



            }
        } catch (error) {
            console.log(error)
        }

    }
    const handlePrint = () => {
        const buttons = document.querySelectorAll(".material_edit_button, .material_delete_button");
        const actionColumns = document.querySelectorAll(".action-column");
        buttons.forEach(button => button.style.display = "none");
        actionColumns.forEach(column => column.style.display = "none");
        const element = document.getElementById("billDetails");
        element.style.padding = "20px";
        html2pdf().from(element).save(`Bill_${selectedMaterial.billNo}.pdf`).then(() => {
            buttons.forEach(button => button.style.display = "inline-block");
            actionColumns.forEach(column => column.style.display = "table-cell");
            element.style.padding = "";
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = [{
            name,
            billNo: AddmaterialbillNo,
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
            setShowAddMaterial(false)
            setName("");
            setType("");
            setQuantity("");
            setPrice("");
            setAddmaterialbillNo("")
            setrefreshKey(refreshKey + 1)

        } catch (error) {
            console.log(error);
        }
    };

    async function handleDeleteBill(id) {
        const deleteBill = window.confirm("Are you sure to delete Bill ?")
        if (!deleteBill) return

        try {
            const response = await axios.delete(`${BASE_URL}/projects/${projectId}/${vendorId}/delete-bill/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            if (response.status === 200) {
                alert("Bill deleted")
                setrefreshKey(refreshKey + 1)
            }
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>

            <div className="Addmaterialbutton_wrapper">
                <button onClick={() => setShowAddMaterial(true)} > Add Material </button>

            </div>

            {
                showAddMaterial && (

                    <div className="addMeterialformwrapper">
                        <div className="hideAddmaterial_button">
                            <button onClick={() => setShowAddMaterial(!showAddMaterial)} className='crossMetetialform_btn'>X</button>
                        </div>
                        <form className="addMeterialform" onSubmit={handleSubmit}>
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
                                        value={AddmaterialbillNo}
                                        placeholder='Enter bill No'
                                        className="addMeterialinput"
                                        onChange={(e) => setAddmaterialbillNo(e.target.value)}
                                        required
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



            <div className="billNo_card_wrapper">
                {materials.length > 0 ? (
                    materials.map((material) => (
                        <div key={material.id} className="billNo_card">
                            <h3>Bill No: {material.billNo}</h3>
                            <button className="billNo_button" onClick={() => onShowBill(material.billNo)}>
                                View Bill
                            </button>
                            <button className="delete_bill_no" onClick={() => handleDeleteBill(material.billNo)}>  Delete Bill</button>
                        </div>
                    ))
                ) : (
                    <p className="no_materials">No materials found.</p>
                )}
            </div>

            {showBill && selectedMaterial && (
                <div className="bill_details_card">
                    <button className='add_payment_button_bill' onClick={() => handleclickPaymentButton(selectedMaterial.billNo)}> Add Payment</button>

                    <button className="bill_details_close_button" onClick={() => setshowBill(false)}>X</button>
                    <button className='add_print_button_bill' onClick={handlePrint}> Print</button>
                    <h2>Bill Details</h2>

                    <div id="billDetails">
                        <p><strong>Bill No:</strong> {selectedMaterial.billNo}</p>
                        <p><strong>Vendor Name:</strong> {selectedMaterial.vendor.name}</p>
                        <p><strong>Vendor Phone:</strong> {selectedMaterial.vendor.phoneno}</p>
                        <p><strong>Total Amount:</strong> ₹{selectedMaterial.total.toLocaleString()}</p>
                        <p><strong>Paid Amount:</strong> ₹{selectedMaterial.vendorPaidAmount.toLocaleString()}</p>
                        <p><strong>Remaining Amount:</strong> ₹{selectedMaterial.remainingAmount.toLocaleString()}</p>

                        {/* Materials Table */}
                        <h3>Materials</h3>
                        <table className="bill_details_material_table">
                            <thead>
                                <tr>

                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Quantity</th>
                                    <th> Date</th>
                                    <th>Price</th>
                                    <th className="action-column"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMaterial.materials.map((material) => (
                                    <tr key={material.id}>

                                        <td>{material.name}</td>
                                        <td>{material.type}</td>
                                        <td>{material.quantity}</td>
                                        <td>{new Date(material.addedOn).toLocaleDateString("en-GB")}</td>
                                        <td>₹{material.price.toLocaleString("")}</td>
                                        <td className="action-column">
                                            <button className="material_edit_button" onClick={() => handleEditmateril(material.id)}> Edit</button>
                                            <button className="material_delete_button" onClick={() => handlematerialDelete(material.id)} > Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {/* Payments Table */}
                        <h3>Payments</h3>
                        <table className="bill_details_payment_table">
                            <thead>
                                <tr>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Status</th>
                                    <th>Remark</th>
                                    <th className="action-column"> Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedMaterial.payment.map((pay, index) => (
                                    <tr key={index}>
                                        <td>{new Date(pay.expensePayDate).toLocaleDateString("en-GB")}</td>
                                        <td>₹{pay.expenseAmount.toLocaleString()}</td>
                                        <td>{pay.expensePayStatus}</td>
                                        <td>{pay.remark}</td>
                                        <td className="action-column">
                                            <button className="material_edit_button" onClick={() => handleEditpayment(pay.id)} > Edit</button>
                                            <button className="material_delete_button" onClick={() => handleDeletepayment(pay.id)}> Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {showpaymentform && (
                <div className="show_payment_form_container">
                    <form className='show_payment_form' onSubmit={handleAddpaymentTOBill} >
                        <button onClick={() => setshowpaymentform(false)} className='show_payment_form_close'>X</button>

                        <input type="date" className='show_payment_form_input' value={billDate || new Date().toISOString().split("T")[0]} onChange={(e) => setbillDate(e.target.value)} />
                        <input type="text" placeholder='Enter Amount' className='show_payment_form_input' value={billAmount} onChange={(e) => setBillAmount(e.target.value)} />
                        <select className='show_payment_form_select' value={billStatus} onChange={(e) => setBillStatus(e.target.value)}>
                            <option value="">Select Payment Method</option>
                            <option value="CASH">Cash</option>
                            <option value="CHECK">cheque</option>
                            <option value="UPI">UPI</option>
                            <option value="RTGS">RTGS</option>
                            <option value="NEFT">NEFT</option>
                        </select>
                        <input type="text" placeholder='Note' className='show_payment_form_input' value={billRemark} onChange={(e) => setBillRemark(e.target.value)} />
                        <button className='show_payment_form_submit_button'>Submit</button>
                    </form>
                </div>
            )}

            {

                materialEditFormShow && (
                    <>
                        <div className="updatematerialform_wrapper">
                            <form className="updatematerialform" onSubmit={handleUpdatematerial}>
                                <button onClick={() => setmaterialEditFormShow(false)} className="updatematerialform_close" > X</button>
                                <p className="updatematerialform_heading"> Edit material </p>
                                <input type="text" className="updatematerialform_input" value={updateMaterialName} onChange={(e) => setupdateMaterialName(e.target.value)} />
                                <input type="text" className="updatematerialform_input" value={UpdateMaterialType} onChange={(e) => setUpdateMaterialType(e.target.value)} />
                                <input type="text" className="updatematerialform_input" value={updateMaterialQuantity} onChange={(e) => setupdateMaterialQuantity(e.target.value)} />
                                <input type="date" className="updatematerialform_input" value={updateMaterialDate} onChange={(e) => setupdateMaterialDate(e.target.value)} />
                                <input type="text" className="updatematerialform_input" value={updateMaterialPrice} onChange={(e) => setupdateMaterialPrice(e.target.value)} />
                                <button className="updatematerialform_update_button" > Update</button>
                            </form>

                        </div>


                    </>
                )
            }

            {
                showupdatePaymentForm && (

                    <>
                        <div className="updatePaymentForm_wrapper">
                            <form className="updatePaymentForm" onSubmit={handleUpdatepayment}>
                                <button onClick={() => setshowupdatePaymentForm(false)} className="updatePaymentForm_close"> X</button>
                                <input type="date" value={updatepaymentDate} onChange={(e) => setupdatepaymentDate(e.target.value)} className="updatePaymentForm_input" />
                                <input type="text" value={updatePaymentAmount} onChange={(e) => setupdatePaymentAmount(e.target.value)} className="updatePaymentForm_input" />
                                <select value={updatePaymentstatus} onChange={(e) => setupdatePaymentstatus(e.target.value)} className="updatePaymentForm_select" >
                                    <option value="">Select Payment Method</option>
                                    <option value="CASH">Cash</option>
                                    <option value="CHECK">cheque</option>
                                    <option value="UPI">UPI</option>
                                    <option value="RTGS">RTGS</option>
                                    <option value="NEFT">NEFT</option>
                                </select>
                                <input type="text" placeholder="remark" value={updatePaymentremark} onChange={(e) => setupdatePaymentremark(e.target.value)} className="updatePaymentForm_input" />
                                <button className="updatePaymentForm_submit_button"> Update Payment</button>
                            </form>
                        </div>


                    </>
                )
            }
        </>
    );
}

export default SingleVendor;
