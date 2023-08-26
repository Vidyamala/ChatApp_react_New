import { useContext } from "react";
import { chatContext } from "../../pages/ChatPage/ChatPage";
import "./RenderUserIngroupChat.css"
function RenderUserIngroupChat() {
    const {selectedUser}=useContext(chatContext)
    return (
        <div className="render-groupuser-container">
          {
            selectedUser.map((data)=>{
                return(
                    <div className="render-groupuser">
                    <div className="render-groupuser-img">
                        <img src={data.profilePic}></img>
                    </div>
                    <div className="render-groupuser-description">
                        <p className="render-groupuser-name">{data.userId}</p>
                        <p>{data.email}</p>
                    </div>
                </div>
                )
            })
          }
        </div>
    )
}
export default RenderUserIngroupChat;