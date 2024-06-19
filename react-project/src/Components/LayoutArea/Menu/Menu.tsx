import { NavLink, useNavigate } from "react-router-dom";
import "./Menu.css";
import { useSelector } from "react-redux";
import { AppState, store } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";


export function Menu(): JSX.Element {

    const user = useSelector<AppState, UserModel>(store => store.user);

    return (
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>

            {user &&<NavLink to="/likes_stats">Likes statistics</NavLink>}

            {user &&<NavLink to="/vacations_stats">Vacations Statistic</NavLink>}

            {user &&<NavLink to="/total_users">Total Users</NavLink>}

            {user &&<NavLink to="/total_likes">Total Likes</NavLink>}

            <NavLink to="/about">About</NavLink> 

        </div>
    );
}
