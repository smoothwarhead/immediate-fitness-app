import Logo from "./Logo";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import CloseMenuIcon from "./menu/CloseMenuIcon";
import OpenMenuIcon from "./menu/OpenMenuIcon";
import MobileMenu from "../pages/homepage/MobileMenu";
import DropdownContext from "../context/DropdownContext";


const NoUserHeader = ({ handleClick, cName }) => {

    const {openMenu, setOpenMenu} = useContext(DropdownContext);

    const handleOpen = () => {
        setOpenMenu(!openMenu);
    }

    const location = useLocation();


  return (
    <>
        <div className="landing_page_navbar">
            <div className={location.pathname === "/" ? "no-dashboard-navbar-homepage" : "no-dashboard-navbar"}>
                <div className="logo-container">
                    <Link to="/">
                        <div className="logo">
                            <Logo cName={cName} />
                        </div>
                    </Link>
                </div>


                <div className={location.pathname === "/" ? "nav-elements" : "nav-elements none"}>
                    <ul>
                        <Link to="/login"><li>login</li></Link>
                        <li onClick={handleClick}>create account</li>
                    </ul>
                    
                </div>

                <div 
                    className={location.pathname === "/" ? "mobile-header-elements" : "mobile-header-elements none"}
                    onClick={handleOpen}
                >
                    {openMenu ? <CloseMenuIcon cName="close-menu home-menu-icon" />  : <OpenMenuIcon cName="open-menu home-menu-icon" />}

                </div>

            </div>

          

        </div>

        { openMenu && <MobileMenu /> }


    
    </>
  )
}

export default NoUserHeader