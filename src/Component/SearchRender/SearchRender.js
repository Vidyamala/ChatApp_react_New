import "./SearchRender.css"
import { userData } from "../../DummyData/userData";
import { createGrp } from "../CreateGrpChatModal/CreateGrpChatModal";
import { useContext } from "react";
import {chatContext} from "../../pages/ChatPage/ChatPage"
function SearchRender() {
    var {searcheduser,selectedPersons,setSelectedPersons}=useContext(chatContext);
    const addUser=(user)=>{
        setSelectedPersons([...selectedPersons,user])
    }
    return (
        <div className="Search-render-container">
          {
           searcheduser && searcheduser.map((data)=>{
                return(
                    <div key={data._id} className="Search-render" onClick={()=>addUser(data)}>
                    <div className="Search-render-img">
                        <img src={data.profilePic}></img>
                    </div>
                    <div className="search-render-content">
                        <p className="search-render-content-userId">{data.userId}</p>
                        <p>{data.email}</p>
                    </div>
                </div>
                )
            })
          }
        </div>
    )
}
export default SearchRender;