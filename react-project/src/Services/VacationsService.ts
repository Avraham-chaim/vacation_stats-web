import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../Utils/AppConfig";

class VacationsService {
	
    public async getVacationsStats(): Promise<VacationModel[]> {
        
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl, { withCredentials: true});
        const vacations_stats = response.data;
        return vacations_stats;
    }

}

export const vacationsService = new VacationsService();
