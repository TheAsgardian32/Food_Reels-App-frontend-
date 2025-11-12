// import React from 'react'
// import {useState} from 'react'
// import axios from "axios"
// import { useNavigate } from 'react-router-dom'

// const UserLogin = () => {
//     const navigate=useNavigate();
//     const [form, setform] = useState({email:"",password:""})

//     const handleChange=(e)=>{
//         setform({...form,[e.target.name]:e.target.value})
//     }

//     const handleSubmit=async(e)=>{
//         console.log(form)
//         e.preventDefault();
//         const response=await axios.post("http://localhost:3000/api/auth/user/login",form,{
//             withCredentials:true
//         })
//         console.log(response.data)
//         navigate("/home")
//     }

//   return (
//     <div className='bg-black text-white'>
//         <form onSubmit={(e)=>{handleSubmit(e)}}>
//             <label htmlFor="email">Email</label>
//             <input type="text" name="email"  className='border border-white'  value={form.email} onChange={(e)=>{handleChange(e)}}/>
//             <label htmlFor="password">Password</label>
//             <input type="text" name="password" className='border border-white' value={form.password} onChange={(e)=>{handleChange(e)}} />
//             <input type="submit" className='bg-green-500'/>
//         </form>
//     </div>
//   )
// }

// export default UserLogin

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

const UserLogin = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setloading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    setloading(true);
    try {
      const response = await API.post(
        "/api/auth/user/login",
        form,
        { withCredentials: true }
      )
      setloading(false);
      console.log(response.data);
      navigate("/home");
    }
    catch (error) {
      console.log(error);
      if (error.response && error.response.data.message)
        alert(error.response.data.message)
      else
        alert("Something went wrong");
      navigate("/");
    }

  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-white px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
          Login as User
        </h1>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-gray-800"
        >
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
            disabled={loading}
            className="w-full bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            {loading ? (
              "Logging you in"
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          New user?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-orange-600 font-medium hover:underline"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
