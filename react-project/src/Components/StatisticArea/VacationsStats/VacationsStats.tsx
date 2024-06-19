import React, { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel"; 
import { vacationsService } from "../../../Services/VacationsService"; 
import { notify } from "../../../Utils/Notify"; 
import { useTitle } from "../../../Utils/UseTitle"; 

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppState } from "../../../Redux/state";
import { UserModel } from "../../../Models/UserModel";


export function VacationsStats(): JSX.Element {
    const user = useSelector<AppState, UserModel>(store => store.user);
    const navigate = useNavigate();

    useEffect(()=>{
        if (!user) {
            notify.error("You are not logged in.");
            navigate("/login")
        }
    }, []);

    useTitle("Statistics Page"); // Setting the title of the page using useTitle hook

    const [vacationsStats, setVacationsStats] = useState<VacationModel[]>([]); // Initializing state for vacation statistics

    useEffect(() => {
        vacationsService.getVacationsStats() // Fetching vacation statistics

            .then(dbVacationsStats => { // Handling the fetched data

                if (Array.isArray(dbVacationsStats)) { // Checking if the fetched data is an array  


                    setVacationsStats(dbVacationsStats); // Setting the vacation statistics state

                } else if (typeof dbVacationsStats === "object" && !Array.isArray(dbVacationsStats)) { // Checking if the fetched data is an object and not an array

                    setVacationsStats([dbVacationsStats]); // Transforming the object into an array and setting the vacation statistics state

                } else { // Handling unexpected data types
                    console.error("Returned data is not an array or a single object:", dbVacationsStats); // Logging an error
                }
            })
            .catch(err => notify.error(err)); 
    }, []); 

    return (
        <div className="VacationsStats">
            <h1>Vacations Statistics:</h1>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                {vacationsStats.map((vacation, index) => (
                    <Card key={index} sx={{ width: 400, height: 160, margin: '0 10px' }}>

                        <CardContent>

                            <Typography variant="h4" component="div">
                                Past Vacations: {vacation.past_vacations}
                            </Typography>

                            <Typography variant="h4">
                                Ongoing Vacations: {vacation.on_going_vacations}
                            </Typography>

                            <Typography variant="h4">
                                Future Vacations: {vacation.future_vacations}
                            </Typography>

                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default VacationsStats;
