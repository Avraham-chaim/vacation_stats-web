import { useSelector } from "react-redux";
import "./UserMenu.css";
import { AppState, store } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";
import { NavLink, useNavigate } from "react-router-dom";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";

export function UserMenu(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    function logout() {
        userService.logout();
        notify.success("Bye Bye👋🏼👋🏼");
        navigate("/home")
    }

    function getGreeting(): string {
        const hour = new Date().getHours();
        if (hour < 12) return "Good Morning🥱,";
        if (hour < 18) return "Good Afternoon🌞,";
        if (hour < 22) return "Good Evening🌆,";
        return "Good Night🌛,";
    }

    return (
        <div className="UserMenu">
            {
                !user && <div>
                    Hello Guest | 
                    <NavLink to="/login">Login</NavLink>  
                </div>    
            }
            {
                user && <div>
                    {getGreeting()} {user.first_name} {user.last_name} | 
                    <NavLink to="" onClick={logout}>Logout</NavLink>
                </div>    
            } 
        </div>
    );
}
