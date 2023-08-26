import { useContext, useState } from 'react';
import "./GroupDetails.css"
import Modal from 'react-bootstrap/Modal';
import RenderUserIngroupChat from '../RenderUserIngroupChat/RenderUserIngroupChat';
import { chatContext } from '../../pages/ChatPage/ChatPage';
import { removeUserFromGroup } from '../../API Call/Chat';
function GroupDetails(props){
    const {selectedUser,setSelectedUser,loggedUser,selectedChat,setSelectedChat}=useContext(chatContext);
    const leaveChat=async()=>{
        props.handleHide();
        await removeUserFromGroup({users:loggedUser._id,chatId:selectedChat._id})
        setSelectedChat(null)
     }
    return(
        <Modal show={props.show} onHide={props.handleHide} backdrop="static" centered scrollable>
        <Modal.Header closeButton>
            <Modal.Title>
             <div className='Modal-title'>Group Details</div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <RenderUserIngroupChat />
        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-danger' onClick={leaveChat}>Leave group</button>
        <button className='btn btn-secondary' onClick={props.handleHide}>Close</button>
        </Modal.Footer>
    </Modal>
    )
}
export default GroupDetails;