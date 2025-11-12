// import React,{useEffect,useState,} from 'react'
// import { Link,useNavigate } from 'react-router-dom'
// import axios from 'axios'

// const Home = () => {
//     const [arrayofobjects, setarrayofobjects] = useState([])
//     const [uname, setuname] = useState("user")

//     useEffect(() => {
//       async function response(){
//         const res=await axios.get('http://localhost:3000/api/food',{withCredentials:true})
//         setarrayofobjects(res.data.foodItems)
//         console.log(arrayofobjects)
//         console.log(res.data)
//         setuname(res.data.whichUser);
//       }
//       response()
//     },[])
    
    

//   return (
    
//     <div>
//       <h1>Hello {uname?.fullName}</h1>
//         {arrayofobjects.map((items)=>{
//             return(
//                 <>
//                 <video width={100} height={100} 
//                 src={items.video} controls>
//                 </video>
//                 <Link to={"/food-partner/"+items.foodPartner}>Visit Store</Link>
//                 </>
//             )
//         })}
//     </div>
//   )
// }

// export default Home

import React, { useEffect, useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import API from "../api";
const Home = () => {
    const [arrayofobjects, setarrayofobjects] = useState([])
    const [uname, setuname] = useState("user")
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
    const [isMuted, setIsMuted] = useState(true)
    const videoRefs = useRef([])
    const containerRef = useRef(null)
    const [likecounter, setlikecounter] = useState(0);
    const navigate = useNavigate();

    
    useEffect(() => {
      async function response(){
        const res = await API.get('/api/food', {withCredentials: true})
        setarrayofobjects(res.data.foodItems)
        setuname(res.data.whichUser)
      }
      response()
    }, [])

    useEffect(() => {
      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
      }

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.play()
            const index = videoRefs.current.indexOf(entry.target)
            if (index !== -1) setCurrentVideoIndex(index)
          } else {
            entry.target.pause()
          }
        })
      }

      const observer = new IntersectionObserver(handleIntersection, options)

      videoRefs.current.forEach((video) => {
        if (video) observer.observe(video)
      })

      return () => {
        videoRefs.current.forEach((video) => {
          if (video) observer.unobserve(video)
        })
      }
    }, [arrayofobjects])

    useEffect(() => {
      // Update mute state for all videos
      videoRefs.current.forEach((video) => {
        if (video) video.muted = isMuted
      })
    }, [isMuted])

    const handleVideoClick = (index) => {
      const video = videoRefs.current[index]
      if (video) {
        if (video.paused) {
          video.play()
        } else {
          video.pause()
        }
      }
    }

    const toggleMute = (e) => {
      e.stopPropagation()
      setIsMuted(!isMuted)
    }

    const handleLikeClick = async(itemsid) => {
      const response=await API.post("/api/food/like",{foodId:itemsid},{
        withCredentials:true
      });
      console.log(response.data)
      if(response.data.like)
        setarrayofobjects((prev)=>prev.map((v)=>v._id===itemsid ? {...v,likesCount:v.likesCount+1}:v));
    else
        setarrayofobjects((prev)=>prev.map((v)=>v._id===itemsid ? {...v,likesCount:v.likesCount-1}:v));

      
    }

    const handleSaveClick=async(itemsid)=>{
      console.log("Save clicked")
      const response=await API.post("/api/food/save",{foodId:itemsid},{
        withCredentials:true
      })
      if(response.data.save)
        setarrayofobjects((prev)=>prev.map((v)=>
        v._id===itemsid ? {...v,saveCount:v.saveCount+1}:v
      ))
      else
        setarrayofobjects((prev)=>prev.map((v)=>
        v._id===itemsid ? {...v,saveCount:v.saveCount-1}:v
      ))
    }
    
    const logoutUser=async()=>{
      await API.get("/api/auth/user/logout",{withCredentials:true});
      navigate("/")
    }

    return (
      
      <div className="relative w-full h-screen bg-black overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/80 to-transparent p-4">
          <h1 className="text-white text-xl font-semibold">
            Hello, {uname?.fullName || 'Food Partner'}
          </h1>
        </div>

        <div className='cursor-pointer bg-red-900 text-white font-bold absolute top-5 right-5 z-50 py-1 px-2 rounded-xl transform transition-all ease-in-out hover:scale-110'>
          <button className="cursor-pointer"onClick={logoutUser}>
            Log out
          </button>
        </div>

        <div className='absolute right-0 top-80 bg-red-400 z-1 p-2 font-semibold transform hover:scale-120 transition-all duration-300 hover:bg-blue-700 ease-in-out hover:text-white rounded-md'>
          <Link to="/saved">
         Go to <br /> 
         Saved
          </Link>
        </div>

        {/* Video Container */}
        <div 
          ref={containerRef}
          className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {arrayofobjects.map((items, index) => (
            <div 
              key={index}
              className="relative w-full h-screen snap-start snap-always flex items-center justify-center"
            >
              {/* Video */}
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="w-full h-full object-cover"
                src={items.video}
                loop
                playsInline
                muted
                onClick={() => handleVideoClick(index)}
              />
              <button onClick={()=>{handleLikeClick(items._id)}} className='cursor-pointer absolute bottom-70 right-3 text-white w-10 bg-white p-1 rounded-full transform hover:scale-110  transition-all duration-200 ease-in-out'>
                <img src="public/heart.png" alt="" width="30"className="" />
              </button>
              <div className='absolute bottom-63 -right-1 text-white w-10 text-bold'>
                {items.likesCount}
              </div>

              <button onClick={()=>{handleSaveClick(items._id)}} className='cursor-pointer  absolute bottom-50 right-3 text-white w-10 bg-white p-1 rounded-full transform hover:scale-110 transition-all duration-200 ease-in-out'>
                <img src="public/save-instagram.png" alt="" width="30"className="" />
              </button>
              <div className='absolute bottom-43 -right-1 text-white w-10 font-bold'>
                {items.saveCount}
              </div>

              {/* Mute/Unmute Button */}
              <button
                onClick={toggleMute}
                className="absolute top-20 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-3 hover:bg-black/70 transition-all duration-200"
              >
                {isMuted ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                  </svg>
                )}
              </button>

              {/* Pause/Play Indicator */}
              <div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                onClick={() => handleVideoClick(index)}
              >
                {videoRefs.current[index]?.paused && (
                  <div className="w-20 h-20 bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pb-8">
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    <h2 className="text-white text-lg font-semibold mb-2">
                      {items.name || 'Delicious Food'}
                    </h2>
                    <p className="text-white/80 text-sm mb-3 line-clamp-2">
                      {items.description || 'Check out this amazing dish!'}
                    </p>
                  </div>
                </div>
                
                {/* Visit Store Button */}
                <Link 
                  to={`/food-partner/${items.foodPartner}`}
                  className="flex items-center justify-center bg-white text-black font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-200 shadow-lg"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Visit Store
                </Link>
              </div>
            </div>
          ))}
        </div>
        

        {/* Hide scrollbar */}
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    )
}

export default Home