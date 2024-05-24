import { Button } from "../components/button"
import {InputBox} from "../components/inputform"
import {SubHeading} from "../components/subheading"
import {Heading} from "../components/heading"
import {BottomWarning} from "../components/bottomwarning"
import { MainHeading } from "../components/mainHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

export const Signup=()=>{
    const [firstName,setfirstName]=useState("")
    const [lastName,setlastName]=useState("")
    const [userName,setuserName]=useState("")
    const [password,setpassword]=useState("")
    const navigate=useNavigate()
    return <div className="bg-purple-100 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <MainHeading className="p-4"/>
            <Heading label={"Signup"}/>
            <SubHeading label={"Enter your info.."}/>
            <InputBox onChange={e=>{
                setfirstName(e.target.value)
            }} label={"First Name"} placeholder={"eg. John..."}/>
            <InputBox onChange={(e)=>{
                setlastName(e.target.value)
            }} label={"Last Name"} placeholder={"eg. Doe..."}/>
            <InputBox onChange={e=>{
                setuserName(e.target.value)
            }} label={"Username"} placeholder={"eg. johndoe@gmail.com"}/>
            <InputBox onChange={(e)=>{
                setpassword(e.target.value)
            }} label={"Password"} placeholder={"min 6 characters"}/>
            <div className="p-4">
            <Button onClick={async () => {
    try {
        const response = await axios.post('http://localhost:3000/api/v1/signup', {
            firstName,
            lastName,
            userName,
            password
        });
        
        // Make sure response.data contains the token
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
            navigate('/weather');
        } else {
            console.error("Token not found in response data");
            // Handle the case when token is not found
        }
    } catch (error) {
        console.error("Error occurred during signup:", error);
        // Handle error
    }
}} label={"Signup"}/>

            </div>
            <BottomWarning label={"Already have an account?"} />
        </div>
        </div>
    </div>
}
   