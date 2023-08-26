import { createContext, useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { chatContext } from '../../pages/ChatPage/ChatPage';
import Badges from '../Badges/Badges';
import ModalUserRender from '../Modal_userRender/ModalUserRender';
import SearchRender from '../SearchRender/SearchRender';
import "./CreateGrpChatModal.css"
import {getUsers} from "../../API Call/Auth"
import {createGrp} from "../../API Call/Chat"
function CreateGrpChatModal(props){
    const [chatname,setChatname]=useState("");
    const [error,setError]=useState("")
   
 
   var {setIsCreateGrpmodalopened,setFetchedUser,fetchedUser,isCreateGrpmodalopened,searcheduser,selectedPersons,setSelectedPersons,setSearcheduser}=useContext(chatContext);
   const handleInputChange=(e)=>{
        setChatname(e.target.value);
   }
  var timer;
   const handlekeyup=async(e)=>{
    !e.target.value && setSearcheduser([])
    clearTimeout(timer);
    var res;
   timer=setTimeout(async()=>{
     res= await getUsers(e.target.value);
     if(res.message) {
        setError(res.message);
        setSearcheduser([]);
        return;
     }
     else{
        setError("")
     }
    if(res.length>3) res.length=3;
    setSearcheduser(res)
    console.log(res,e.target.value)
   },500)
   }
   const handlegrpchatmodal=()=>{
    setIsCreateGrpmodalopened(false);
    setError("");
    setSearcheduser([]);
    setSelectedPersons([]);
   }
   const handleCreateGrp=async ()=>{
    const selectedPersonsId=[];
    selectedPersons.map((data)=>{
        selectedPersonsId.push(data._id);
       
    })
    const payload={
        chatName:chatname,
        users:selectedPersonsId
    }
    const res=await createGrp(payload);
    setFetchedUser([...res,...fetchedUser])
    handlegrpchatmodal()
   }
    return(
        <Modal show={isCreateGrpmodalopened} onHide={()=>{handlegrpchatmodal()}} backdrop="static" centered scrollable>
            <Modal.Header closeButton>
                <Modal.Title>
                 <div className='Modal-title'> Create Group</div>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                  <input type="text" placeholder='Chat name' onChange={handleInputChange} className='form-control my-2 shadow-none input-style'></input>
                  <Badges selectedPersons={selectedPersons} setSelectedPersons={setSelectedPersons}/>
                  <input type="text" placeholder='Add person' onKeyUp={handlekeyup} className='form-control my-2 shadow-none input-style'></input>
                 
                    {error && <h5 className='matchnotfound'>{error}</h5>}
                  <SearchRender />
            </Modal.Body>
            <Modal.Footer>
            <button className='btn btn-secondary' onClick={()=>{setIsCreateGrpmodalopened(false)}}>Close</button>
            <button className='btn btn-primary' onClick={handleCreateGrp} >Create Group</button>
            </Modal.Footer>
        </Modal>
    )
}
export default CreateGrpChatModal;