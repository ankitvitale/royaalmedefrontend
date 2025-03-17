import React from 'react'
import { useNavigate } from 'react-router-dom'
function Employee() {
     const navigate = useNavigate()
        function handleSuperVisor(){
            navigate("/appuserregistration")
        }

        function handleAddEmploye(){
          navigate("/employeregistration")
        }
  return (
    <>
    <div className="admin_registration_button">
            <button onClick={handleSuperVisor} className='add_supervisor'> Add SuperVisor </button>
            <button className='add_employee' onClick={handleAddEmploye}> Add Employee</button>
        </div>
    
    
    </>
  )
}

export default Employee