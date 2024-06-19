import axios from "axios";
import { CredentialsModel } from "../Models/CredentialsModels";
import { appConfig } from "../Utils/AppConfig";
import { store, userActions } from "../Redux/state";
import { UserModel } from "../Models/UserModel";
import { notify } from "../Utils/Notify";
import { jwtDecode } from "jwt-decode";

class UserService {

    public constructor() {
        const token = localStorage.getItem("token");

        if (!token) return;

        const dbUser = jwtDecode<{ user: UserModel }>(token).user

        const action = userActions.login(dbUser);
        
        store.dispatch(action);
    }

    // -----------------------------------------------------------------------------
	// login:
    public async login(credentials: CredentialsModel): Promise<void> {
        
        const response = await axios.post<string>(appConfig.loginUrl, credentials, { withCredentials: true});

        const token = response.data;

        const dbUser = jwtDecode<{ user: UserModel }>(token).user;
        
        const action = userActions.login(dbUser);
        
        // save logged-in user in global stat:
        store.dispatch(action);
        
        localStorage.setItem("token", token)
    }
    // -----------------------------------------------------------------------------


    // -----------------------------------------------------------------------------
    // logout:
    public logout(): void {
        const action = userActions.logout();
        
        // logout:
        store.dispatch(action);

        localStorage.removeItem("token")
    }
    // -----------------------------------------------------------------------------


    // -----------------------------------------------------------------------------
    // Get total users:
    public async getTotalUsers(): Promise<number> {
        try {
            const response = await axios.get<{ total_users: number }>(appConfig.totalUsersUrl, { withCredentials: true});
            return response.data.total_users; 
        } 

        catch (err: any) {
            notify.error(err);
        }
    }
    // -----------------------------------------------------------------------------
}

export const userService = new UserService();
