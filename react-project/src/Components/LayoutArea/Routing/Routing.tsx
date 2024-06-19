import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { About } from "../../AboutArea/About/About";
import { VacationsStats } from "../../StatisticArea/VacationsStats/VacationsStats";
import { TotalUsers } from "../../StatisticArea/TotalUsers/TotalUsers";
import { PageNotFound } from "../PageNotFound/PageNotFound";
import { Login } from "../../UserArea/login/login"; 
import { TotalLikes } from "../../StatisticArea/TotalLikes/TotalLikes";
import { LikesStats } from "../../StatisticArea/LikesStats/LikesStats";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
            
            <Routes>
            
                <Route path="/login" element={<Login/>} />

                <Route path="/home" element={<Home/>} />

                <Route path="/vacations_stats" element={<VacationsStats />} />

                <Route path="/likes_stats" element={<LikesStats />} />

                <Route path="/total_users" element={<TotalUsers />} />

                <Route path="/total_likes" element={<TotalLikes />} />

                <Route path="/about" element={<About/>} />

                {/* default rout */}
                <Route path="/" element={<Navigate to="/home"/>} />

                {/* page not found 404*/}
                <Route path="*" element={<PageNotFound />}/>

            </Routes>

        </div>
    );
}
