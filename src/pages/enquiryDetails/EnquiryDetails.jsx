import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnquiryDetails.css';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const BASE_URL = 'http://localhost:8080/api';

const EnquiryDetails = () => {
  const [activeTab, setActiveTab] = useState('infra');
  const [enquiries, setEnquiries] = useState([]);
  const [careers, setCareers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [careerForm, setCareerForm] = useState({
    jobTitle: '',
    companyName: '',
    location: '',
    jobDescription: '',
    totalExperience: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
    if (activeTab === 'infra') fetchInfraEnquiries();
    else if (activeTab === 'loan') fetchLoanEnquiries();
    else fetchCareers();
  }, [activeTab]);

  const fetchInfraEnquiries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/enquiries`);
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLoanEnquiries = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/loan-enquiries`);
      setEnquiries(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCareers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/careers`);
      setCareers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCareerSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${BASE_URL}/careers/${editingId}`, careerForm);
      } else {
        await axios.post(`${BASE_URL}/careers`, careerForm);
      }
      setCareerForm({ jobTitle: '', companyName: '', location: '', jobDescription: '', totalExperience: '' });
      setEditingId(null);
      setShowModal(false);
      fetchCareers();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (item) => {
    setCareerForm(item);
    setEditingId(item.id);
    setShowModal(true);
  };

  const handleDelete = async (id, type) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        if (type === 'career') await axios.delete(`${BASE_URL}/careers/${id}`);
        else if (type === 'infra') await axios.delete(`${BASE_URL}/enquiries/${id}`);
        else if (type === 'loan') await axios.delete(`${BASE_URL}/loan-enquiries/${id}`);
        type === 'career' ? fetchCareers() : type === 'infra' ? fetchInfraEnquiries() : fetchLoanEnquiries();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const paginate = (data) => data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const filteredCareers = careers.filter(c => c.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalItems = activeTab === 'career' ? filteredCareers.length : enquiries.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="container">
      <h1>Enquiry Details</h1>
      <div className="button-group">
        <button className={activeTab === 'infra' ? 'active' : ''} onClick={() => setActiveTab('infra')}>Infra Enquiry</button>
        <button className={activeTab === 'loan' ? 'active' : ''} onClick={() => setActiveTab('loan')}>Loan Enquiry</button>
        <button className={activeTab === 'career' ? 'active' : ''} onClick={() => setActiveTab('career')}>Career</button>
      </div>

      {activeTab === 'career' && (
        <div className="career-toolbar">
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="🔍 Search job titles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="button-wrapper">
            <button onClick={() => setShowModal(true)}>➕ Add Career</button>
          </div>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              {activeTab === 'career' ? (
                <>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Description</th>
                  <th>Experience</th>
                </>
              ) : (
                Object.keys(paginate(enquiries)[0] || {}).filter(key => key !== 'id').map(key => <th key={key}>{key}</th>)
              )}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'career' ? paginate(filteredCareers) : paginate(enquiries)).map(item => (
              <tr key={item.id}>
                {activeTab === 'career' ? (
                  <>
                    <td>{item.jobTitle}</td>
                    <td>{item.companyName}</td>
                    <td>{item.location}</td>
                    <td>{item.jobDescription}</td>
                    <td>{item.totalExperience}</td>
                  </>
                ) : (
                  Object.entries(item).filter(([key]) => key !== 'id').map(([key, val]) => <td key={key}>{val}</td>)
                )}
                <td className="actions">
                  {activeTab === 'career' && (
                    <button onClick={() => handleEdit(item)}><FaEdit /></button>
                  )}
                  <button onClick={() => handleDelete(item.id, activeTab)}><MdDelete /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <form className="career-form" onSubmit={handleCareerSubmit}>
            <input type="text" placeholder="Job Title" value={careerForm.jobTitle} onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })} required />
            <input type="text" placeholder="Company Name" value={careerForm.companyName} onChange={(e) => setCareerForm({ ...careerForm, companyName: e.target.value })} required />
            <input type="text" placeholder="Location" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} required />
            <textarea placeholder="Job Description" value={careerForm.jobDescription} onChange={(e) => setCareerForm({ ...careerForm, jobDescription: e.target.value })} required></textarea>
            <input type="text" placeholder="Experience" value={careerForm.totalExperience} onChange={(e) => setCareerForm({ ...careerForm, totalExperience: e.target.value })} required />
            <div className="form-buttons">
              <button type="submit">{editingId ? 'Update' : 'Add'} Career</button>
              <button type="button" onClick={() => { setShowModal(false); setEditingId(null); }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EnquiryDetails;


// ----------------------------------------------

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './EnquiryDetails.css';
// import { BASE_URL } from '../../config';
// import { FaEdit } from "react-icons/fa";
// import { MdDelete } from "react-icons/md";



// const EnquiryDetails = () => {
//     const [activeTab, setActiveTab] = useState(null);
//     const [enquiries, setEnquiries] = useState([]);
//     const [careers, setCareers] = useState([]);
//     const [editingId, setEditingId] = useState(null);
//     const [careerForm, setCareerForm] = useState({
//         jobTitle: '',
//         companyName: '',
//         location: '',
//         jobDescription: '',
//         totalExperience: ''
//     });

//     useEffect(() => {
//         if (activeTab === 'infra') fetchInfraEnquiries();
//         else if (activeTab === 'loan') fetchLoanEnquiries();
//         else if (activeTab === 'career') fetchCareers();
//     }, [activeTab]);

//     const fetchInfraEnquiries = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/enquiries`);
//             setEnquiries(response.data);
//         } catch (error) {
//             console.error('Infra enquiry fetch error:', error);
//         }
//     };

//     const fetchLoanEnquiries = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/loan-enquiries`);
//             setEnquiries(response.data);
//         } catch (error) {
//             console.error('Loan enquiry fetch error:', error);
//         }
//     };

//     const fetchCareers = async () => {
//         try {
//             const response = await axios.get(`${BASE_URL}/careers`);
//             setCareers(response.data);
//         } catch (error) {
//             console.error('Career fetch error:', error);
//         }
//     };

//     const handleCareerSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (editingId) {
//                 await axios.put(`${BASE_URL}/careers/${editingId}`, careerForm);
//                 alert('Career updated successfully!');
//             } else {
//                 await axios.post(`${BASE_URL}/careers`, careerForm);
//                 alert('Career added successfully!');
//             }
//             setCareerForm({
//                 jobTitle: '',
//                 companyName: '',
//                 location: '',
//                 jobDescription: '',
//                 totalExperience: ''
//             });
//             setEditingId(null);
//             fetchCareers();
//         } catch (error) {
//             console.error('Career submission error:', error);
//         }
//     };

//     const handleEdit = (career) => {
//         setCareerForm(career);
//         setEditingId(career.id);
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure to delete this career?')) {
//             try {
//                 await axios.delete(`${BASE_URL}/careers/${id}`);
//                 fetchCareers();
//             } catch (error) {
//                 console.error('Delete error:', error);
//             }
//         }
//     };

//     return (
//         <div className="container">
//             <h1>Enquiry Details</h1>
//             <div className="button-group">
//                 <button onClick={() => setActiveTab('infra')}>Infra Enquiry</button>
//                 <button onClick={() => setActiveTab('loan')}>Loan Enquiry</button>
//                 <button onClick={() => setActiveTab('career')}>Add Career</button>
//             </div>

//             {activeTab === 'infra' && (
//                 <div className="table-container">
//                     <h2>Infra Enquiries</h2>
//                     {enquiries.length > 0 ? (
//                         <table>
//                             <thead>
//                                 <tr><th>Name</th><th>Email</th><th>Phone</th></tr>
//                             </thead>
//                             <tbody>
//                                 {enquiries.map((item, i) => (
//                                     <tr key={i}>
//                                         <td>{item.name}</td>
//                                         <td>{item.email}</td>
//                                         <td>{item.phone}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p className="no-data-message">No Infra Enquiry data available.</p>
//                     )}
//                 </div>
//             )}

//             {activeTab === 'loan' && (
//                 <div className="table-container">
//                     <h2>Loan Enquiries</h2>
//                     {enquiries.length > 0 ? (
//                         <table>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th><th>Phone</th><th>Email</th><th>Address</th>
//                                     <th>Yearly Income</th><th>Turnover</th><th>ITR File No</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {enquiries.map((item, i) => (
//                                     <tr key={i}>
//                                         <td>{item.name}</td>
//                                         <td>{item.phone}</td>
//                                         <td>{item.email}</td>
//                                         <td>{item.address}</td>
//                                         <td>{item.yearlyIncome}</td>
//                                         <td>{item.turnover}</td>
//                                         <td>{item.itrFileNo}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p className="no-data-message">No Loan Enquiry data available.</p>
//                     )}
//                 </div>
//             )}

//             {activeTab === 'career' && (
//                 <div>
//                     <form className="career-form" onSubmit={handleCareerSubmit}>
//                         <h2>{editingId ? 'Edit Career' : 'Add Career'}</h2>
//                         <input type="text" placeholder="Job Title" value={careerForm.jobTitle} onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })} required />
//                         <input type="text" placeholder="Company Name" value={careerForm.companyName} onChange={(e) => setCareerForm({ ...careerForm, companyName: e.target.value })} required />
//                         <input type="text" placeholder="Location" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} required />
//                         <textarea placeholder="Job Description" value={careerForm.jobDescription} onChange={(e) => setCareerForm({ ...careerForm, jobDescription: e.target.value })} required></textarea>
//                         <input type="text" placeholder="Total Experience" value={careerForm.totalExperience} onChange={(e) => setCareerForm({ ...careerForm, totalExperience: e.target.value })} required />
//                         <button type="submit">{editingId ? 'Update' : 'Submit'}</button>
//                     </form>

//                     {careers.length > 0 ? (
//                         <table className="career-table">
//                             <thead>
//                                 <tr>
//                                     <th>Job Title</th>
//                                     <th>Company Name</th>
//                                     <th>Location</th>
//                                     <th>Description</th>
//                                     <th>Experience</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {careers.map((career) => (
//                                     <tr key={career.id}>
//                                         <td>{career.jobTitle}</td>
//                                         <td>{career.companyName}</td>
//                                         <td>{career.location}</td>
//                                         <td>{career.jobDescription}</td>
//                                         <td>{career.totalExperience}</td>
//                                         <td>
//                                             <button onClick={() => handleEdit(career)}><FaEdit /> </button>
//                                             <button onClick={() => handleDelete(career.id)}><MdDelete /></button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p className="no-data-message">No careers posted yet.</p>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default EnquiryDetails;

