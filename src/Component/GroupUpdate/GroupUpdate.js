import { useContext, useState } from 'react';
import "./GroupUpdate.css"
import Modal from 'react-bootstrap/Modal';
import GroupBadge from '../GroupBadge/GroupBadge';
import { chatContext } from '../../pages/ChatPage/ChatPage';
import { addUserToGroup, removeUserFromGroup, renameGroupChat } from '../../API Call/Chat';
import { selectedChatCompare } from '../ChatWindow/ChatWindow';
import { getUsers } from '../../API Call/Auth';
import SearchRender from '../SearchRender/SearchRender';
import Badges from '../Badges/Badges';
import SearchRenderGrpAdd from '../SearchRenderGrpAdd/SearchRenderGrpAdd';
function GroupUpdate(props){
    
    const {selectedUser,setSelectedUser,loggedUser,selectedChat,setSelectedChat,setSearcheduser,setToAddIds,toAddIds}=useContext(chatContext);
    const [groupname,setGroupName]=useState(selectedChat.chatName)
    const [error,setError]=useState("")
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
        var temp=[]
       for(var i=0;i<res.length;i++){
        let flag=false
        for(var j=0;j<selectedUser.length;j++){
            if(res[i]._id==selectedUser[j]._id){
                flag=true;
            }
        }
        if(!flag) temp.push(res[i]);
       }
       res=[]
       for(var i=0;i<temp.length;i++){
        let flag=false;
        for(var j=0;j<toAddIds.length;j++){
            if(temp[i]._id==toAddIds[j]._id){
                flag=true
            }
        }
        if(!flag) res.push(temp[i]);
       }

         setError("")
      }
     if(res.length>3) res.length=3;
     setSearcheduser(res)
     console.log(res,e.target.value)
    },500)
    }
    const leaveChat=async()=>{
        props.handleHide();
        await removeUserFromGroup({users:loggedUser._id,chatId:selectedChat._id})
        setSelectedChat(null)
     }
     const renameGroup=async()=>{
        await renameGroupChat({chatName:groupname,chatId:selectedChat._id});
        setSelectedChat({...selectedChat,chatName:groupname})
     }
     const handleNameChange=(e)=>{
        setGroupName(e.target.value)
     }
     const handlehide=()=>{
        props.handleHide();
        setGroupName(selectedChat.chatName)
     }
     const AddUsersToGrp=async()=>{
        var ids=[];

        console.log(toAddIds)
        for(var i=0;i<toAddIds.length;i++){
            ids.push(toAddIds[i]._id);
        }
        setSelectedUser([...selectedUser,...toAddIds]);
        var payload={
            users:ids,
            chatId:selectedChat._id
        }
        setToAddIds([])
        await addUserToGroup(payload)
     }
    return(
        <Modal show={props.show} onHide={handlehide} backdrop="static" centered scrollable>
        <Modal.Header closeButton>
            <Modal.Title>
             <div className='Modal-title'>Group Update</div>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
             <div className='grpupdate-body-chatname'>
                <input  className="form-control input-chatname" value={groupname} onChange={handleNameChange} type='text'></input>
                <button className="form-control btn btn-primary button-update" onClick={renameGroup}>Update</button>
             </div>
             <GroupBadge selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
             <div className='grpupdate-body-chatname'>
                <input  className="form-control input-chatname" onKeyUp={handlekeyup} placeholder="Enter userId to be added..." type='text'></input>
                
             </div>
             <div className='group-add'>
                <Badges selectedPersons={toAddIds} setSelectedPersons={setToAddIds}/> 
                <button className="form-control btn btn-primary button-update" onClick={AddUsersToGrp}>Add</button>
             </div>
             
             <SearchRenderGrpAdd />
        </Modal.Body>
        <Modal.Footer>
        <button className='btn btn-danger' onClick={leaveChat}>Leave group</button>
        <button className='btn btn-secondary' onClick={handlehide}>Close</button>
        </Modal.Footer>
    </Modal>
    )
}
export default GroupUpdate;