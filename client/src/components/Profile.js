import React from 'react'
import { useQuery } from '@apollo/client';
import { GET_MY_PROFILE } from '../gqloperations/queries';
import {useNavigate} from 'react-router-dom'
export default function Profile() {
    const navigate  = useNavigate()
    const {loading,error,data} = useQuery(GET_MY_PROFILE)
    if(!localStorage.getItem("token")){
            navigate("/login")
            return <h3>unauthorized</h3>
    }
    if(loading) return <h4>Profile is loading</h4>
    if(error){
        console.log(error)
    }
    return (
        <div className="container my-container">
            <div className="center-align">
                {/* <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://robohash.org/${data.user.firstName}.png?size=200x200`} alt="pic" /> */}
                <img className="circle" style={{border:"2px solid",marginTop:"10px"}} src={`https://media.istockphoto.com/id/1131164548/vector/avatar-5.jpg?s=612x612&w=0&k=20&c=CK49ShLJwDxE4kiroCR42kimTuuhvuo2FH5y_6aSgEo=`} width={200} alt="pic" />
                <h5>{data.user.firstName} {data.user.lastName}</h5>
                <h6>Email - {data.user.email}</h6>
            </div>
             <h4>Your quotes</h4>
             {
                 data.user.quotes.map(quo=>{
                     return(
                         <blockquote>
                            <h6>{quo.name}</h6>
                        </blockquote> 
                     )
                 })
             }
        </div>
    )
}
