import { useForm } from "react-hook-form";
import "./login.css";
import { CredentialsModel } from "../../../Models/CredentialsModels";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useNavigate } from "react-router-dom";

export function Login(): JSX.Element {

    const { register, handleSubmit} = useForm<CredentialsModel>();
    const navigate = useNavigate();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            notify.success("Welcome back!"); 
            navigate("/home");
        }
        catch(err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit(send)}>

                <h2>Login</h2>
                <div className="form-group">
                    <label>Email:</label>
                    <input placeholder="Email" type="email" {...register("email")} />
                </div>

                <div className="form-group">
                    <label>Password:</label>
                    <input placeholder="Password" type="password" {...register("password")} />
                </div>
                
                <button className="login-button">Login</button>
            </form>
        </div>
    );
}
