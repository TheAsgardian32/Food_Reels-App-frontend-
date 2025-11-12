// import React,{useEffect,useState} from 'react'
// import axios from "axios"

// const Saved = () => {

//   const [savedVids, setsavedVids] = useState(null);
//     useEffect(() => {
//       async function response(){
//          const resp=await axios.get("http://localhost:3000/api/food/saveditems",{withCredentials:true})
//          console.log(resp.data);
//          const foodItems=resp.data.savedByUser.map((item)=>({
//           _id:item.foodItem._id,
//           video:item.foodItem.video,
//           description:item.foodItem.desciption,
//           likesCount:item.foodItem.likesCount,
//           saveCount:item.foodItem.saveCount
//          }))
//          setsavedVids(foodItems)
//       }
//       response();
//     }, [])
//   return (
//     <div className=''>
//       {savedVids && savedVids.map((items)=>(
//         <div className=''>
//           <video
//           className=""
//           src={items.video}>
//           </video>
//         </div>
//       ))
//       }
//     </div>
//   )
// }

// export default Saved

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "../api";

const Saved = () => {
  const [savedVids, setSavedVids] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null); // For preview when clicked

  useEffect(() => {
    async function fetchSavedVideos() {
      try {
        // Fetch saved items from backend
        const resp = await API.get("/api/food/saveditems", {
          withCredentials: true,
        });

        // Extract relevant fields from response
        const foodItems = resp.data.savedByUser.map((item) => ({
          _id: item.foodItem._id,
          video: item.foodItem.video,
          description: item.foodItem.description,
          likesCount: item.foodItem.likesCount,
          saveCount: item.foodItem.saveCount,
        }));

        setSavedVids(foodItems);
      } catch (err) {
        console.error("Error fetching saved videos:", err);
      }
    }

    fetchSavedVideos();
  }, []);

  return (
    <div className="p-6">
      {/* Heading */}
      <h2 className="text-2xl font-bold mb-6 text-center ">Saved Videos</h2>

      {/* Video Grid */}
      <div className="flex flex-wrap gap-8 md:mx-120">
        {savedVids ? (
          savedVids.map((item) => (
            <div
              key={item._id}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer hover:scale-105 transition-transform w-35 h-65"
              onClick={() => setSelectedVideo(item.video)}
            >
              {/* Video Thumbnail */}
              <video
                className="w-full h-full  object-cover"
                src={item.video}
                muted
              />
            </div>
        ))):
        (<div className="text-xl font-light  text-blue-700 text-center mx-auto mt-40">
          Save videos to show them here..
        </div>
        )}
      </div>

      {/* Video Preview Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedVideo(null)}
        >
          <div className="bg-white p-4 rounded-lg max-w-3xl w-full md:justify-center md:mx-auto">
            <video
              className="w-full md:w-100 md:h-150 rounded-lg"
              src={selectedVideo}
              controls
              autoPlay
            />
          </div>
        </div>
      )}

      <div className="bg-blue-700 text-white font-bold text-xl fixed bottom-5 w-1/4 text-center rounded-lg p-3 left-1/2 -translate-x-1/2 transition:transform duration-500 ease-in-out transform hover:scale-110">
        <Link to="/home">
        Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Saved;
