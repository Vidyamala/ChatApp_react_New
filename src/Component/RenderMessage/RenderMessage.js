import "./RenderMessage.css"
import { message } from "../../DummyData/message";
import { useContext, useEffect, useState } from "react";
import { chatContext } from "../../pages/ChatPage/ChatPage";
import { fetchMessagesOfChat } from "../../API Call/Message";
import {appcontext} from "../../App"
import {socket,selectedChatCompare} from "../ChatWindow/ChatWindow"
function RenderMessage() {
    const {loggedUser,setLoggedUser}=useContext(appcontext);
    const {selectedChat,messages,setMessages,messageLoading,setMessageLoading}=useContext(chatContext);
    
    const [mes,setMes]=useState([]);
    const fetchmes=async()=>{
        console.log(selectedChat,"selectedchatssssss")
       if(selectedChat._id){
        let mes= await fetchMessagesOfChat(selectedChat._id);
       
        setMessages(mes);
        setMessageLoading(false)
       } 
    }
   
   
    useEffect(()=>{
       fetchmes();
       console.log(messages,"messages")
    },[selectedChat])
  
    return (
        <div className="message-render-container">
      {  
        messages.length!=0 &&
         <>
         {
            messages.map((data,index)=>{

                return(
                    <div className={data.sender._id===loggedUser._id? "message-render isloggeduser":"message-render"}>
                {!(data.sender._id===loggedUser._id) &&  <div className="message-render-img">
                        <img src={data.sender.profilePic}></img>
                    </div>}
                    <div className={(data.sender._id===loggedUser._id)? "message-render-description loggeduser":"message-render-description"}>
                        <p className={(data.sender._id===loggedUser._id)? "message-render-description-name isloggedusername":"message-render-description-name"}>{data.sender.userId}</p>
                       <p className={(data.sender._id===loggedUser._id)? "message-render-content isloggedusermsg":"message-render-content"}>{data.content}</p>
                    </div>
                   
                </div>
                )
            
            })
         }
        </>
        
          }
        </div>
    )
}
export default RenderMessage;
