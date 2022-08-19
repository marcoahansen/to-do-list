import './footer.css'
import { VscGithubInverted } from "react-icons/vsc";


function Footer(){
    return(
        <div className="footer">
            <p>Desenvolvido por Marco Hansen</p>
            <a className='github' href='https://github.com/marcoahansen/to-do-list'><VscGithubInverted/></a>
        </div>
    )
}

export default Footer;