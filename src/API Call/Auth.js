import axios from "axios"
export const login=async(userDetails)=>{
  
   try{
   const res=await axios.post("http://localhost:8000/chatapp/api/v1/signin",
        userDetails
    )
    return res.data;
   }
   catch(e){
    console.log(e.response.data,"EEEEEEEEEEEEEE")
    return {"Error":e.response.data.message}
   }
}
export const signup=async(userDetails)=>{
    
   try{
   const res=await axios.post("http://localhost:8000/chatapp/api/v1/signup",
        userDetails
    )
    return res.data;
   }
   catch(e){
    console.log(e.response.data,"EEEEEEEEEEEEEE")
    return {"Error":e.message}
   }
}
export const getUsers=async(query)=>{
    let axiosConfig = {
        headers: {
           token:localStorage.getItem("token")
        }
      };
      var res;
    try{
      res=await axios.get(`http://localhost:8000/chatapp/api/v1/getusers?match=${query}`,  
        axiosConfig);
        return res.data;
    }
    catch(e){
        return {e};
        }
}
export const getUserById=async (id)=>{
    console.log(id,localStorage.getItem("token"))
    let axiosConfig = {
        headers: {
           token:localStorage.getItem("token")
        }
      };
    try{
        const res=await axios.get(`http://localhost:8000/chatapp/api/v1/getUserById/${id}`,  
        axiosConfig);
        return res.data;
        return "hi"
    }
    catch(e){
        return {"Error":e.response.data.message};
        }
}