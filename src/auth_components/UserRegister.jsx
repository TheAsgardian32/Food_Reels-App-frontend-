// import React from 'react'
// import {useState} from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'

// const UserRegister = () => {
//     const navigate=useNavigate();
//     const [form, setform] = useState({fullName:"",email:"",password:""})

//     const handleChange=(e)=>{
//         setform({...form,[e.target.name]:e.target.value})
//     }

//     const handleSubmit=async(e)=>{
//         console.log(form)
//         e.preventDefault();
//         const response=await axios.post("http://localhost:3000/api/auth/user/register",form,{
//             withCredentials:true
//         })
//         console.log(response.data)
//         navigate("/")
//     }

//   return (
//     <div className='bg-black text-white'>
//         <form onSubmit={(e)=>{handleSubmit(e)}}>
//             <label htmlFor="fullName">First name</label>
//             <input type="text" name="fullName" className='border border-white' value={form.fullName} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="email">Email</label>
//             <input type="text" name="email"  className='border border-white'  value={form.email} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="password">Password</label>
//             <input type="text" name="password" className='border border-white' value={form.password} onChange={(e)=>{handleChange(e)}} />
//             <input type="submit" className='bg-green-500'/>
//         </form>
//     </div>
//   )
// }

// export default UserRegister

import React, { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import API from "../api";




const UserRegister = () => {
  
  useEffect(() => {
  alert("This app is designed for mobile view, please switch to mobile view for best UI/UX Experience");
}, [])
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    try{
    const response = await API.post(
      "/api/auth/user/register",
      form,
      { withCredentials: true }
    );
    console.log(response.data);
    navigate("/user/login");
    }
    catch(error)
    {
      if(error.response && error.response.data.message)
        alert(error.response.data.message);
      navigate("/")
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-100 to-white px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Register as User
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-gray-800"
        >
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Create User Account
          </button>
        </form>

         

        <div className="text-center text-sm text-gray-600 mt-4">
          Already a user?{" "}
          <button
            onClick={() => navigate("/user/login")}
            className="text-orange-600 font-medium hover:underline"
          >
            Login
          </button>
        </div>
        
      </div>
      <Link to="/food-partner/register"
            className="mt-4 w-60 text-center bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Register as FoodPartner
     </Link>
      
    </div>
  );
};

export default UserRegister;
