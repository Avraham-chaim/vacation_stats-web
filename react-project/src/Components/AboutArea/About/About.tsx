import "./About.css";
import pageNotFoundSource from "../../../Assets/Images/about_page.jpg";
import { useTitle } from "../../../Utils/UseTitle";

export function About(): JSX.Element {

    useTitle("About Page");

    return (
        <div className="About">
            <h1>Avraham Chaim Siloni</h1>
            <p>Hello! My name is Avraham Chaim Siloni. I'm 17 years old and I live in Petah Tikva. I'm currently studying software development course in Python. I really enjoy spending time with friends, learning, and playing sports together. Here you can see the project I've built during the course at John Bryce College. The project is about vacation statistics. Feel free to take a look.😁</p>
            <img src={pageNotFoundSource} alt="Page Not Found"/>

            <div className="links">
                {/* LinkedIn link */}
                <a href="https://www.linkedin.com/in/avrham-abargel-270580285/" target="_blank" rel="noopener noreferrer">👉My LinkedIn👈 </a>
                {/* GitHub link */}
                <a href="https://github.com/avramcohen1/pythonlisting" target="_blank" rel="noopener noreferrer">👉My GitHub👈 </a>
                {/* Email link */}
                <a href="https://mail.google.com/mail/u/0/#inbox" target="_blank" rel="noopener noreferrer">👉My Email👈 </a>
            </div>
        </div>
    );
}
