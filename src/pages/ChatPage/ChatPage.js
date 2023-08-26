import { createContext, useContext, useEffect, useState } from "react";
import UserSearchModal from "../../Component/UserSearchModal/UserSearchModal";
import "./ChatPage.css"
import useWindowSize from "../../customHooks/useWindowSize";
import Modalcomp from "../../Component/Modal/Modal";
import MyChat from "../../Component/MyChat/MyChat"
import ChatWindow from "../../Component/ChatWindow/ChatWindow";
import { useNavigate } from "react-router-dom";
import CreateGrpChatModal from "../../Component/CreateGrpChatModal/CreateGrpChatModal";
import { appcontext } from "../../App";
import { getUserById, getUsers } from "../../API Call/Auth";
import { fetchChatofUser, removeUserFromGroup } from "../../API Call/Chat";
import GroupUpdate from "../../Component/GroupUpdate/GroupUpdate";
import GroupDetails from "../../Component/GroupDetails/GroupDetails";
export const chatContext = createContext();
function Chatpage() {
    
  const [selectedPersons,setSelectedPersons]=useState([]);
    const [searcheduser,setSearcheduser]=useState("");
    const [messageLoading,setMessageLoading]=useState(true)
    const [messages,setMessages]=useState([]);
    const [selectedChat,setSelectedChat]=useState(null);
    const [selectedUser,setSelectedUser]=useState([]);
    const [fetchedUser,setFetchedUser]=useState([]);
    const [ismychatLoading,setIsmyChatLoading]=useState(false);
    const [showselectedProfile,setSelectedProfile]=useState(false);
    const [showGroupUpdate,setShowGroupUpdate]=useState(false);
    const [showGroupDetails,setShowGroupDetails]=useState(false);
    const [toAddIds,setToAddIds]=useState([])
  
    useEffect(()=>{
        console.log("selected chat",selectedChat)
    })
    const handleShowSelectedProfile=()=>{
        console.log("eye clicked",showGroupDetails,showGroupUpdate,selectedChat)
        if(!selectedChat.isGroupChat) {
           
            setSelectedProfile(!showselectedProfile);
        }
        else{
            if(selectedChat.groupAdmin._id==loggedUser._id){
            
                setShowGroupUpdate(!showGroupUpdate)
            }
            else{
                setShowGroupDetails(!showGroupDetails)
            }
        }
       
    }
    const {loggedUser,setLoggedUser}=useContext(appcontext);
    console.log("loggedUser",loggedUser);
   const getuser= async()=>{
    setIsmyChatLoading(true);
        const res= await getUserById(localStorage.getItem("id"));
         setLoggedUser(res[0])
        }
        const getChatsofUser=async()=>{
            const res=await fetchChatofUser();
            console.log(res,"ress")
            setFetchedUser(res);
        }
  
    const [isCreateGrpmodalopened, setIsCreateGrpmodalopened]=useState(false);
    const navigate = useNavigate();
    const [isImageClicked, setIsImageClicked] = useState(false);
    const handleUserModal = () => {
        setIsModalActive(!isModalActive)
    }
    const handleMyProfile = () => {
        setIsImageClicked(!isImageClicked);
        console.log("in profile")
        handleHide()
    }
    const handleLogout = () => {
        setIsImageClicked(!isImageClicked);
        localStorage.clear();
        navigate("/");
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = function(event) {
          window.history.go(1);
        };
    }
    const [isUserSelected, setIsUserSelected] = useState(false);
    const handleIsUserSelected = () => [
        setIsUserSelected(!isUserSelected)
    ]
    const [typing,setTyping]=useState(false);
    const [isTyping,setIsTyping]=useState(false)
    const [show, setShow] = useState(false);
    const handleHide = () => {
        setShow(!show)
    }
    const [isModalActive, setIsModalActive] = useState(false)

    const [width, height] = useWindowSize();
    console.log(width, height);
    console.log(isUserSelected)
    useEffect(()=>{
        
        getuser();
        getChatsofUser();
        setIsmyChatLoading(false)

    },[isModalActive,showGroupUpdate,showGroupDetails])
    const val = {
        setMessageLoading:setMessageLoading,
        messageLoading:messageLoading,
        messages:messages,
        setMessages:setMessages,
        isModalActive: isModalActive,
        isUserSelected: isUserSelected,
        setIsUserSelected: setIsUserSelected,
        handleIsUserSelected: handleIsUserSelected,
        handleHide: handleHide,
        isCreateGrpmodalopened:isCreateGrpmodalopened,
        setIsCreateGrpmodalopened:setIsCreateGrpmodalopened,
        handleUserModal:handleUserModal,
        loggedUser:loggedUser,
        setLoggedUser:setLoggedUser,
        fetchedUser:fetchedUser,
        setFetchedUser:setFetchedUser,
        setSelectedChat:setSelectedChat,
        selectedChat:selectedChat,
        selectedUser:selectedUser,
        setSelectedUser:setSelectedUser,
        handleShowSelectedProfile:handleShowSelectedProfile,
        setIsmyChatLoading:setIsmyChatLoading,
        ismychatLoading:ismychatLoading,
        selectedPersons:selectedPersons,
        setSelectedPersons:setSelectedPersons,
        searcheduser:searcheduser,
        setSearcheduser:setSearcheduser,
        typing:typing,
        setTyping:setTyping,
        isTyping:isTyping,
        setIsTyping:setIsTyping,
        setToAddIds:setToAddIds,
        toAddIds:toAddIds
    }
    return (
        <chatContext.Provider value={val}>
            <div>
                <div className="chat-header">
                    <button className="chat-header-button" onClick={handleUserModal}> <i class="fa-solid fa-magnifying-glass"></i> {width > 500 ? "Search User" : ""}</button>
                    <h3 className="chat-header-title">Kon-nect</h3>
                    <div className="chat-header-menu">
                        <i class="fa-solid fa-bell fa-lg"></i>
                        {/* <select name="head-menu" id="head-menu" onChange={handleSelectChange}>
                <option value="myprofile" >My profile</option>
                <option value="logout">Log out</option>
            </select> */}
                        <img className="profileimg" onClick={() => { setIsImageClicked(!isImageClicked) }} src={loggedUser.profilePic} />
                        {isImageClicked ? <ul className="chat-header-menu-list">
                            <li onClick={handleMyProfile}>My profile</li>
                            <li onClick={handleLogout}>Log out</li>
                        </ul> : ""}
                    </div>
                </div>
                <UserSearchModal isModalActive={isModalActive} setIsModalActive={setIsModalActive} />
                <Modalcomp title={loggedUser.userId} show={show} setShow={setShow} handleHide={handleHide} pic={loggedUser.profilePic} email={loggedUser.email} />
       {selectedChat!=null ?(selectedChat.isGroupChat==false?  <Modalcomp title={selectedUser.userId} show={showselectedProfile} handleHide={handleShowSelectedProfile} setSelectedProfile={setSelectedProfile} pic={selectedUser.profilePic} email={selectedUser.email} />:(selectedChat.groupAdmin._id==loggedUser._id?<GroupUpdate show={showGroupUpdate} handleHide={handleShowSelectedProfile}/>:<GroupDetails show={showGroupDetails} handleHide={handleShowSelectedProfile}/>)):null}       
                <div className="chat-page-main-container">
                    <div className={isUserSelected && width < 900 ? "chat-page-chatname notactive" : "chat-page-chatname"}><MyChat /></div>
                    <div className={!isUserSelected && width < 900 ? "chat-page-chatWindow notactive" : "chat-page-chatWindow"}><ChatWindow /></div>
                </div>
            </div>
            <CreateGrpChatModal />
        </chatContext.Provider>
    )
}
export default Chatpage;