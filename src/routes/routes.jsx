import React from 'react'
import{BrowserRouter as Router,Routes,Route} from "react-router-dom"
import UserRegister from '../auth_components/UserRegister'
import UserLogin from '../auth_components/UserLogin'
import FoodpartnerLogin from '../auth_components/FoodpartnerLogin'
import FoodpartnerRegister from '../auth_components/FoodpartnerRegister'
import Home from '../components/Home'
import Profile from '../components/Profile'
import CreateFood from '../components/CreateFood'
import Saved from '../components/Saved'
import ProfilePartner from "../components/ProfilePartner"


const Routesjsx = () => {
  return (
    <>
    <Router>
        <Routes>
            <Route path="/" element={<UserRegister/>}/>
            <Route path="/user/login" element={<UserLogin/>}/>
            <Route path="/food-partner/register" element={<FoodpartnerRegister/>}/>
            <Route path="/food-partner/login" element={<FoodpartnerLogin/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/create-food" element={<CreateFood/>}/>
            <Route path="/food-partner/:id" element={<Profile/>}/>
            <Route path="/self/food-partner/:id" element={<ProfilePartner/>}/>
            <Route path="/saved" element={<Saved/>}/>

        </Routes>
    </Router>
    </>
  )
}

export default Routesjsx