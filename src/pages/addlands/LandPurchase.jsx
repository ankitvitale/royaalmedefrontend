

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddLand.css"
import ReactPaginate from "react-paginate";
import userEvent from "@testing-library/user-event";
import { BASE_URL } from "../../config";
function LandPurchase() {
  const [getLand, setGetLand] = useState([]);
  const [showCard, setShowCard] = useState([]); // State for single land data
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [filter, setFilter] = useState([]);
  const [patnerpay, setpatnerPay] = useState(false);
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [addPatnerPay, setaddPatnerPay] = useState("");
  const [stateName, setStateName] = useState('');
  const [cityName, setCityName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [refreshKey, setrefreshkey] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [Showpatnertable, SetShowpatnertable] = useState(false)
  const [showSinglePatnerData, setshowSinglePatnerData] = useState(false)
  const [patnerData, setpatnerData] = useState({})
  const [patnerId, setPatnetId] = useState("")
  const [patnerPaymentForm, setpatnerPaymentForm] = useState(false)
  const [partnerName, setPartnerName] = useState("PARTNER");
  const [existingpaymentDate, setexistingpaymentDate] = useState("");
  const [existingamount, setexistingamount] = useState("");
  const [transactionMode, setTransactionMode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [note, setNote] = useState("")
  const [showAddpatnerForm, setshowAddpatnerForm] = useState(false)
  const [NewpatnerId, setNewpatnerId] = useState("")
  const [newPatnername, setnewPatnername] = useState("")
  const [newPatnerCity, setnewPatnerCity] = useState("")
  const [newPatnerPhoneNumber, setnewPatnerPhoneNumber] = useState("")
  const [ShowEditPatnerPayment, setShowEditPatnerPayment] = useState(false)
  const [patnerpaymentEditId, setpatnerpaymentEditId] = useState("")
  const [editpatnerpaymentName, seteditpatnerpaymentName] = useState("")
  const [editpatnerpaymentDate, setEditPatnerPaymentDate] = useState("");
  const [editpatnerpaymentAmount, setEditPatnerPaymentAmount] = useState("");
  const [editpatnerpaymentTransactionMode, setEditPatnerPaymentTransactionMode] = useState("");
  const [editpatnerpaymentMethod, setEditPatnerPaymentMethod] = useState("");
  const [editpatnerpaymentNote, setEditPatnerPaymentNote] = useState("");
  useEffect(() => {
    async function getAllLand() {
      try {
        const response = await axios.get(`${BASE_URL}/getAllland`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        let sortedData = response.data.sort((a, b) => b.id - a.id);


        console.log(sortedData);
        setGetLand(sortedData);
        setFilter(sortedData);
      } catch (error) {
        console.error("Error fetching land data:", error);
      }
    }

    getAllLand();
  }, [token, refreshKey]);


  async function handleDelete(id) {
    const isConfirmed = window.confirm("Are you sure you want to delete this land?");
    if (!isConfirmed) return;

    try {
      const response = await axios.delete(`${BASE_URL}/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Data deleted");
      setrefreshkey(refreshKey + 1);
      setGetLand((prevLands) => prevLands.filter((land) => land.id !== id));
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data. Please try again.");
    }
  }


  function handleEdit(id) {
    console.log(id);
    navigate(`/editland/${id}`);
  }

  async function handleShowAllData(id) {
    SetShowpatnertable(true)

    try {
      const resonse = await axios.get(`${BASE_URL}/land/${id}/partners`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(resonse.data)
      setShowCard(resonse.data);

    } catch (error) {
      console.log(error)
    }
  }



  useEffect(() => {
    const searchfilter = getLand.filter((item) => {
      return item.owner?.name.toLowerCase().includes(search.toLowerCase());
    });
    setFilter(searchfilter);
  }, [search, getLand]);

  function handlestartProject(id) {
    console.log(id);
    navigate(`/flat/${id}`);
  }

  function handleAddland() {
    navigate("/lands");
  }

  function handleAddPatnerpay(id) {
    setpatnerPay(true);
    setaddPatnerPay(id);
  }

  async function handlepaymentpantner(e) {
    e.preventDefault();

    const formdata = {
      name: stateName,
      city: cityName,
      phoneNumber: phoneNumber,
      amount,
      paymentDate: paymentDate || new Date().toISOString().split("T")[0],
    };
    try {
      const response = await axios.post(`${BASE_URL}/partnerpayment/${addPatnerPay}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      setrefreshkey(refreshKey + 1);
      alert("Partner payment added");
      setStateName("");
      setCityName("");
      setPhoneNumber("");
      setAmount("");
      setPaymentDate("");
    } catch (error) {
      console.log(error);
    }
  }
  const offset = currentPage * itemsPerPage;
  const currentItems = filter.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(filter.length / itemsPerPage);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };


  async function handlepatnerShowDetail(id) {
    setshowSinglePatnerData(true)
    try {
      const response = await axios.get(`${BASE_URL}/partner/${id}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
      setpatnerData(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (patnerData?.id) {
      handlepatnerShowDetail(patnerData.id);
    }
  }, [refreshKey]);

  function handleNewpaynemt(id) {
    setPatnetId(id)
    setpatnerPaymentForm(true)
  }


  async function handleExistingpaymentAdd(e) {
    e.preventDefault()
    const formData = {
      madeBy: partnerName,
      transactionDate: existingpaymentDate || new Date().toISOString().split("T")[0],
      transactionAmount: existingamount.replace(/,/g, ""),
      change: transactionMode,
      note: note,
      status: paymentMethod

    };
    try {
      const response = await axios.post(`${BASE_URL}/addpayment/partner/${patnerId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
      if (response.status === 201) {
        alert("patner payment add successfully")
        setpatnerPaymentForm(false)
        setexistingamount("")
        setexistingpaymentDate("")
        setTransactionMode("")
        setNote("")
        setPaymentMethod("")

      }
    } catch (error) {
      console.log(error)
    }
  }


  function handleAddPatner(id) {
    setNewpatnerId(id)
    setshowAddpatnerForm(true)
  }

  async function handleAddNewPatner(e) {
    e.preventDefault()
    const formdata = {
      name: newPatnername,
      city: newPatnerCity,
      phoneNumber: newPatnerPhoneNumber
    }
    try {
      const response = await axios.post(`${BASE_URL}/${NewpatnerId}/partners`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      console.log(response.data)
      if (response.status === 200) {
        alert("patner add successfully")
        setrefreshkey(refreshKey + 1)
        setshowAddpatnerForm(false)
        setnewPatnerCity("")
        setnewPatnerPhoneNumber("")
        setnewPatnername("")
      }
    } catch (error) {
      console.log(error)
    }

  }


  async function handledeletePatnerpayment(id) {
    const deletepatnerPayment = window.confirm("Are you sure to delete ?")
    if (!deletepatnerPayment) return

    try {
      const response = await axios.delete(`${BASE_URL}/partner/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        alert("patner Payment deleted")
        setrefreshkey((prev) => prev + 1)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async function handleEditPatnerPayment(id) {
    setpatnerpaymentEditId(id)
    setShowEditPatnerPayment(true)
    try {
      const response = await axios.get(`${BASE_URL}/SinglePartnerPaymentById/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      seteditpatnerpaymentName(response.data.madeBy)
      setEditPatnerPaymentAmount(response.data.transactionAmount)
      setEditPatnerPaymentDate(response.data.transactionDate)
      setEditPatnerPaymentMethod(response.data.status)
      setEditPatnerPaymentTransactionMode(response.data.change)
      setEditPatnerPaymentNote(response.data.note)
    } catch (error) {
      console.log(error)
    }
  }

  async function handlesubmitEditPatnerPayment(e) {
    e.preventDefault()
    const formdata = {
      transactionDate: editpatnerpaymentDate,
      transactionAmount: editpatnerpaymentAmount,
      note: editpatnerpaymentNote,
      change: editpatnerpaymentTransactionMode,
      madeBy: editpatnerpaymentName,
      status: editpatnerpaymentMethod
    }

    try {
      const response = await axios.put(`${BASE_URL}/UpdatePartner/payment/${patnerpaymentEditId}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      if (response.status === 200) {
        alert("patner payment edit successfully")
        setShowEditPatnerPayment(false)
        setrefreshkey((prev) => prev + 1)
      }
    } catch (error) {
      console.log(error)
    }

  }
  return (
    <>

      <h1 style={{ textAlign: "center", marginTop: "50px" }}>Land Purchase Details</h1>
      <div className="add_land_search">
        <input type="search" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search ...." />
        <button onClick={handleAddland}> Add land</button>
      </div>

      <div className="landshow_table_wrapper">
        {filter.length > 0 ? (
          <>
            <table className="land_show_table">
              <thead className="land_show_table_thead">
                <tr className="land_show_table_tr">
                  <th colSpan={1}>Owner Details</th>
                  <th colSpan={1}>Royaalmede</th>
                  <th colSpan={1}>Partners</th>
                  <th colSpan={1}>Address Details</th>
                  <th colSpan={1}>Total Amount</th>
                  <th colSpan={1}>Token Amount</th>
                  <th colSpan={1}>Agreement Amount</th>
                  <th colSpan={1}>Remaining Amount</th>
                  <th> Add Patner</th>
                  <th colSpan={2}>Action</th>
                  {/* <th colSpan={1}>Partners Payment</th> */}
                </tr>
              </thead>
              <tbody className="land_show_table_tbody">
                {currentItems.map((land, index) => (
                  <tr key={index}>
                    <td data-label="Owner Details">{land?.owner?.name || "N/A"}</td>
                    <td>{land?.purchaser?.name || "N/A"}</td>
                    <td colSpan={1}>
                      <ul>
                        {land?.partners?.map((partner) => (
                          <li key={partner.id}>
                            {partner?.name || "No Patner"}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td>
                      {land?.address?.city}, {land?.address?.state || "N/A"}
                    </td>
                    <td>{land?.totalAmount ? land.totalAmount.toLocaleString() : "N/A"}</td>
                    <td>{land?.tokenAmount ? land.tokenAmount.toLocaleString() : "N/A"}</td>
                    <td>{land?.agreementAmount ? land.agreementAmount.toLocaleString() : "N/A"}</td>
                    <td>
                      {land?.totalAmount && land?.agreementAmount && land?.tokenAmount
                        ? Math.max(0, land.totalAmount - (land.agreementAmount + land.tokenAmount)).toLocaleString()
                        : "N/A"}
                    </td>
                    <td><button onClick={() => handleAddPatner(land.id)} className="land_show_edit_button"> Add Patner</button></td>
                    <td>
                      <button
                        onClick={() => handleEdit(land.id)}
                        className="land_show_edit_button"
                      >
                        Edit
                      </button>
                    </td>
                    <td className="mixed_button_add_land">
                      <button
                        onClick={() => handleDelete(land.id)}
                        className="land_show_delete_button"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleShowAllData(land.id)}
                        className="land_show_showCard_button"
                      >
                        Show
                      </button>
                      {land?.project === null && (
                        <button
                          onClick={() => handlestartProject(land.id)}
                          className="land_show_start_button"
                        >
                          Start
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <ReactPaginate
              pageCount={pageCount}
              pageRangeDisplayed={5}
              marginPagesDisplayed={2}
              onPageChange={handlePageClick}
              containerClassName="pagination"
              activeClassName="active"
              breakLabel="..."
              previousLabel={null}
              nextLabel={null}
            />
          </>
        ) : (
          <p>No data available</p>
        )}
      </div>
      {
        Showpatnertable && (
          <>

            <div className="patner_table_main_wrapper">
              <button onClick={() => SetShowpatnertable(false)} className="patner_table_close_button"> X</button>
              <h3> Patner Details</h3>
              <table className="patner_table">
                <thead className="patner_table_thead">
                  <tr className="patner_table_tr">
                    <th>Sr.No</th>
                    <th>Partner Name</th>
                    <th>City</th>
                    <th>Phone Number</th>
                    <th> Action</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="patner_table_tbody">
                  {showCard.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.city}</td>
                      <td>{item.phoneNumber}</td>
                      <td> <button onClick={() => handlepatnerShowDetail(item.id)} className="patner_table_view_button">View </button>  </td>
                      <td> <button className="patner_table_view_button" onClick={() => handleNewpaynemt(item.id)}> Add Payment</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )
      }


      {/*  single patner card */}

      {
        showSinglePatnerData && patnerData && (
          <>

            <div className="single_patner_card_main_wrapper">

              <button onClick={() => setshowSinglePatnerData(false)} className="single_patner_cardclose_button">X</button>
              <p> patner Name : {patnerData.name}</p>
              <p> patner City : {patnerData.city}</p>
              {/* <p>Partner Payment Date: {new Date(patnerData.paymentDate + "T00:00:00").toLocaleDateString("en-GB")}</p> */}

              <p>Patner Number : {patnerData.phoneNumber}</p>
              <p> Total Amount : {patnerData.total}</p>
              <h2> Transition table</h2>
              <div className="singl_patner_table_wrapper">
                <table className="singl_patner_table">
                  <thead className="singl_patner_table_thead" >
                    <tr>
                      <th>Partner</th>
                      <th>Transaction</th>
                      <th>Status</th>
                      <th>Transaction Amount</th>
                      <th>Transaction Date</th>
                      <th>Note</th>
                      <th> Action</th>
                    </tr>
                  </thead>
                  <tbody className="singl_patner_table_tbody" >
                    {patnerData.landTransactions &&
                      patnerData.landTransactions.map((item, index) => (
                        <tr key={index}>
                          <td>{item.madeBy}</td>
                          <td>{item.change}</td>
                          <td>{item.status}</td>
                          <td>{item.transactionAmount ? item.transactionAmount.toLocaleString() : "N/A"}</td>
                          <td>{new Date(item.transactionDate).toLocaleDateString("en-GB")}</td>
                          <td>{item.note}</td>
                          <td>
                            <button onClick={() => handleEditPatnerPayment(item.id)} className="handleEditPatnerPayment">Edit</button>
                            <button onClick={() => handledeletePatnerpayment(item.id)} className="handledeletePatnerpayment">Delete</button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

            </div>

          </>
        )
      }

      {/*existing  patner payment form  */}

      {patnerPaymentForm && (
        <>
          <div className="overlay" onClick={() => setpatnerPaymentForm(false)}></div>
          <div className="existing_patner_form_wrapper">
            <button onClick={() => setpatnerPaymentForm(false)} className="close_existing_patner_form">X</button>
            <form className="existing_patner_form" onSubmit={handleExistingpaymentAdd}>
              <input
                type="text"
                placeholder="Partner Name"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                required
                disabled
              />
              <input
                type="date"
                value={existingpaymentDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setexistingpaymentDate(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Amount"
                value={existingamount}
                onChange={(e) => setexistingamount(e.target.value)}
                required
              />
              <select value={transactionMode} onChange={(e) => setTransactionMode(e.target.value)} required>
                <option value="">Transaction Mode</option>
                <option value="DEBIT">DEBIT</option>
                <option value="CREDIT">CREDIT</option>
              </select>
              <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} required>
                <option value="">Select Payment Method</option>
                <option value="UPI">UPI</option>
                <option value="CASH">CASH</option>
                <option value="CHEQUE">CHEQUE</option>
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
              </select>
              <input type="text" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
              <button className="existing_patner_form_submit_button">Submit</button>
            </form>
          </div>
        </>
      )}

      {/*  Add new Partners Payment Form */}
      {patnerpay && (
        <div className="add_patner_payment_form_wrapper">
          <div className="close_patner_payment_form">

            <p onClick={() => setpatnerPay(false)}>X</p>
          </div>
          <form onSubmit={handlepaymentpantner} className="add_patner_payment_form">
            <input type="text" placeholder="Enter partner name" value={stateName} onChange={(e) => setStateName(e.target.value)} className="add_patner_payment_form_input" />
            <input type="text" placeholder="Enter city name" value={cityName} onChange={(e) => setCityName(e.target.value)} className="add_patner_payment_form_input" />
            <input type="number" placeholder="Enter phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="add_patner_payment_form_input" />
            <input type="number" placeholder="Enter amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="add_patner_payment_form_input" />
            <input type="date" placeholder="Enter payment date" value={paymentDate || new Date().toISOString().split("T")[0]} onChange={(e) => setPaymentDate(e.target.value)} className="add_patner_payment_form_input" />
            <button className="add_patner_payment_form_submit_button">Submit</button>
          </form>
        </div>
      )}




      {
        showAddpatnerForm && (
          <>

            <form action="" className="add_patner_form" onSubmit={handleAddNewPatner}>
              <button onClick={() => setshowAddpatnerForm(false)} className="close_showAddpatnerForm">X</button>
              <input type="text" placeholder="Enter Patner Name" className="add_patner_form_input" value={newPatnername} onChange={(e) => setnewPatnername(e.target.value)} />
              <input type="text" placeholder="Enter Patner City Name" className="add_patner_form_input" value={newPatnerCity} onChange={(e) => setnewPatnerCity(e.target.value)} />
              <input type="text" placeholder="Enter patner Phone Number" className="add_patner_form_input" value={newPatnerPhoneNumber} onChange={(e) => setnewPatnerPhoneNumber(e.target.value)} />
              <button className="add_patner_form_submit" > Submit</button>
            </form>
          </>
        )
      }

      {
        ShowEditPatnerPayment && (
          <div className="editpatnerpayment-overlay">
            <div className="editpatnerpayment-content">
              <form className="editpatnerpayment-form" onSubmit={handlesubmitEditPatnerPayment}>
                <button className="editpatnerpayment-close" onClick={() => setShowEditPatnerPayment(false)}>×</button>

                <h2>Edit Partner Payment</h2>
                <input
                  type="text"
                  value={editpatnerpaymentName}
                  onChange={(e) => seteditpatnerpaymentName(e.target.value)}
                  required
                  className="editpatnerpayment-input"
                  readOnly
                />
                <input
                  type="date"
                  value={editpatnerpaymentDate}
                  onChange={(e) => setEditPatnerPaymentDate(e.target.value)}
                  required
                  className="editpatnerpayment-input"
                />

                <input
                  type="text"
                  placeholder="Amount"
                  value={editpatnerpaymentAmount}
                  onChange={(e) => setEditPatnerPaymentAmount(e.target.value)}
                  required
                  className="editpatnerpayment-input"
                />

                <select
                  value={editpatnerpaymentTransactionMode}
                  onChange={(e) => setEditPatnerPaymentTransactionMode(e.target.value)}
                  required
                  className="editpatnerpayment-select"
                >
                  <option value="">Transaction Mode</option>
                  <option value="CREDIT">CREDIT</option>
                  <option value="DEBIT">DEBIT</option>
                </select>

                <select
                  value={editpatnerpaymentMethod}
                  onChange={(e) => setEditPatnerPaymentMethod(e.target.value)}
                  required
                  className="editpatnerpayment-select"
                >
                  <option value="">Select Payment Method</option>
                  <option value="UPI">UPI</option>
                  <option value="CASH">CASH</option>
                  <option value="CHEQUE">CHEQUE</option>
                  <option value="RTGS">RTGS</option>
                  <option value="NEFT">NEFT</option>
                </select>

                <input
                  type="text"
                  placeholder="Note"
                  value={editpatnerpaymentNote}
                  onChange={(e) => setEditPatnerPaymentNote(e.target.value)}
                  className="editpatnerpayment-input"
                />

                <button type="submit" className="editpatnerpayment-button">Update</button>
              </form>
            </div>
          </div>
        )
      }


    </>
  );




}

export default LandPurchase;
