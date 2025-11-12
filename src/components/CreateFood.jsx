// import React, { useState} from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const  CreateFood=() =>{
//   const navigate=useNavigate();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [video, setVideo] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Create form data
//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("video", video); // must match multer field name

//     try {
//       const res = await axios.post("http://localhost:3000/api/food/", formData, {
//         withCredentials: true,});
//       console.log("Success:", res.data);
//       alert("Upload successful!");
//       navigate("/home")
//     } catch (err) {
//       console.error("Error uploading:", err);
//       alert("Upload failed.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="bg-black w-auto text-white">
//       <h2>Upload Video</h2>

//       <label>Name:</label>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         required
//       />

//       <label>Description:</label>
//       <textarea
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//         required
//       ></textarea>

//       <label>Video File:</label>
//       <input
//         type="file"
//         accept="video/*"
//         onChange={(e) => setVideo(e.target.files[0])}
//         required
//       />

//       <button type="submit">Upload</button>
//     </form>
//   );
// }

// export default CreateFood;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api";

const CreateFood = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [loading, setloading] = useState(false)
  const [fpid, setfpid] = useState(null)

  const navProfile = async() => {
    try {
      const res = await API.get("/api/food/partnerprof", {
        withCredentials: true,
      });
      console.log(res.data);
    } catch (err) {
      alert("Something went wrong");
    }
    if(fpid)
      navigate(`food-partner/${fpid}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setloading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("video", video);

    try {
      const res = await axios.post("http://localhost:3000/api/food/", formData, {
        withCredentials: true,
      });
      console.log("Success:", res.data);
      console.log(res.data.foodItem.foodPartner);
      setfpid(res.data.foodItem.foodPartner)
      alert("Upload successful!");
      alert("Login as an user to see all changes");
      // navigate("/");
    } catch (err) {
      console.error("Error uploading:", err);
      alert("Upload failed.");
    }
    finally {
      setloading(false)
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-100 to-white px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-6">
          Upload Video
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 text-gray-800"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter food name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div>
            <label
              htmlFor="video"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Video File
            </label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideo(e.target.files[0])}
              className="w-full border border-blue-400 rounded-lg p-2 focus:ring-2 focus:ring-orange-400 focus:outline-none bg-white"
              required
            />
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full mb-20 bg-orange-500 text-white font-medium py-2 rounded-lg hover:bg-orange-600 transition-all duration-300"
          >
            {loading ? "Uploading..." : "Upload"}
          </button>

        </form>
        
      </div>
    </div>
  );
};

export default CreateFood;
// 