import "./UserSearchModal.css"
import ModalUserRender from "../Modal_userRender/ModalUserRender"
import { createContext, useState } from "react";

import ClipLoader from "react-spinners/ClipLoader";
import { getUsers } from "../../API Call/Auth";
export const searchedUser=createContext();
function UserSearchModal({isModalActive,setIsModalActive}){
       
        const [loading,setLoading]=useState(false)
        const [query,setQuery]=useState("");
        const [error,setError]=useState("")
        const [searchedUsers,setSearchedUsers]=useState([]);
        const [isgoclicked,setIsgoClicked]=useState(false);
        const handleUserSearch=async()=>{
setIsgoClicked(true)
                if(query){
                        setError("")
                        setLoading(true)
                     const users=await getUsers(query);
                     setLoading(false)
                if(!users.Error){
                        setSearchedUsers(users);
                }
                else{
                        setError(users.Error);
                }
                }
                else{
                        setError("Search field cann't be empty");
                }
        }
        const handlesearchInput=(e)=>{
                setQuery(e.target.value);
                setIsgoClicked(false)
                setSearchedUsers([])
                
        }
        const handleusermodalclose = () => {
                setIsModalActive(!isModalActive);
                setQuery("");
                setSearchedUsers([])
            }
        const value={searchedUsers,isgoclicked,setIsgoClicked,query,loading,handleusermodalclose,setLoading}
    return <div className="user-modal-container">
        <div className={isModalActive?"user-modal active":"user-modal"}>
<div className="user-mpdal-header-container">
<div className="user-modal-header">
            <div className="user-modal-header-input">
            <input type="text" placeholder="Search User..." value={query} onChange={handlesearchInput}></input>
            <i class="bi bi-search"></i>
            <button onClick={handleUserSearch}>Go</button>
            </div>
           <div className="user-modal-close" onClick={handleusermodalclose}>
           <i class="bi bi-x-lg"></i>
           </div>
        </div>
</div>
{error && <p className="text-danger text-center">{error}</p>}
<div style={{display:"flex", justifyContent:"center",margin:"10px 0"}}> 
<ClipLoader color={"black"} loading={loading} size={15}/></div>
<searchedUser.Provider value={value}>
<ModalUserRender />
</searchedUser.Provider>
      
        </div>
        </div>
}
export default UserSearchModal;