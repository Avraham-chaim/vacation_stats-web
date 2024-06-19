import React, { useEffect, useState } from "react";
import { likeService } from "../../../Services/LikeService"; // Importing the likeService for fetching like statistics
import { notify } from "../../../Utils/Notify"; // Importing the notify function for displaying error notifications
import { useTitle } from "../../../Utils/UseTitle"; // Importing the useTitle hook for setting the title of the page
import "./LikesStats.css"; 
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";

export function LikesStats(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            notify.error("You are not logged in.");
            navigate("/login")
        }
    }, []);

    useTitle("Likes Statistics"); // Setting the title of the page

    // State for storing the like statistics
    const [likesStats, setLikesStats] = useState<{ destination: string; likes: number }[]>([]);

    // Fetching like statistics from the server on component mount
    useEffect(() => {
        likeService.getLikesStats()
            .then(stats => {
                setLikesStats(stats); // Setting the like statistics in the state
            })
            .catch(err => notify.error(err)); // Handling errors
    }, []); 

    // Rendering the component
    return (
        <div className="LikesStats"> 
            <h1>Likes Statistics:</h1> 
            <div className="likeStatsContainer"> 
                {likesStats.map((stat, index) => ( // Mapping over the like statistics and rendering each statistic

                    <div key={index} className="likeStat"> {/* Container for each statistic */}

                        <div className="destination">{stat.destination}</div> {/* Displaying the destination */}
                        <div className="likes">Likes: {stat.likes}</div> {/* Displaying the number of likes */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default LikesStats; 
