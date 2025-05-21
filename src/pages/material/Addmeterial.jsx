import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../material/Material.css"
import ReactPaginate from 'react-paginate';
import { BASE_URL } from '../../config';
import { useNavigate } from 'react-router-dom';
function Addmeterial() {
    const { id } = useParams();
    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
    console.log(token)
    const role = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.role;
    const [showMaterialInstallMentForm, setshowMaterialInstallMentForm] = useState(false)
    const [materialtable, setMaterialtable] = useState([]);
    const [refreshKey, setrefreshKey] = useState("")
    const [materialId, setmaterialId] = useState("")
    const [materialinstallmentdate, setmaterialinstallmentdate] = useState("")
    const [materialinstallmentamount, setmaterialinstallmentamount] = useState("")
    const [materialinstallmentSelect, setmaterialinstallmentSelect] = useState("")

    const [materialBillImg, setmaterialBillimg] = useState("")
    const [billId, setBillId] = useState("")
    const [showImg, setShowImg] = useState(false)
    const [displaymaterialcard, setdisplaymaterialcard] = useState(false)
    const [materialcardData, setmaterialcardData] = useState("")
    const [currentPage, setCurrentPage] = useState(0);
    const [searchVendor, setSearchVendor] = useState("")
    const itemsPerPage = 5;

    const [showVendorForm, setshowVendorForm] = useState(false)
    const [newVendor, setNewVendor] = useState("")
    const [newVendorPhoneNumber, setnewVendorPhoneNumber] = useState("")
    const [vendorList, setvendorList] = useState([])


    useEffect(() => {
        async function getExpense() {
            try {
                const response = await axios.get(`${BASE_URL}/${id}/expenses`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                });
                console.log(response.data);
                setMaterialtable(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getExpense();
    }, [id, token, refreshKey]);


    async function handleDeletematerial(id) {

        try {
            await axios.delete(`${BASE_URL}/deleteExpense/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                }
            });

            setMaterialtable((prev) => prev.filter((expense) => expense.id !== id));
            setrefreshKey((prev) => prev + 1);
            // window.location.reload(); 
        } catch (error) {
            console.log(error);
        }
    }

    function addmaterialInstallment(id) {
        setshowMaterialInstallMentForm(true)
        setmaterialId(id)
    }

    async function handleadmaterialinstallment(e) {
        e.preventDefault();

        const formdata = [{
            expensePayDate: materialinstallmentdate,
            expenseAmount: materialinstallmentamount,
            expensePayStatus: materialinstallmentSelect
        }]
        try {
            const response = await axios.post(`${BASE_URL}/${materialId}/expenseInstallment`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data)
            setrefreshKey(refreshKey + 1)
            alert("Material installment Added ")
            setmaterialinstallmentSelect("")
            setmaterialinstallmentamount("")
            setmaterialinstallmentdate("")
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(() => {
        async function getBillImg() {
            try {
                const response = await axios.get(`${BASE_URL}/ExpenseById/${billId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                console.log(response.data);
                setmaterialBillimg(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        getBillImg();

    }, [billId, token]);

    async function showmaterialcard(id) {
        setdisplaymaterialcard(true)
        try {
            const response = fetch(`${BASE_URL}/ExpenseById/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                }
            })
            const data = await (await response).json()
            console.log(data)
            setmaterialcardData(data)
        } catch (error) {
            console.log(error)
        }
    }


    const offset = currentPage * itemsPerPage;
    const currentItems = materialtable.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(materialtable.length / itemsPerPage);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };


    const searchFilter = materialtable.filter((item, index) => {
        return item.vendorName.toLowerCase().includes(searchVendor.toLowerCase())
    })



    async function handleAddvendor(e) {
        e.preventDefault()
        const formdata = {
            name: newVendor,
            phoneNo: newVendorPhoneNumber,
            projectId:id
        }
        console.log(formdata)
        try {
            const response = await axios.post(`${BASE_URL}/addVendor`, formdata, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "content-Type": "application/json"
                }
            })
            console.log(response.data)
            if (response.status === 200) {
                alert("vendor add successfullly")
                setNewVendor("")
                setnewVendorPhoneNumber("")
                setrefreshKey(refreshKey + 1)
                setshowVendorForm(false)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        async function getAllVendorList(id) {
            try {
                const response = await axios.get(`${BASE_URL}/vendor-byProjectId/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });

                console.log("API full response:", response.data);

                const list = Array.isArray(response.data)
                    ? response.data
                    : Array.isArray(response.data?.data)
                        ? response.data.data
                        : []; // Wrap the object in an array

                console.log("Parsed Vendor List:", list);
                setvendorList(list);
            } catch (error) {
                console.log("Error fetching vendor list:", error);
                setvendorList([]);
            }
        }

        if (id) {
            getAllVendorList(id);
        }
    }, [refreshKey, id, token]);

    function handlenavigateVendor(vendorId, name) {
        navigate(`/singleVendor/${id}/${vendorId}?name=${encodeURIComponent(name)}`);
    }


    return (
        <>

            <div className="Addmaterialbutton_wrapper">
                {
                    role === "Admin" && (
                        <button onClick={() => setshowVendorForm(!showVendorForm)}> Add Vendor</button>

                    )
                }
                <input type="search" value={searchVendor} onChange={(e) => setSearchVendor(e.target.value)}
                    className='search_vendor' placeholder='Enter vendor name' />

            </div>
            {/*   show vendor form */}

            {
                showVendorForm && (
                    <>
                        <div className="overlay"></div>
                        <div className="vendor_form_container">
                            <button onClick={() => setshowVendorForm(false)} className="close_vendor_form">X</button>
                            <form className="add_vendor_form" onSubmit={handleAddvendor}>
                                <input type="text" placeholder="Enter Vendor Name" value={newVendor} onChange={(e) => setNewVendor(e.target.value)} />
                                <input type="text" placeholder="Enter Vendor Number" value={newVendorPhoneNumber} onChange={(e) => setnewVendorPhoneNumber(e.target.value)} />
                                <button className="add_vendor_submit_button">Submit</button>
                            </form>
                        </div>
                    </>
                )
            }
            {vendorList.length > 0 && (
                <div style={{ textAlign: "center", color: " #015f65", margin: "20px 0", fontSize: "28px", fontWeight: "bold" }}>
                    <h1>{vendorList[0].project.name}</h1> {/* Display the project name of the first item */}
                </div>
            )}
            {/* vendor list */}
            <div className="vendor_table_container">


                <table className="vendor_list_table"  >
                    <thead>
                        <tr>
                            <th>Vendor Name</th>
                            <th>Vendor Number</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(vendorList) && vendorList.length > 0 ? (
                            vendorList.map((item, index) => (
                                <tr key={index}>
                                    <td onClick={() => handlenavigateVendor(item.id, item.name)} style={{ cursor: "pointer" }}>{item.name}</td>
                                    <td>{item.phoneNo}</td>
                                    <td><button onClick={() => handlenavigateVendor(item.id,item.name)} className='vendor_view'>View</button></td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ textAlign: "center" }}>No Vendors Available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            {/*   show add material installment */}
            {
                showMaterialInstallMentForm && (
                    <>
                        <div className="addmaterial_inatallment_form_wrapper">
                            <form className="addmaterial_inatallment_form" onSubmit={handleadmaterialinstallment}>
                                <button onClick={() => setshowMaterialInstallMentForm(false)} className="addmaterial_inatallment_form_closebutton"> X</button>

                                <input type="date" className="addmaterial_inatallment_form_input" value={materialinstallmentdate || new Date().toISOString().split("T")[0]} onChange={(e) => setmaterialinstallmentdate(e.target.value)} />
                                <input type="number" placeholder='Enter Amount' className="addmaterial_inatallment_form_input" value={materialinstallmentamount} onChange={(e) => setmaterialinstallmentamount(e.target.value)} />
                                <select className="addmaterial_inatallment_form_select" value={materialinstallmentSelect} onChange={(e) => setmaterialinstallmentSelect(e.target.value)}>
                                    <option value=""> Select Method</option>
                                    <option value="CASH">CASH</option>
                                    <option value="CHECK"> CHECK</option>
                                    <option value="UPI">UPI</option>
                                    <option value="RTGS">RTGS</option>
                                    <option value="NEFT">NEFT</option>
                                </select>
                                <button className="addmaterial_inatallment_form_submit_button"> Submit</button>
                            </form>
                        </div>

                    </>
                )
            }



            {/*   Material Card */}
            {
                displaymaterialcard && materialcardData && (
                    <>
                        <div className="material_card_main_wrapper">
                            <p onClick={() => setdisplaymaterialcard(false)} className='material_card_close_button'>X</p>
                            <p>Project Name: {materialcardData.project.name}</p>
                            <p>Project Status: {materialcardData.project.status}</p>
                            <p>Material Name: {materialcardData.name}</p>
                            <p>Material Type: {materialcardData.type}</p>
                            <p>Quantity: {materialcardData.quantity}</p>
                            <p>Price: {materialcardData.price}</p>
                            <p>Total Price: {materialcardData.totalPrice}</p>
                            <p>Remaining Amount: {materialcardData.reamingAmount}</p>
                            <p>Vendor Name: {materialcardData.vendorName}</p>
                            <p>Vendor Amount Paid: {materialcardData.vendorAmountPaid}</p>
                            <p>Added On: {materialcardData.addedOn}</p>
                            <h3 className='material_card_h3'>material Installments:</h3>
                            <table className="material_card_installment_table">
                                <thead>
                                    <tr>

                                        <th>Material Amount</th>
                                        <th>Material Pay Date</th>
                                        <th>Material Pay Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {materialcardData.expenseInstallments?.length > 0 ? (
                                        materialcardData.expenseInstallments.map((installment, index) => (
                                            <tr key={index}>

                                                <td>{installment.expenseAmount}</td>
                                                <td>{installment.expensePayDate}</td>
                                                <td>{installment.expensePayStatus || "N/A"}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: "center" }}>No Expense Installments Available</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>

                    </>
                )
            }


        </>
    );
}

export default Addmeterial;
