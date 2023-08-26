
import { userData } from "../../DummyData/userData";
import "./RenderMyChat.css"
import { chatContext } from "../../pages/ChatPage/ChatPage";
import { useContext, useEffect } from "react";
import { accessChat } from "../../API Call/Chat";
import {socket} from "../ChatWindow/ChatWindow"
function RenderMyChat() {
    var {setIsUserSelected,fetchedUser,loggedUser,setSelectedChat,selectedChat,selectedUser,setSelectedUser,messageLoading,setMessageLoading,setMessages}=useContext(chatContext);
    console.log(fetchedUser,"fetchedUser");
    const getUsers=(users)=>{
       
       const filteredUser= users.filter((user)=>{
            return user._id!=loggedUser._id
        })
        return filteredUser;
    }
    const handleclick=async(data)=>{
      
        setIsUserSelected(true);
        setSelectedChat(data);
       if(!data.isGroupChat) {
        setSelectedUser(getUsers(data.users)[0]);
       }
       else{
        setSelectedUser(getUsers(data.users))
       }
       console.log(messageLoading,"messageLoading")
    }

    useEffect(()=>{
        setMessageLoading(true)
        console.log(selectedChat,"chatssssss")
      setMessages([])
   selectedChat && socket.emit("join chat",selectedChat._id)
    },[selectedChat])
    return (
        <div className="MyChat-render-container">
            {
                fetchedUser.map((data) => {
                    return (
                        <div onClick={()=>handleclick(data)} className="MyChat-chats">
                            {data.isGroupChat && <p>{data.chatName}</p>}
                            {!data.isGroupChat && <p className="user">{getUsers(data.users)[0].userId}</p>}
                           {data.latestMessage && <div style={{fontSize:"0.98rem"}}> <span>{data.latestMessage.sender.userId}</span>:  <span>{ data.latestMessage.content}</span></div> } 
                        </div>
                    )
                })
            }
        </div>
    )
}
export default RenderMyChat;