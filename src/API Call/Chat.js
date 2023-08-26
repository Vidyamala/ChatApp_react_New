import axios from "axios"

export const fetchChatofUser=async(id)=>{
    const res=await axios.get("http://localhost:8000/chatapp/api/v1/fetchchatofUser",{headers:{
        "token":localStorage.getItem("token")
    }})
    return res.data;
}
export const accessChat=async(id)=>{
    const res=await axios.post("http://localhost:8000/chatapp/api/v1/accessChat",{userId:id},{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data,"accesschatof user")
    return res.data;
}
export const createGrp=async(payload)=>{
    const res=await axios.post("http://localhost:8000/chatapp/api/v1/createGroupchat",payload,{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data,"Group chat created")
    return res.data;
}
export const addUserToGroup=async(payload)=>{
    const res=await axios.put("http://localhost:8000/chatapp/api/v1/addusertogroup",payload,{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data,"user Added to group chat")
    return res.data;
}
export const removeUserFromGroup=async(payload)=>{
   try{
    const res=await axios.put("http://localhost:8000/chatapp/api/v1/removeuserfromgroup",payload,{headers:{
        "token":localStorage.getItem("token")
    }})
    console.log(res.data,"User Removed From group")
    return res.data;
   }
   catch(e){
    return e.message;
   }
}
export const renameGroupChat=async(payload)=>{
    try{
     const res=await axios.put("http://localhost:8000/chatapp/api/v1/renamegroupchat",payload,{headers:{
         "token":localStorage.getItem("token")
     }})
     console.log(res.data,"Renamed group")
     return res.data;
    }
    catch(e){
     return e.message;
    }
 }
