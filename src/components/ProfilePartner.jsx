import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import API from "../api";

const Profile = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [first, setfirst] = useState(null)
    const [selectedVideo, setSelectedVideo] = useState(null)

    useEffect(() => {
        API.get(`/api/profile/${id}`,{withCredentials:true})
        .then(response=>{
          setfirst(response.data)
        })
        .catch(err=>{
          console.log("The error from the backend is",err)
        })
    },[id])

    const openVideoModal = (video) => {
      setSelectedVideo(video)
    }

    const closeVideoModal = () => {
      setSelectedVideo(null)
    }

    if (!first) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center">
              <button 
                onClick={() => navigate(-1)}
                className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-xl font-bold text-gray-800">{first?.foodPartner?.name}</h1>
                <p className="text-sm text-gray-600">Food Partner</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Card */}
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6">
            {/* Cover Banner */}
            <div className="h-32 sm:h-40 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 relative">
              <div className="absolute -bottom-12 left-6 sm:left-8">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl bg-white shadow-lg flex items-center justify-center border-4 border-white">
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-br from-orange-500 to-pink-500 bg-clip-text text-transparent">
                    {first?.foodPartner?.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-16 px-6 sm:px-8 pb-6">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-6">
                <div className="mb-4 sm:mb-0">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                    {first?.foodPartner?.name}
                  </h2>
                  <div className="flex items-center space-x-2 text-gray-600 mb-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm">{first?.foodPartner?.email}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      🍕 Food Partner
                    </span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      ⭐ 4.8 Rating
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      ✓ Verified
                    </span>
                  </div>
                </div>
                
                <button onClick={()=>{navigate("/create-food")}} className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold py-3 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2">
                  <span>Create Food</span>
                </button>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-orange-600 mb-1">
                    {first?.foodItemsOfPartner?.length || 0}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Total Videos</div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">
                    {Math.floor(Math.random() * 50) + 10}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Menu Items</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-1">
                    {Math.floor(Math.random() * 200) + 50}+
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Happy Orders</div>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Video Showcase</h3>
            <p className="text-gray-600">Explore delicious recipes and food stories</p>
          </div>

          {/* Video Grid */}
          {first?.foodItemsOfPartner?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {first?.foodItemsOfPartner?.map((items, index) => (
                <div 
                  key={index}
                  className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  onClick={() => openVideoModal(items.video)}
                >
                  <div className="aspect-[3/4] bg-gray-200 relative">
                    <video 
                      src={items.video} 
                      className="w-full h-full object-cover"
                      muted
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
                    
                    {/* Play Button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                        <svg className="w-8 h-8 text-orange-500 ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>

                    {/* Duration Badge */}
                    <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                      <span className="text-white text-xs font-semibold">
                        {Math.floor(Math.random() * 3) + 1}:
                        {String(Math.floor(Math.random() * 60)).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Video Number */}
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-gray-800 text-xs font-bold">#{index + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl p-12 text-center">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center">
                <svg className="w-16 h-16 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">No Videos Available</h3>
              <p className="text-gray-600 text-lg">This partner hasn't uploaded any content yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Video Modal */}
        {selectedVideo && (
          <div 
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={closeVideoModal}
          >
            <button 
              className="absolute top-6 right-6 text-white p-3 hover:bg-white/10 rounded-full transition-colors"
              onClick={closeVideoModal}
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="max-w-2xl w-full">
              <video 
                src={selectedVideo}
                className="w-full rounded-2xl shadow-2xl"
                controls
                autoPlay
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        )}
      </div>
    )
}

export default Profile