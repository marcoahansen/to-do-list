import "./footer.css";
import { VscGithubInverted } from "react-icons/vsc";
import { FaLinkedinIn } from "react-icons/fa";

function Footer() {
  return (
    <div className="footer">
      <p>Desenvolvido por Marco Hansen</p>
      <div className="social">
        <a className="github" href="https://github.com/marcoahansen/to-do-list">
          <VscGithubInverted />
        </a>
        <a
          className="linkedin"
          href="https://www.linkedin.com/in/marco-a-hansen/"
        >
          <FaLinkedinIn />
        </a>
      </div>
    </div>
  );
}

export default Footer;
