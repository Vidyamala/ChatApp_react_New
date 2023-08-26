import { useContext, useState } from "react";
import "./Auth.css"
import { useNavigate } from "react-router-dom";
import { login, signup } from "../../API Call/Auth";
import ClipLoader from "react-spinners/ClipLoader";
import { appcontext } from "../../App";
function Auth() {
    const [userDetails, setUserDetails] = useState({ userId: "", password: "", email: "", profilePic: "" });
    //userId,password,email,profilePic
    const {setLoggedUser,loggedUser}=useContext(appcontext)
    const [loading,setLoading]=useState(false);
    const [error, setError] = useState("")
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate()
    const handleTabs = (e) => {
        setError("");
        setUserDetails({ userId: "", password: "", email: "", profilePic: "" })
        if (e.target.innerText == "Log In") setIsLogin(true);
        else if (e.target.innerText == "Sign Up") setIsLogin(false)
    }
    const HandleAuth = async (e) => {
        e.preventDefault();
        setError("")
        console.log(isLogin, "islogin")
        if (isLogin) {
            if (!userDetails.userId) {
                setError("UserId is required");
                return;
            }
            if (!userDetails.password) {
                setError("Password is required");
                return;
            }
            setLoading(true)
            const inputDetails = { userId: userDetails.userId, password: userDetails.password }
            const res = await login(inputDetails);
            setLoading(false)
            console.log(res.Error, "res")
            if (res.token) {
                setLoggedUser(res);
                localStorage.setItem("token",res.token);
                localStorage.setItem("id",res.user._id)
                setUserDetails({ userId: "", password: "", email: "", profilePic: "" });
                navigate("/chat")
            }
            else {
                if (!res.Error) setError("Invalid userId or password");
                else if (res.Error == "Network Error" || res.Error=="Request failed with status code 403") setError("Invalid userId or password");
                else setError(res.Error)

            }
        }
        if (!isLogin) {
            if (!userDetails.userId) {
                setError("UserId is required");
                return;
            }
            if (!userDetails.password) {
                setError("Password is required");
                return;
            }

            if (!userDetails.email) {
                setError("Email is required");
                return;
            }
            
            setLoading(true)
            if(userDetails.profilePic){
                const inputDetails = { userId: userDetails.userId, password: userDetails.password,profilePic:userDetails.profilePic,email:userDetails.email }
            }
            const inputDetails = { userId: userDetails.userId, password: userDetails.password,email:userDetails.email }
            const res = await signup(inputDetails);
            setLoading(false)
            console.log(res, "res")
            if (res._id) {
                setUserDetails({ userId: "", password: "", email: "", profilePic: "" });
                setIsLogin(true);
            

            }
            else {
                // if (!res.Error) setError("Invalid userId or password");
                // else if (res.Error == "Network Error" || res.Error=="Request failed with status code 403") setError("Invalid userId or password");
                 setError(res.Error)

            }
        }

    }
    const handleInputChange = (e) => {
        if (e.target.name == "userId") {
            setUserDetails({ ...userDetails, userId: e.target.value });
        }
        else if (e.target.name == "email") {
            setUserDetails({ ...userDetails, email: e.target.value });
        }
        else if (e.target.name == "password") {
            setUserDetails({ ...userDetails, password: e.target.value });
        }
        else if (e.target.name == "profilePic") {
            setUserDetails({ ...userDetails, profilePic: e.target.files[0] });
        }
    }
    return (
        <div className="auth-main-container">
            <div className="auth-container">
                <div className="format">
                    <div className="auth-title">Kon-nect</div>
                    <div className="auth-tabs">
                        <div className={`auth-tab-div ${isLogin ? "bg-info" : ""}`} onClick={handleTabs} >Log In</div>
                        <div className={`auth-tab-div ${isLogin ? "" : "bg-info"}`} onClick={handleTabs}>Sign Up</div>
                    </div>
                    <div className="auth-form-container">
                        <form className="auth-form">
                            <label>User Id:</label>
                            <input name={"userId"} className="form-control shadow-none" value={userDetails.userId} onChange={(e) => handleInputChange(e)} type="text"></input>
                            {!isLogin && <><label>Email:</label>
                                <input name="email" className="form-control shadow-none" value={userDetails.email} onChange={(e) => handleInputChange(e)} type="email"></input></>}
                            <label>Password:</label>
                            <input name="password" className="form-control shadow-none" value={userDetails.password} onChange={(e) => handleInputChange(e)} type="password"></input>
                            {!isLogin && <><label>Profile Picture:</label>
                                <input name="profilePic" className="form-control" onChange={(e) => handleInputChange(e)} type="file"></input></>}
                            {error && <p style={{ color: "red" }} className="text-center">{error}</p>}
                            <button className="form-control btn btn-primary login" onClick={HandleAuth}>{isLogin ? "Log In" : "Sign Up"} &nbsp;<ClipLoader color={"white"} loading={loading} size={15}
                            /></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Auth;