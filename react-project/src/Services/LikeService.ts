import axios from "axios";
import { LikeModel } from "../Models/LikeModel";
import { appConfig } from "../Utils/AppConfig";
import { notify } from "../Utils/Notify";

class LikeService {
    
    // Get likes stats:
    public async getLikesStats(): Promise<LikeModel[]> {
        const response = await axios.get<LikeModel[]>(appConfig.likesStatsUrl, { withCredentials: true});
        const likesStats = response.data;
        return likesStats;
    }

    // -----------------------------------------------------------------------------

    // Get total likes:
    public async getTotalLikes(): Promise<number> {
        try {
            const response = await axios.get<{ total_likes: number }>(appConfig.totalLikesUrl, { withCredentials: true});
            return response.data.total_likes; 
        } 

        catch (err: any) {
            notify.error(err);
        }
    }
    // -----------------------------------------------------------------------------

}

export const likeService = new LikeService();
