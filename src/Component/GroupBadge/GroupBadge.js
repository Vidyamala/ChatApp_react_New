import { useContext } from "react"
import { removeUserFromGroup } from "../../API Call/Chat"
import { chatContext } from "../../pages/ChatPage/ChatPage"
import "./GroupBadge.css"
function GroupBadge({ setSelectedUser, selectedUser }) {
   const {selectedChat}=useContext(chatContext)
    const removePerson=(item)=>{
        console.log(selectedChat._id,"itemmmmmmmmmmmmmmmmmmmmms")
      const payload={
        users:item._id,
        chatId:selectedChat._id
      }
    const res= removeUserFromGroup(payload)
    console.log(res,"res from remove user")
      const newselected=  selectedUser.filter((i)=>{
           return i.userId!=item.userId
        })
        setSelectedUser(newselected)
    }
    return (
        <div className="badge-container">
            {selectedUser.map((item) => {
                return <div className="badges">
                    <div className="userId">{item.userId}</div>
                    <div className={"close"} onClick={()=>{removePerson(item)}}> <i class="bi bi-x"></i></div>
                </div>
            })}
        </div>
    )
}
export default GroupBadge;






