import "./TotalUsers.css";
import React, { useEffect, useState } from "react";
import { userService } from "../../../Services/UserService"; 
import { notify } from "../../../Utils/Notify"; 
import { useTitle } from "../../../Utils/UseTitle"; 
import Card from "@mui/material/Card"; // Importing the Card component from Material-UI
import CardContent from "@mui/material/CardContent"; // Importing the CardContent component from Material-UI
import Typography from "@mui/material/Typography"; // Importing the Typography component from Material-UI
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";


export function TotalUsers(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            notify.error("You are not logged in.");
            navigate("/login")
        }
    }, []);

    useTitle("Total Users"); 

    // State for storing the total users
    const [totalUsers, setTotalUsers] = useState<number>();

    // Fetching total users from the server on component mount
    useEffect(() => {
        userService.getTotalUsers()
            .then(total => {
                setTotalUsers(total); // Setting the total users in the state
            })

            .catch(err => notify.error(err)); // Handling errors

    }, []); 

    // Rendering the component
    return (
        <div className="TotalUsers"> 
            <h1>Users Statistics:</h1> 
            <div className="cardContainer"> 
                <Card className="card"> 
                    <CardContent> 

                        <Typography variant="h4" component="div"> {/* Typography component for displaying the total users */}
                            Total Users:
                            <br></br> {/* Line break */}
                            {totalUsers} {/* Displaying the total users */}
                        </Typography>

                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default TotalUsers; 
