import axios from "axios"
const BASE_URL = process.env.REACT_APP_BACKEND_URL;
export const fetchMessagesOfChat=async(id)=>{
    console.log(id,"cahtid")
    const res=await axios.get(`${BASE_URL}/chatapp/api/v1/getmessagebychatid?chatId=${id}`,{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data.length,"data",typeof (res.data), typeof [])
    return res.data;  
}
export const sendMessages=async(id,content)=>{
    const res=await axios.post(`${BASE_URL}/chatapp/api/v1/sendMessage`,{
        "chatId":id,
        "content":content
    
    },{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data,"sendMessage user")
    return res.data;
}