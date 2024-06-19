import "./Home.css";
import imageSource from "../..//../Assets/Images/home_page_statistics.png";
import { useTitle } from "../../../Utils/UseTitle";

export function Home(): JSX.Element {

    useTitle("Home Page");

    return (
        <div className="Home">
			<h3>This is a vacation statistics system!! Here you can view the statistics of the vacations.</h3>
            <img src={imageSource}/>
        </div>
    );
}
