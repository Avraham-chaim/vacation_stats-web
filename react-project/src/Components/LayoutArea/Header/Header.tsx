import { UserMenu } from "../../UserArea/UserMenu/UserMenu";
import "./Header.css";

export function Header(): JSX.Element {
    return (
        <div className="Header">
            <UserMenu/>
			<h1>Welcome to my vacations stats Website!!</h1>
        </div>
    );
}
