import React from 'react'
import { useNavigate } from 'react-router-dom'
function Home() {
    const navigate = useNavigate()
    function handleSuperVisor(){
        navigate("/appuserregistration")
    }
    return (
        <>
            <h1 style={{ textAlign: "center",marginTop:"25px" }}>
                Welcome To RoyaalMede Software

            </h1>

        </>
    )
}

export default Home