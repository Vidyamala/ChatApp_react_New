import useWindowSize from "../../customHooks/useWindowSize"
import RenderMyChat from "../RenderMyChat/RenderMyChat"
import "./MyChat.css";
import { chatContext } from "../../pages/ChatPage/ChatPage";
import { useContext } from "react";
import ClipLoader from "react-spinners/ClipLoader";
function MyChat(){
    var {isModalActive,setIsCreateGrpmodalopened,ismychatLoading}=useContext(chatContext);
    const [width,height]=useWindowSize();
    return(
       
       
   
    <div className="MyChat-container">
        
      {isModalActive?"":<div className="MyChat-header">
            <h3>My Chat</h3>
            <button onClick={()=>{setIsCreateGrpmodalopened(true)}}><i style={{color:"black"}} className="bi bi-plus-lg"></i> {width<1080 && width>900?"":"New Group Chat "}</button>
        </div> }

      <div style={{display:"flex",justifyContent:'center',marginTop:"0.5rem"}}><ClipLoader color={"black"} loading={ismychatLoading} size={25}/></div>  
        <RenderMyChat  />
    
      
     </div>
         
    )
}
export default MyChat