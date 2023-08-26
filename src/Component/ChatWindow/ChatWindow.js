import { useContext, useEffect, useRef, useState } from "react";
import useWindowSize from "../../customHooks/useWindowSize"
import { chatContext } from "../../pages/ChatPage/ChatPage";
import "./ChatWindow.css"
import ClipLoader from "react-spinners/ClipLoader";
import RenderMyChat from "../RenderMyChat/RenderMyChat";
import RenderMessage from "../RenderMessage/RenderMessage";
import { Send } from "react-bootstrap-icons";
import {sendMessages} from "../../API Call/Message";
import { appcontext } from "../../App";
import io from "socket.io-client";
var socket,selectedChatCompare;
export {socket,selectedChatCompare};
function ChatWindow(){
    selectedChatCompare=selectedChat;
    const dummy=useRef(0);
    const {loggedUser,setLoggedUser}=useContext(appcontext);
   
   const ENDPOINT = "http://localhost:8000";
  
    const [messageSending,setMessageSending]=useState(false)
    var {isUserSelected,setIsUserSelected,fetchedUser,setFetchedUser,setSelectedChat,handleIsUserSelected,handleHide,selectedChat,handleShowSelectedProfile,messages,setMessages,selectedUser,messageLoading}=useContext(chatContext);
    
    useEffect(()=>{
        socket=io(ENDPOINT);
        socket.emit("set up",loggedUser);
       },[])
    const [width,height]=useWindowSize();
    const [scrool,setScrool]=useState(true);
    const [content,setContent]=useState("");
    const handleContentChange=(e)=>{
        setContent(e.target.value);
        console.log(content)
    }
    
    const sendMessage=async(contentt)=>{
       
        setScrool(!scrool);
        setContent("")
        setMessages([...messages,{chat:selectedChat._id,
        content: contentt,
        sender: loggedUser,
        _id:"64c7841e7044412345677"}])
       var messagesent= await sendMessages(selectedChat._id,contentt);
      
       socket.emit("new message",messagesent)
            
      var sam=fetchedUser.filter((data)=>{
       return data._id!=selectedChat._id
      })
      const dum={...selectedChat,latestMessage:messagesent};
      console.log(dum,"dummmmm")
      console.log(fetchedUser,"fetcheddd")
      setFetchedUser([dum,...sam])
        
    }
    useEffect(() => {
        console.log("socket on")
       socket.on("message recieved",(newmessage)=>{
        setMessages([...messages,newmessage]);
        console.log("socket on executed")
       })
      });
    
    useEffect(() => {
      if(selectedChat) { dummy.current.scrollIntoView({ behavior: "smooth" });}
      },[scrool,messages])
     return(<>
    
        {selectedChat &&
         
  <div className="ChatWindow-container">
   <div className="ChatWindow-Header">

  <div className="selecteduserDetails">
  {width<900? <i class="bi bi-arrow-left-circle fa-2x" onClick={()=>{setIsUserSelected(false)}}></i>:""}
 {(!selectedChat.isGroupChat) && <img className="profilepic" src={selectedUser.profilePic}></img>}
       <h4 className="mx-2">{selectedChat.chatName=="sender"? selectedUser.userId:selectedChat.chatName}</h4>
  </div>
       <i onClick={handleShowSelectedProfile} class="bi bi-eye-fill fa-2x"></i>
   </div>
   <div className="message-container">
       <div className="messages">
     
       <RenderMessage />
   
       <div ref={dummy}></div>
       
       </div>
   </div>
   { messageSending &&
       <div className="messagesending">
       <ClipLoader color={"black"} loading={messageSending} size={15}/>
       </div>
    } 
   { messageLoading &&
        <div className="loader">
     <ClipLoader color={"black"} loading={messageLoading} size={35}/>
     </div>
  }
   {
      (messages.length==0 && !messageLoading) && <div className="noMessages">
        
    <h4>Say hi to start the chat!</h4>
    <button className="btn btn-primary" onClick={()=>{sendMessage("hi")}}>Say hi</button>
</div>
} 
   <div className="message-send">
       <input type="text" value={content} onChange={handleContentChange}></input>
       <button onClick={()=>{sendMessage(content)}} className="btn btn-primary">{width<500?<i class="bi bi-send"></i>:"Send"} </button>
   </div>
 
</div> 

} 
{
    !selectedChat && 
    <div className="chatNotSelected">
      <h4> Select a chat to start chatting! </h4> 
    </div>


}

</>
) 
}
export default ChatWindow