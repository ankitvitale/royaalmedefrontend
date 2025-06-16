



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EnquiryDetails.css';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { BASE_URL } from '../../config';

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
    <div className="EnquiryDetails-container">
      <h1>Enquiry Details</h1>
      <div className="EnquiryDetails-button-group">
        <button className={activeTab === 'infra' ? 'EnquiryDetails-active' : ''} onClick={() => setActiveTab('infra')}>Infraa Enquiry</button>
        <button className={activeTab === 'loan' ? 'EnquiryDetails-active' : ''} onClick={() => setActiveTab('loan')}>Loan Enquiry</button>
        <button className={activeTab === 'career' ? 'EnquiryDetails-active' : ''} onClick={() => setActiveTab('career')}>Career</button>
      </div>

      {activeTab === 'infra' && (
        <div className="EnquiryDetails-table-container">
          <h2>Infraa Enquiries</h2>
          {enquiries.length > 0 ? (
            <table className="EnquiryDetails-table">
              <thead>
                <tr>
                  <th className="EnquiryDetails-th">Name</th>
                  <th className="EnquiryDetails-th">Email</th>
                  <th className="EnquiryDetails-th">Phone</th>
                  <th className="EnquiryDetails-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item, i) => (
                  <tr key={i}>
                    <td className="EnquiryDetails-td">{item.name}</td>
                    <td className="EnquiryDetails-td">{item.email}</td>
                    <td className="EnquiryDetails-td">{item.phone}</td>
                    <td className="EnquiryDetails-actions">
                      <button onClick={() => handleDelete(item.id, 'infra')}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="EnquiryDetails-no-data-message">No Infra Enquiry data available.</p>
          )}
        </div>
      )}

      {activeTab === 'loan' && (
        <div className="EnquiryDetails-table-container">
          <h2>Loan Enquiries</h2>
          {enquiries.length > 0 ? (
            <table className="EnquiryDetails-table">
              <thead>
                <tr>
                  <th className="EnquiryDetails-th">Name</th>
                  <th className="EnquiryDetails-th">Phone</th>
                  <th className="EnquiryDetails-th">Email</th>
                  <th className="EnquiryDetails-th">Ext Field</th>
                  <th className="EnquiryDetails-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((item, i) => (
                  <tr key={i}>
                    <td className="EnquiryDetails-td">{item.name}</td>
                    <td className="EnquiryDetails-td">{item.phone}</td>
                    <td className="EnquiryDetails-td">{item.email}</td>
                    <td className="EnquiryDetails-td">{item.extfield}</td>
                    <td className="EnquiryDetails-actions">
                      <button onClick={() => handleDelete(item.id, 'loan')}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="EnquiryDetails-no-data-message">No Loan Enquiry data available.</p>
          )}
        </div>
      )}

      {activeTab === 'career' && (
        <>
          <div className="EnquiryDetails-career-toolbar">
            <div className="EnquiryDetails-search-wrapper">
              <input
                type="text"
                placeholder="🔍 Search job titles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <h2>
              Career Listings
            </h2>
            
            <div className="EnquiryDetails-button-wrapper">
              <button onClick={() => setShowModal(true)}>➕ Add Career</button>
            </div>
          </div>

          <div className="EnquiryDetails-table-container">
            <table className="EnquiryDetails-table">
              <thead>
                <tr>
                  <th className="EnquiryDetails-th">Title</th>
                  <th className="EnquiryDetails-th">Company</th>
                  <th className="EnquiryDetails-th">Location</th>
                  <th className="EnquiryDetails-th">Description</th>
                  <th className="EnquiryDetails-th">Experience</th>
                  <th className="EnquiryDetails-th">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginate(filteredCareers).map(item => (
                  <tr key={item.id}>
                    <td className="EnquiryDetails-td">{item.jobTitle}</td>
                    <td className="EnquiryDetails-td">{item.companyName}</td>
                    <td className="EnquiryDetails-td">{item.location}</td>
                    <td className="EnquiryDetails-td">{item.jobDescription}</td>
                    <td className="EnquiryDetails-td">{item.totalExperience}</td>
                    <td className="EnquiryDetails-actions">
                      <button onClick={() => handleEdit(item)}><FaEdit /></button>
                      <button onClick={() => handleDelete(item.id, 'career')}><MdDelete /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="EnquiryDetails-pagination">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>Previous</button>
              <span>Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>Next</button>
            </div>
          </div>
        </>
      )}

      {showModal && (
        <div className="EnquiryDetails-modal">
          <form className="EnquiryDetails-career-form" onSubmit={handleCareerSubmit}>
            <input type="text" placeholder="Job Title" value={careerForm.jobTitle} onChange={(e) => setCareerForm({ ...careerForm, jobTitle: e.target.value })} required />
            <input type="text" placeholder="Company Name" value={careerForm.companyName} onChange={(e) => setCareerForm({ ...careerForm, companyName: e.target.value })} required />
            <input type="text" placeholder="Location" value={careerForm.location} onChange={(e) => setCareerForm({ ...careerForm, location: e.target.value })} required />
            <textarea placeholder="Job Description" value={careerForm.jobDescription} onChange={(e) => setCareerForm({ ...careerForm, jobDescription: e.target.value })} required />
            <input type="text" placeholder="Experience" value={careerForm.totalExperience} onChange={(e) => setCareerForm({ ...careerForm, totalExperience: e.target.value })} required />
            <div className="EnquiryDetails-form-buttons">
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