import { Link } from 'react-router-dom'
import '../../files/styles/Navbar.css';

const Navbar = ({ navItems, role}) => {

    

    return ( 

        <div className="navbar">
            <ul>
                { 
                
                    navItems.map((item, index) => {
                        return <Link to={role === 3030 ? item.trainerPath : item.clientPath} className={item.cName} key={index}><li>{role === 3030 ? item.titleTrainer : item.titleClient}</li></Link>
                    })
                
                }
            </ul>

        </div>

     );
}
 
export default Navbar;