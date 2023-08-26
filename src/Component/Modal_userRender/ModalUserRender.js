import { useContext } from "react";
import { accessChat } from "../../API Call/Chat";
import { searchedUser } from "../UserSearchModal/UserSearchModal";
import "./ModalUserRender.css"

// import { userData } from "../../DummyData/userData";
function ModalUserRender() {
    const {searchedUsers,isgoclicked,setIsgoClicked,query,loading,handleusermodalclose,setLoading}=useContext(searchedUser);
    console.log(searchedUsers,"userData");
    const handleClick=async(data)=>{
        setLoading(true);
       const res= await accessChat(data._id);
       console.log(res,"resss");
       handleusermodalclose();
       setLoading(false)

    }
    return (
        <div className="User-render-container">
          { searchedUsers.length>0 &&
            searchedUsers.map((data)=>{
                return(
                    <div className="User-render" onClick={()=>handleClick(data)} >
                    <div className="User-render-img">
                        <img src={data.profilePic}></img>
                    </div>
                    <div className="User-render-description">
                        <p className="User-render-description-name">{data.userId}</p>
                        <p>{data.email.length<=20?data.email:`${data.email.slice(0,20)}...` }</p>
                    </div>
                </div>
                )
            }) 
          }
          {!loading &&query && isgoclicked && searchedUsers.length==0 && <p className="text-center notfoundtext mx-10">No Match Found</p>}
        </div>
    )
}
export default ModalUserRender;







