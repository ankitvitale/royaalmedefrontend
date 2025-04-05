import React, { useState } from "react";
import "./AddLand.css";
import axios from "axios";
import { BASE_URL } from "../../config";
import { useNavigate } from "react-router-dom";
function AddLand() {
  const navigate = useNavigate()
  const [ownerName, setOwnerName] = useState("");
  const [ownerPhone, setOwnerPhone] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [ownerAadhar, setOwnerAadhar] = useState("");
  const [purchaserName, setPurchaserName] = useState("");
  const [purchaserPhone, setPurchaserPhone] = useState("");
  const [purchaserEmail, setPurchaserEmail] = useState("");
  const [purchaserAadhar, setPurchaserAadhar] = useState("");
  const [area, setArea] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");
  const [agreementAmount, setAgreementAmount] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [city, setCity] = useState("");
  const [landmark, setLandmark] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [khNumber, setkhNumber] = useState("")
  const [PhNumber, setPhNumber] = useState("")
  const [plotNumber, setPlotNumber] = useState("")
  const [mauzaNumber, setMauzaNumber] = useState("")
  const [date, setDate] = useState("")
  const [partners, setPartners] = useState([]);


  function handleAddPartner(e) {
    e.preventDefault();
    setPartners([...partners, { name: "", email: "", phoneNumber: "", amount: "" }]);
  }

  // Handle Change for Partner Fields
  function handlePartnerChange(index, field, value) {
    const updatedPartners = partners.map((partner, i) =>
      i === index ? { ...partner, [field]: value } : partner
    );
    setPartners(updatedPartners);
  }

  // Remove Partner
  function handleRemovePartner(index) {
    const updatedPartners = partners.filter((_, i) => i !== index);
    setPartners(updatedPartners);
  }

  // Handle Submit
  const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin")) || [];
  const myToken = token.token;
  console.log(myToken)

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      area: area.replace(/,/g, ""),
      tokenAmount: tokenAmount.replace(/,/g, ""),
      agreementAmount: agreementAmount.replace(/,/g, ""),
      totalAmount: totalAmount.replace(/,/g, ""),
      landAddOnDate: date || new Date().toISOString().split("T")[0],
      address: {
        city,
        landmark,
        pincode,
        country,
        state,
        muza: mauzaNumber,
        khno: khNumber,
        phno: PhNumber,
        plotno: plotNumber
      },
      owner: {
        name: ownerName,
        phoneNumber: ownerPhone,
        address: ownerEmail,
        aadharNumber: ownerAadhar,
      },
      purchaser: {
        name: purchaserName,
        phoneNumber: purchaserPhone,
        address: purchaserEmail,
        aadharNumber: purchaserAadhar,
      },
      partners: partners.map(partner => ({
        ...partner,
        amount: partner.amount.replace(/,/g, "") // Ensure partner amount is also formatted
      }))
    };

    const token = JSON.parse(localStorage.getItem("employeROyalmadeLogin"))?.token;

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      alert("Your Land is Successfully Added");
      navigate("/landpurchase")
      setOwnerName("");
      setOwnerPhone("");
      setOwnerEmail("");
      setOwnerAadhar("");
      setPurchaserName("");
      setPurchaserPhone("");
      setPurchaserEmail("");
      setPurchaserAadhar("");
      setArea("");
      setTokenAmount("");
      setAgreementAmount("");
      setTotalAmount("");
      setCity("");
      setLandmark("");
      setPincode("");
      setCountry("");
      setState("");
      setkhNumber("");
      setPhNumber("");
      setPlotNumber("");
      setMauzaNumber("");
      setPartners([]);
    } catch (error) {
      console.error("Error submitting form:", error.response?.data || error);
    }
  };

  return (
    <>
      <div className="Addland_form_container">
        <h1 className="Addlandh1">Property Form</h1>
        <form onSubmit={handleSubmit} className="addlandform">
          {/* Owner Details */}
          <h3>Owner Details</h3>
          <div className="Add_land_form_group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter owner name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={ownerPhone}
              onChange={(e) => setOwnerPhone(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={ownerEmail}
              onChange={(e) => setOwnerEmail(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Aadhar Number:</label>
            <input
              type="text"
              placeholder="Enter Aadhar number"
              value={ownerAadhar}
              onChange={(e) => setOwnerAadhar(e.target.value)}
            />
          </div>

          {/* Purchaser Details */}
          <h3>Purchaser Details</h3>
          <div className="Add_land_form_group">
            <label>Name:</label>
            <input
              type="text"
              placeholder="Enter purchaser name"
              value={purchaserName}
              onChange={(e) => setPurchaserName(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Phone Number:</label>
            <input
              type="text"
              placeholder="Enter phone number"
              value={purchaserPhone}
              onChange={(e) => setPurchaserPhone(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Address:</label>
            <input
              type="text"
              placeholder="Enter Address"
              value={purchaserEmail}
              onChange={(e) => setPurchaserEmail(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Aadhar Number:</label>
            <input
              type="text"
              placeholder="Enter Aadhar number"
              value={purchaserAadhar}
              onChange={(e) => setPurchaserAadhar(e.target.value)}
            />
          </div>

          {/* Property Details */}
          <h3>Property Details</h3>
          <div className="Add_land_form_group">
            <label>Area (sq ft):</label>
            <input
              type="text"
              placeholder="Enter area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Token Amount:</label>
            <input
              type="text"
              placeholder="Enter token amount"
              value={tokenAmount}
              onChange={(e) => setTokenAmount(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Agreement Amount:</label>
            <input
              type="text"
              placeholder="Enter agreement amount"
              value={agreementAmount}
              onChange={(e) => setAgreementAmount(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Total Amount:</label>
            <input
              type="text"
              placeholder="Enter total amount"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Date:</label>
            <input
              type="date"
              value={date || new Date().toISOString().split("T")[0]}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>


          {/* Address Details */}
          <h3>Address Details</h3>
          <div className="Add_land_form_group">
            <label>City:</label>
            <input
              type="text"
              placeholder="Enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Mauza:</label>
            <input
              type="text"
              placeholder="Enter city"
              value={mauzaNumber}
              onChange={(e) => setMauzaNumber(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>KH no:</label>
            <input
              type="text"
              placeholder="Enter KH Number"
              value={khNumber}
              onChange={(e) => setkhNumber(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>PH No:</label>
            <input
              type="text"
              placeholder="Enter PH Number"
              value={PhNumber}
              onChange={(e) => setPhNumber(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Plot No:</label>
            <input
              type="text"
              placeholder="Enter city"
              value={plotNumber}
              onChange={(e => setPlotNumber(e.target.value))}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Landmark:</label>
            <input
              type="text"
              placeholder="Enter landmark"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Pincode:</label>
            <input
              type="text"
              placeholder="Enter pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>Country:</label>
            <input
              type="text"
              placeholder="Enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="Add_land_form_group">
            <label>State:</label>
            <input
              type="text"
              placeholder="Enter state"
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>

          {/* Partner Details */}
          <h3>Partner Details</h3>
          <button onClick={handleAddPartner} className="add_partner_btn">Add Partner</button>
          {partners.map((partner, index) => (
            <div key={index} className="Addland_partner_section">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h4>Partner {index + 1}</h4>
                <button
                  type="button"
                  className="remove-partner-btn"
                  onClick={() => handleRemovePartner(index)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "red",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  ✖
                </button>
              </div>
              <div className="Add_land_form_group">
                <label>Partner Name:</label>
                <input
                  type="text"
                  placeholder="Enter partner name"
                  value={partner.name}
                  onChange={(e) =>
                    handlePartnerChange(index, "name", e.target.value)
                  }
                />
              </div>
              <div className="Add_land_form_group">
                <label>Address:</label>
                <input
                  type="text"
                  placeholder="Enter Address"
                  value={partner.city}
                  onChange={(e) =>
                    handlePartnerChange(index, "city", e.target.value)
                  }
                />
              </div>
              <div className="Add_land_form_group">
                <label>Phone:</label>
                <input type="number"
                  placeholder="Enter Number"
                  value={partner.phoneNumber}
                  onChange={(e) => handlePartnerChange(index, "phoneNumber", e.target.value)}
                />
              </div>

              <div className="Add_land_form_group">
                <label>Date:</label>
                <input
                  type="date"
                  placeholder="Enter amount"
                  value={partner.paymentDate || new Date().toISOString().split("T")[0]}
                  onChange={(e) =>
                    handlePartnerChange(index, "paymentDate", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          <button className="Add_land_submit_button" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default AddLand;
