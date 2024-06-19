import "./PageNotFound.css";
import pageNotFoundSource from "../../../Assets/Images/page-not-found-404.jpg";
import { useTitle } from "../../../Utils/UseTitle";

export function PageNotFound(): JSX.Element {

    useTitle("Page 404 Error");

    return (
        <div className="PageNotFound">
			<p>The page you are looking for doesn't exist.</p>
            <img src={pageNotFoundSource}/>
        </div>
    );
}
