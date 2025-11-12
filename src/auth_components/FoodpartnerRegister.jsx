// import React from 'react'
// import {useState} from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'

// const FoodpartnerRegister = () => {
//     const navigate=useNavigate();
//     const [form, setform] = useState({name:"",email:"",password:"",contactName:"",phone:"",address:""})

//     const handleChange=(e)=>{
//         setform({...form,[e.target.name]:e.target.value})
//     }

//     const handleSubmit=async(e)=>{
//         console.log(form)
//         e.preventDefault();
//         const response=await axios.post("http://localhost:3000/api/auth/food-partner/register",form,{
//             withCredentials:true
//         })
//         console.log(response.data)
//         navigate("/")
//     }

//   return (
//     <div className='bg-black text-white'>
//         <form onSubmit={(e)=>{handleSubmit(e)}}>
//             <label htmlFor="name">First name</label>
//             <input type="text" name="name" className='border border-white' value={form.name} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="email">Email</label>
//             <input type="text" name="email"  className='border border-white'  value={form.email} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="password">Password</label>
//             <input type="text" name="password" className='border border-white' value={form.password} onChange={(e)=>{handleChange(e)}} />

//             <label htmlFor="contactName">ContactName</label>
//             <input type="text" name="contactName" className='border border-white' value={form.fullName} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="phone">Phone</label>
//             <input type="text" name="phone"  className='border border-white'  value={form.phone} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="address">Address</label>
//             <input type="text" name="address" className='border border-white' value={form.address} onChange={(e)=>{handleChange(e)}} />
//             <input type="submit" className='bg-green-500'/>
//         </form>
//     </div>
//   )
// }

// export default FoodpartnerRegister

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

const FoodpartnerRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactName: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    const response = async () => {
      try {
        await API.post(
          "/api/auth/food-partner/register",
          form,
          { withCredentials: true }
        );
        console.log(response.data);
        navigate("/food-partner/login");
      }
      catch(error)
      {
        if(error.response && error.response.data.message)
          alert(error.reponse.data.message);
        else
          alert("Something went wrong!!");
      }
      
  }
}

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-white px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Partner Registration
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-gray-800"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Business Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter business name"
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

          <div>
            <label
              htmlFor="contactName"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Contact Name
            </label>
            <input
              type="text"
              name="contactName"
              value={form.contactName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter contact person’s name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter phone number"
              required
            />
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Address
            </label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter address"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          Already registered?{" "}
          <button
            onClick={() => navigate("/food-partner/login")}
            className="text-orange-600 font-medium hover:underline"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodpartnerRegister;
