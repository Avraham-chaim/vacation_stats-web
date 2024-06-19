import "./TotalLikes.css";
import React, { useEffect, useState } from "react";
import { notify } from "../../../Utils/Notify"; 
import { useTitle } from "../../../Utils/UseTitle"; 
import Card from "@mui/material/Card"; // Importing the Card component from Material-UI
import CardContent from "@mui/material/CardContent"; // Importing the CardContent component from Material-UI
import Typography from "@mui/material/Typography"; // Importing the Typography component from Material-UI
import { likeService } from "../../../Services/LikeService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";


export function TotalLikes(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            notify.error("You are not logged in.");
            navigate("/login")
        }
    }, []);

    useTitle("Total Likes"); 

    // State for storing the total likes
    const [totalLikes, setTotalLikes] = useState<number>();

    // Fetching total likes from the server on component mount
    useEffect(() => {
        likeService.getTotalLikes()
            .then(total => {
                setTotalLikes(total); // Setting the total likes in the state
            })
            .catch(err => notify.error(err)); // Handling errors
    }, []); 

    // Rendering the component
    return (
        <div className="TotalLikes"> 
            <h1>Total Likes:</h1> 
            <div className="cardContainer"> 
                <Card className="card"> 
                    <CardContent> 

                        <Typography variant="h4" component="div"> {/* Typography component for displaying the total likes */}
                            Total Likes:
                            <br></br> 
                            {totalLikes} {/* Displaying the total likes */}
                        </Typography>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TotalLikes; 