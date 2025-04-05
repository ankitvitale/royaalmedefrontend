import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import infraLogo from "../../assets/Royalmedeinfra Logo.svg"
import { useRef } from 'react';
import html2pdf from "html2pdf.js/dist/html2pdf";

import { BsBuilding, BsFillLightningChargeFill } from 'react-icons/bs';
import { FaBook, FaCalendarAlt, FaEnvelope, FaGitSquare, FaHandshake, FaIdBadge, FaIdCard, FaSortAmountUp, FaUser } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa6';
import { MdOutlineAttachMoney } from 'react-icons/md';
import { RiFilePaper2Fill } from 'react-icons/ri';
import { GiGavel, GiJusticeStar } from 'react-icons/gi';
import { AiOutlineFileProtect } from 'react-icons/ai';
import { FaBuilding } from "react-icons/fa";
import { LuFileType } from "react-icons/lu";
import { SiFlathub } from "react-icons/si";
import { MdConfirmationNumber } from "react-icons/md";
import { RiNumbersFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { GrStatusUnknown } from "react-icons/gr";
import { CiBank } from "react-icons/ci";
import { FaSortAmountUpAlt } from "react-icons/fa";
import { SiAnswer } from "react-icons/si";
import { BASE_URL } from '../../config';
function Flatowner() {
  const letterref = useRef()
  const { id } = useParams();
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;
  const [customerDetail, setCustomerDetail] = useState(null);
  const [bankName, setbankName] = useState("")
  const [LoanAmount, setLoanAmount] = useState("")
  const [customerid, setCustomerId] = useState("")
  const [refreshKey, setRefreshKey] = useState(0);
  const [showBankDetailForm, setshowBankDetailForm] = useState(false)
  const [showInstallmentForm, setShowInstallmentForm] = useState(false)
  const [installmentData, setInstallmentDate] = useState("")
  const [installmentAmount, setInstallMentAmount] = useState("")
  const [selectinstallmentType, setselectinstallmentType] = useState("")
  const [showCustomerInstallMentcard, setshowCustomerInstallMentcard] = useState(false)
  const [customerInstallMentDeta, setcustomerInstallMentDeta] = useState("")
  const [customerSlip, setcustomerSlip] = useState(false)
  const [note, setNote] = useState("")
  const [showCustomerInstallmentEditForm, setshowCustomerInstallmentEditForm] = useState(false)
  const [installmentId, setinstallmentId] = useState("")
  const [InstallmentEditFormDate, setInstallmentEditFormDate] = useState("");
  const [InstallmentEditFormAmount, setInstallmentEditFormAmount] = useState("");
  const [InstallmentEditFormPaymentMethod, setInstallmentEditFormPaymentMethod] = useState("");
  const [InstallmentEditFormRemark, setInstallmentEditFormRemark] = useState("");
  useEffect(() => {
    async function customerProfile() {
      try {
        const response = await axios.get(`${BASE_URL}/booking/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setCustomerId(response?.data?.customer?.id)
        setCustomerDetail(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    customerProfile();
  }, [id, token, refreshKey]);

  async function handleSubmitloan(e) {
    e.preventDefault()

    const formdata = {
      bankName: bankName,
      loanAmount: LoanAmount.replace(/,/g, "")
    }
    try {
      const response = await axios.post(`${BASE_URL}/addLoanDetails/${customerid}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        setRefreshKey((prev) => prev + 1);
        setshowBankDetailForm(false)
        setbankName("")
        setLoanAmount("")
      }

    } catch (error) {
      console.log(error)
    }

  }


  async function handleCancleBooking() {
    const cancleBooking = window.confirm("Do you want to cancle the booking ?")
    if (!cancleBooking) return
    try {
      const response = await axios.put(`${BASE_URL}/cancelBooking/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      alert("booking Delete Successfully")
    } catch (error) {
      console.log(error)
    }
  }
  const showAlert = () => {
    Swal.fire({
      title: 'thank You',
      text: 'Bank Details Added Successfully...!',
      icon: 'success',
      confirmButtonText: 'Okay',
    });
  };

  async function handleAddflatinstallment(e) {
    e.preventDefault()
    const formdata = [{
      installmentDate: installmentData || new Date().toISOString().split("T")[0],
      installmentAmount: installmentAmount.replace(/,/g, ""),
      installmentStatus: selectinstallmentType,
      remark: note
    }]
    try {
      const response = await axios.post(`${BASE_URL}/${id}/addInstallment`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      alert("payment Added")
      setShowInstallmentForm(false)
      setInstallmentDate("")
      setInstallMentAmount("")
      setselectinstallmentType("")
      setNote("")
      setRefreshKey(refreshKey + 1)

    } catch (error) {
      console.log(error)
    }

  }

  async function handleShowInstallment() {
    setshowCustomerInstallMentcard(true)
    try {
      const response = await axios.get(`${BASE_URL}/BookingSummary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
      setcustomerInstallMentDeta(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  // useEffect(() => {
  //   handleShowInstallment()
  // }, [refreshKey,token])

  const handleDownload = () => {
    const element = letterref.current;
    const options = {
      margin: 0.5,
      filename: "Final Booking Slip.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(options).from(element).save();
  };


  async function handleEditInstallment(installmentId) {
    setinstallmentId(installmentId)
    setshowCustomerInstallmentEditForm(true)

    try {
      const response = await axios.get(`${BASE_URL}/getBookingInstallmentById/${installmentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      console.log(response.data)
      setInstallmentEditFormAmount(response.data.installmentAmount)
      setInstallmentEditFormDate(response.data.installmentDate)
      setInstallmentEditFormPaymentMethod(response.data.installmentStatus)
      setInstallmentEditFormRemark(response.data.remark)
    } catch (error) {
      console.log(error)
    }

  }


  const handleSubmit = async (e) => {
    e.preventDefault();

    const formdata = {
      installmentDate: InstallmentEditFormDate,
      installmentAmount: String(InstallmentEditFormAmount)?.replace(/,/g, ""),
      remark: InstallmentEditFormRemark,
      installmentStatus: InstallmentEditFormPaymentMethod
    }

    try {
      const response = await axios.put(`${BASE_URL}/updateBookingInstallment/${installmentId}`, formdata, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        alert("installment updated")
        handleShowInstallment(); 
        setshowCustomerInstallmentEditForm(false)
        setInstallmentEditFormDate("")
        setInstallmentEditFormAmount("")
        setInstallmentEditFormRemark("")
        setInstallmentEditFormPaymentMethod("")
      }
    } catch (error) {
      console.log(error)
    }
  };

  async function handleDeleteInstallment(id) {

    const deleteInstallment = window.confirm("Do you want to delete the Installment ?")
    if (!deleteInstallment) return
    try {
      const response = await axios.delete(`${BASE_URL}/deleteBookingInstallment/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      })
      if (response.status === 200) {
        alert("Installment deleted")
        setRefreshKey(refreshKey + 1)
        setcustomerInstallMentDeta((prev) => ({
          ...prev,
          bookingInstallments: prev.bookingInstallments.filter(installment => installment.id !== id)
        }));
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handlePrintInstallment = () => {
    const element = document.getElementById("customerInstallmentCard").cloneNode(true);
    element.querySelectorAll(".installment_edit_button, .installment_delete_button, .action-column").forEach(btn => btn.remove());
    element.style.padding = "20px";
    html2pdf().from(element).save(`Customer_Installment_${customerInstallMentDeta.identifier}.pdf`);
  };

  return (
    <>
      <h2 style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }} >Flatowner Details</h2>

      <div className="flat_owener_multi_button_wrapper">
        <button className='CustomerSlip' onClick={() => setcustomerSlip(!customerSlip)}> Customer Slip</button>

        <button className='AddBankAccount' onClick={() => setshowBankDetailForm(true)}> Add Bank Account</button>
        <button className='AddFlatInstallment' onClick={() => setShowInstallmentForm(true)}  > Add Flat Installment</button>

        <button className='CancleBooking' onClick={handleCancleBooking}> Cancle Booking</button>


        <button className='ShowCustomerInstallment' onClick={handleShowInstallment}> Show Customer installment</button>
      </div>


      {customerDetail ? (
        <div className='customer_data_card_wrapper'>

          <div className="customer_card_flat_no">
            <p><strong> <BsBuilding /> Flat No  - </strong> {customerDetail.residency?.identifier || "NA"}</p>
          </div>

          <div className="customer_card_name_wrapper">
            <p> <b style={{ color: "#00a4b3", fontSize: "25px" }}>  {customerDetail.customer?.name || "NA"} </b></p>
            <p> <b>{customerDetail.customer?.phoneNumber || "NA"}  </b></p>
          </div>

          <div className="customer_flat_owner_conatiner">
            <div className="customer_data_container">
              <h3 style={{ color: "#00a4b3" }}> <FaUser /> Customer Information</h3>
              <p><strong><FaEnvelope /> </strong> <b>Email:</b> {customerDetail.customer?.email || "NA"}</p>
              <p><strong><FaIdCard /> </strong> <b>PAN Card:</b> {customerDetail.customer?.panCard || "NA"}</p>
              <p><strong><FaIdBadge /> </strong> <b>Aadhar Number:</b> {customerDetail.customer?.aadharNumber || "NA"}</p>
              <p><strong><FaAddressCard /></strong> <b>Address:</b> {customerDetail.customer?.address || "NA"}</p>
              <p><strong><FaHandshake /></strong> <b>Agent Name:</b> {customerDetail.customer?.agentName || "NA"}</p>
              <p><strong><MdOutlineAttachMoney /></strong> <b>Brokerage:</b> {customerDetail.customer?.brokerage?.toLocaleString() || "NA"}</p>
            </div>
            <div className="customer_data_container">
              <h3 style={{ color: "#00a4b3" }}> Customer Residency </h3>
              <p><strong><FaBuilding /></strong> <b>Residency Name:</b> {customerDetail.residency?.name || "NA"}</p>
              <p><strong><LuFileType /></strong> <b>Flat Type:</b> {customerDetail.residency?.flatType || "NA"}</p>
              <p><strong><SiFlathub /></strong> <b>Residency Type:</b> {customerDetail.residency?.residencyType || "NA"}</p>
              <p><strong><MdConfirmationNumber /></strong> <b>Floor Number:</b> {customerDetail.residency?.floorNumber || "NA"}</p>
              <p><strong><RiNumbersFill /></strong> <b>Flat No:</b> {customerDetail.residency?.identifier || "NA"}</p>
              <p><strong><RiMoneyDollarCircleFill /></strong> <b>Actual Price:</b> {customerDetail.residency?.price?.toLocaleString() || "NA"}</p>
              <p><strong><GrStatusUnknown /></strong> <b>Availability Status:</b> {customerDetail.residency?.availabilityStatus || "NA"}</p>
            </div>
            <div className="customer_data_container">
              <h3 style={{ color: "#00a4b3" }}> <RiFilePaper2Fill /> Deal Information</h3>
              <p><strong><FaCalendarAlt /></strong> <b>Booked On:</b> {customerDetail.bookedOn || "NA"}</p>
              <p><strong><FaBook /></strong><b>Booking Status:</b> {customerDetail.bookingStatus || "NA"}</p>
              <p><strong><FaSortAmountUp /></strong> <b>GST Amount:</b> {customerDetail.gstAmount?.toLocaleString() || "NA"}</p>
              <p><strong><MdOutlineAttachMoney /></strong> <b>Deal Price:</b> {customerDetail.dealPrice?.toLocaleString() || "NA"}</p>
              <p><strong><MdOutlineAttachMoney /></strong> <b>Token Amount:</b> {customerDetail.tokenAmount?.toLocaleString() || "NA"}</p>
              <p><strong><RiFilePaper2Fill /></strong> <b>Agreement Amount:</b> {customerDetail.agreementAmount?.toLocaleString() || "NA"}</p>
              <p><strong><GiJusticeStar /></strong> <b>Stamp Duty Amount:</b> {customerDetail.stampDutyAmount?.toLocaleString() || "NA"}</p>
              <p><strong><AiOutlineFileProtect /></strong> <b>Registration Amount:</b> {customerDetail.registrationAmount?.toLocaleString() || "NA"}</p>
              <p><strong><BsFillLightningChargeFill /></strong> <b>Electric/Water Amount:</b> {customerDetail.electricWaterAmmount?.toLocaleString() || "NA"}</p>
              <p><strong><GiGavel /></strong> <b>Legal Charges:</b> {customerDetail.legalChargesAmmout?.toLocaleString() || "NA"}</p>
              <p><strong><SiAnswer /></strong> <b>Loan:</b> {customerDetail.customer?.loan || "NA"}</p>
              <p><strong><FaSortAmountUpAlt /></strong> <b>Loan Amount:</b> {customerDetail.customer?.loanAmount?.toLocaleString() || "N/A"}</p>
              <p><strong><CiBank /></strong> <b>Bank Name:</b> {customerDetail.customer?.bankName || "N/A"}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading details...</p>
      )}


      {/* bank details form start */}
      {
        showBankDetailForm && (
          <div className="customer_bank_details_form_wrapper">
            <button onClick={() => setshowBankDetailForm(false)} className='customer_bank_detail_form_close'> X</button>
            <form className='customer_bank_name' onSubmit={handleSubmitloan}>
              <label htmlFor=""> Bank name</label>
              <input type="text" value={bankName} onChange={(e) => setbankName(e.target.value)} />
              <label htmlFor=""> Loan Amount</label>
              <input type="text" value={LoanAmount} onChange={(e) => setLoanAmount(e.target.value)} />
              <div className="bank_detail_submit_button">
                <button onClick={showAlert}> Submit</button>
              </div>
            </form>
          </div>

        )
      }

      {/* bank details form end */}

      {/* Add customet installment Form */}
      {
        showInstallmentForm && (
          <div className='customer_installment_form_wrapper'>
            <button onClick={() => setShowInstallmentForm(false)} className='customer_installment_form_close_button'> X</button>
            <form action="" onSubmit={handleAddflatinstallment} className='customet_installment_form'>
              <input type="date" placeholder='Enter Installment Date' value={installmentData || new Date().toISOString().split("T")[0]} onChange={(e) => setInstallmentDate(e.target.value)} className='customer_installment_form_input' />
              <input type="text" placeholder='Enter Installment Amount' value={installmentAmount} onChange={(e) => setInstallMentAmount(e.target.value)} className='customer_installment_form_input' />
              <select value={selectinstallmentType} onChange={(e) => setselectinstallmentType(e.target.value)} className='customer_installment_form_select'>
                <option value=""> Select Payment Method</option>
                <option value="CASH">Cash</option>
                <option value="CHECK">Check</option>
                <option value="UPI">UPI</option>
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
              </select>
              <input type="text" placeholder='Note ...' value={note} onChange={(e) => setNote(e.target.value)} />
              <button className='customer_installment_form_submit_button'>Submit</button>
            </form>

          </div>
        )
      }
      {/* End customet installment Form */}



      {/*   show Customer installment Card */}
      {
        showCustomerInstallMentcard && customerInstallMentDeta && (
          <div className='customer_installment_card_wrapper'>
            <button className='add_print_button_bill' onClick={handlePrintInstallment}> Print </button>
            <button onClick={() => setshowCustomerInstallMentcard(false)} className='customer_installment_card_close_button'> X</button>
            <div id="customerInstallmentCard">
              <p> Residency Name : {customerInstallMentDeta.residencyName}</p>
              <p> Customer name : {customerInstallMentDeta?.customerName}</p>
              <p> Plot No : {customerInstallMentDeta.identifier}</p>
              <p>  Flat Price : {customerInstallMentDeta.dealPrice ? customerInstallMentDeta.dealPrice.toLocaleString() : "N/A"}</p>
              <p> Token Amount : {customerInstallMentDeta.tokenAmount.toLocaleString()}</p>
              <p> Agreement price: {customerInstallMentDeta.agreementAmount.toLocaleString()}</p>
              <p> Customer Remaining Amount : {customerInstallMentDeta.remainingAmount.toLocaleString()}</p>
              <p> {customerInstallMentDeta.bookingInstallments.map((item, index) => {
                return <>
                  <table className='customer_installment_card_table' key={item.id}>
                    <tr className='customer_installment_card_tr'>
                      <th className='customer_installment_card_th'> Installment Date </th>
                      <th className='customer_installment_card_th'> Installment Amount</th>
                      <th className='customer_installment_card_th'> Installment Status</th>
                      <th className='customer_installment_card_th'> Note</th>
                      <th className='customer_installment_card_th action-column' > Action</th>
                    </tr>
                    <tr className='customer_installment_card_tr'>
                      <td className='customer_installment_card_td'>{new Date(item.installmentDate).toLocaleDateString("en-GB")}  </td>
                      <td className='customer_installment_card_td'>{item.installmentAmount.toLocaleString()} </td>
                      <td className='customer_installment_card_td'>
                        {item.installmentStatus}

                      </td>
                      <td className='customer_installment_card_td'>{item.remark} </td>
                      <td>
                        <button className='installment_edit_button' onClick={() => handleEditInstallment(item.id)}> Edit</button> <br />
                        <button className='installment_delete_button' onClick={() => handleDeleteInstallment(item.id)}> Delete</button>
                      </td>

                    </tr>
                  </table>

                </>
              })}</p>
            </div>
          </div>
        )
      }


      {
        showCustomerInstallmentEditForm && (
          <>
            <p className='showCustomerInstallmentEditForm_heading'> Edit InstallMent</p>
            <form className="showCustomerInstallmentEditForm_form" onSubmit={handleSubmit}>
              <button
                type="button"
                onClick={() => setshowCustomerInstallmentEditForm(false)}
                className="showCustomerInstallmentEditForm_close_button"
              >
                X
              </button>
              <input
                type="date"
                value={InstallmentEditFormDate || new Date().toISOString().split("T")[0]}
                onChange={(e) => setInstallmentEditFormDate(e.target.value)}
                className="showCustomerInstallmentEditForm_input"
              />
              <input
                type="text"
                placeholder="Installment Amount"
                value={InstallmentEditFormAmount}
                onChange={(e) => setInstallmentEditFormAmount(e.target.value)}
                className="showCustomerInstallmentEditForm_input"
              />
              <select
                value={InstallmentEditFormPaymentMethod}
                onChange={(e) => setInstallmentEditFormPaymentMethod(e.target.value)}
                className="showCustomerInstallmentEditForm_select"
              >
                <option value="">Select Payment Method</option>
                <option value="CASH">Cash</option>
                <option value="CHECK">Check</option>
                <option value="UPI">UPI</option>
                <option value="RTGS">RTGS</option>
                <option value="NEFT">NEFT</option>
              </select>
              <input
                type="text"
                placeholder="Remark"
                value={InstallmentEditFormRemark}
                onChange={(e) => setInstallmentEditFormRemark(e.target.value)}
                className="showCustomerInstallmentEditForm_input"
              />
              <button type="submit" className="showCustomerInstallmentEditForm_submit_button">
                Submit
              </button>
            </form>

          </>
        )
      }

      {/*   customer Slip */}

      {
        customerSlip && customerDetail && (
          <>
            <div className="customer_final_slip_main_wrapper">

              <button onClick={() => setcustomerSlip(!customerSlip)} className='customer_salary_slip_close_button'>X</button>


              <button onClick={handleDownload} className="customer_salary_slip_downlode_btn"> Downlode</button>
              <div className="royaal_patment_slip_main_wrapper" ref={letterref}>
                <div className="payment_slip_header" style={{ marginLeft: "25px" }}>
                  <img src={infraLogo} alt="" height={"80px"} width={"150px"} />
                  <p style={{ fontSize: "12px" }}>
                    Address : 28, GOVIND PRABHU NAGAR , RAJAPETH HUDKESHWAR ROAD ,
                    NAGPUR - 34
                  </p>
                  <p style={{ marginBottom: "5px", fontSize: "12px" }}>
                    CONTACT: + 91-9028999253 | 9373450092
                  </p>
                </div>
                <hr
                  style={{
                    border: "2px solid green",
                  }}
                />

                <p style={{ marginTop: "10px", marginLeft: "25px", fontSize: "12px" }}>
                  Date :
                </p>

                <div
                  className="payment_slip_first_table_wrapper"
                  style={{ marginLeft: "25px", marginTop: "10px" }}
                >
                  <table
                    style={{ border: "1px solid gray", borderCollapse: "collapse", width: "400px" }}
                    className="payment_slip_first_table"
                  >
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          Flat No / Plot No{" "}
                        </b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}> {customerDetail.residency.identifier}</b>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}> Area</b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          {" "}
                          {
                            customerDetail.customer.address
                          }
                        </b>
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          Location
                        </b>
                      </td>
                      <td style={{ border: "1px solid gray" }}>
                        <b style={{ fontSize: "12px", padding: "2px 10px" }}>
                          {
                            customerDetail.residency.name
                          }
                        </b>
                      </td>
                    </tr>
                  </table>
                </div>
                <p
                  style={{
                    marginLeft: "25px",
                    marginTop: "25px",
                    textAlign: "center",
                    fontSize: "15px",
                  }}
                >
                  RECEIVED with thanks from <b>{customerDetail.customer.name} </b>
                  the sum of Rupees  <b> {customerDetail.dealPrice.toLocaleString()} </b> by Cheque / Cash / Draft No.{" "}
                  <b>{customerDetail.residency.identifier}</b> flat / plot address <b>  {
                    customerDetail.customer.address
                  } </b> in
                  part / full / advance payment.
                </p>

                <div
                  className="payment_slip_container"
                  style={{
                    border: "2px solid black",
                    width: "150px",
                    borderRadius: "50px",
                    marginLeft: "25px",
                    marginTop: "15px",
                  }}
                >
                  <p style={{ fontSize: "15px", marginLeft: "5px" }}>
                    ₹ : <b> {customerDetail.dealPrice.toLocaleString()}</b>
                  </p>
                </div>
                <p style={{ marginLeft: "25px", marginTop: "5px", fontSize: "15px" }}>
                  <b> Balance Amount : {(customerDetail.dealPrice - (customerDetail.agreementAmount + customerDetail.tokenAmount)).toLocaleString()}</b>
                </p>
                <p style={{ marginLeft: "25px", marginTop: "5px", fontSize: "15px" }}>
                  <b>
                    Total Payable: {(customerDetail.agreementAmount + customerDetail.tokenAmount).toLocaleString()}
                  </b>

                </p>

                <div
                  className="payment_slip_signature_wrapper"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "30px",
                  }}
                >
                  <b style={{ marginLeft: "25px", fontSize: "15px" }}>
                    Customer Signature
                  </b>
                  <b style={{ marginRight: "30px", fontSize: "15px" }}>
                    Authorised Signature
                  </b>
                </div>

                <hr style={{ border: "2px solid green" }} />

                <div
                  className="payment_slip_secound_slip"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    marginLeft: "25px",
                  }}
                >
                  <table
                    style={{
                      width: "100%",
                      borderCollapse: "collapse",
                      margin: "20px 0",
                      fontFamily: "Arial, sans-serif",
                      fontSize: "13px",
                    }}
                  >
                    <tr>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color: "black"
                        }}
                      >
                        S.No.
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color: "black"

                        }}
                      >
                        Other Charges
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color: "black"

                        }}
                      >
                        Percentage
                      </th>
                      <th
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          backgroundColor: "#f2f2f2",
                          color: "black"

                        }}
                      >
                        Amount
                      </th>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        0
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Total Price
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        -
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        {customerDetail.dealPrice.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        1
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Stamp Duty
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.stampDutyAmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        2
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Registration
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >  {customerDetail.registrationAmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        3
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        GST
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.gstAmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        4
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Electric Meter and Water Charges
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >  {customerDetail.electricWaterAmmount.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        5
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Legal Charges / Documentation Charges
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > {customerDetail.legalChargesAmmout.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        6
                      </td>
                      <td style={{ border: "1px solid #000", padding: "2px 10px" }}>
                        Maintenance Charges for 5 Years
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Total of Overhead Charges:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Basic Cost of Flat:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      > </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >    {customerDetail.dealPrice.toLocaleString()}</td>
                    </tr>
                    <tr>
                      <td
                        colSpan="2"
                        style={{
                          border: "1px solid #000",
                          padding: "2px 10px",
                          fontWeight: "bold",
                        }}
                      >
                        Grand Total:
                      </td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      ></td>
                      <td
                        style={{ border: "1px solid #000", padding: "2px 10px" }}
                      >     {(customerDetail.dealPrice + customerDetail.stampDutyAmount + customerDetail.registrationAmount + customerDetail.gstAmount + customerDetail.electricWaterAmmount + customerDetail.legalChargesAmmout).toLocaleString()}</td>
                    </tr>
                  </table>
                </div>
                <h3 style={{ fontFamily: "Arial, sans-serif", marginLeft: "25px" }}>
                  Terms and Conditions:
                </h3>
                <hr style={{ border: "1px solid green" }} />
                <ol style={{ fontFamily: "Arial, sans-serif" }}>
                  <li style={{ fontSize: "12px" }}>
                    1 .Elevation changes not allowed.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    {" "}
                    2. Extra item work charges to be paid in advance.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    3. If purchaser has to change any item like tiles, he has to
                    purchase it from market, and variable it on site for its own cost,
                    no deduction allowed for this condition. This condition is for all
                    material.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    3. If purchaser has to change any item like wise tiles he has to
                    purchase it from market and available it on site for use at his own
                    cost, no deduction allowed for this (This condition is for all
                    material).
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    4. Agreement of Development for sale will be executed within 10 days
                    from the date of Booking and aftersanctioning the Bank Loan.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    5. Stampduty & Registration Charges will be taken at Registration of
                    Agreement to Sell
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    6. GST charges will be taken accordingly with payment schedule.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    7. The Rate of GST or any taxes may vary as per Govt. policies
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    8. Maintenance, MSEB charges will be taken at the time of Sale Deed/
                    Possession.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    9. If any cancellations happens then 30% amount will be deducted.
                  </li>
                  <li style={{ fontSize: "12px" }}>
                    10. Builder reserve all right to change planning and elevation.
                  </li>
                </ol>
              </div>
            </div>




          </>
        )
      }
    </>
  );
}

export default Flatowner;
