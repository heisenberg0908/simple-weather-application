import { Button } from "../components/button"
import {InputBox} from "../components/inputform"
import {SubHeading} from "../components/subheading"
import {Heading} from "../components/heading"
import {BottomWarning} from "../components/bottomwarning"
import { MainHeading } from "../components/mainHeading"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export const Signin=()=>{
    const [userName,setuserName]=useState("")
    const [password,setpassword]=useState("")
    const navigate =useNavigate()


    return <div className="bg-purple-50 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
            <MainHeading className="p-4"/>
            <Heading label={"Signin"}/>
            <SubHeading label={"Enter your info.."}/>
            <InputBox onChange={(e)=>{
                setuserName(e.target.value)
            }} label={"Username"} placeholder={"eg. johndoe@gmail.com"}/>
            <InputBox onChange={(e)=>{
                setpassword(e.target.value)
            }} label={"Password"} placeholder={"min 6 characters"}/>
            <div className="p-4">
                <Button onClick={async ()=>{
                    const response=await axios.post('http://localhost:3000/api/v1/signin',{
                        userName,
                        password
                    })
                    localStorage.setItem('token',response.data.token)
                    navigate('/weather')
                }} label={"Signin"}/>
            </div>
            <BottomWarning label={"Don't have an account?"} />
        </div>
        </div>
    </div>
}
   