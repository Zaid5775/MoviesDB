import { Link } from "react-router-dom";

const Footer = () =>{

    return(
        <div className= "footer" >
        <p >Designed and Developed by  
        <Link to = 'https://github.com/zaid5775'>
        Zaid
        </Link>
        </p>
        </div>
    )
}

export default Footer;