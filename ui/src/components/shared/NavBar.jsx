import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { isAuthenticated, signOut } from '../../store/entities/auth';

function NavBar() {
    const [toggle, setToggle] = useState(false);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => isAuthenticated(state));
    const [menuItems] = useState([
        {
            id: 0,
            title: "Home",
            path: "/home"
        },
        {
            id: 1,
            title: "Portfolio",
            path: "/portfolio/about"
        },
        {
            id: 2,
            title: "Sign Up",
            path: "/auth/signup"
        }
    ]);

    return ( 
        <header className="lg:px-16 px-6 bg-white flex flex-wrap items-center py-2 border-b">
            <div className="flex-1 flex justify-between items-center">
                <Link className="flex items-center" to="/">
                    <svg className="mr-2" width="32" height="36" viewBox="0 0 32 36" xmlns="http://www.w3.org/2000/svg"><path d="M15.922 35.798c-.946 0-1.852-.228-2.549-.638l-10.825-6.379c-1.428-.843-2.549-2.82-2.549-4.501v-12.762c0-1.681 1.12-3.663 2.549-4.501l10.825-6.379c.696-.41 1.602-.638 2.549-.638.946 0 1.852.228 2.549.638l10.825 6.379c1.428.843 2.549 2.82 2.549 4.501v12.762c0 1.681-1.12 3.663-2.549 4.501l-10.825 6.379c-.696.41-1.602.638-2.549.638zm0-33.474c-.545 0-1.058.118-1.406.323l-10.825 6.383c-.737.433-1.406 1.617-1.406 2.488v12.762c0 .866.67 2.05 1.406 2.488l10.825 6.379c.348.205.862.323 1.406.323.545 0 1.058-.118 1.406-.323l10.825-6.383c.737-.433 1.406-1.617 1.406-2.488v-12.757c0-.866-.67-2.05-1.406-2.488l-10.825-6.379c-.348-.21-.862-.328-1.406-.328zM26.024 13.104l-7.205 13.258-3.053-5.777-3.071 5.777-7.187-13.258h4.343l2.803 5.189 3.107-5.832 3.089 5.832 2.821-5.189h4.352z"></path></svg>
                    <span className="text-teal-600 uppercase font-semibold text-lg">Blogsite</span>
                </Link>
            </div>
            <button onClick={() => setToggle(!toggle)} className="lg:hidden block border border-gray-400 p-1 rounded hover:border-gray-900"><svg className="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20"><title>menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></button>

            <div className={`lg:flex lg:items-center lg:w-auto w-full ${toggle ? '' : 'hidden'}`}>
                <nav>
                    <ul className="lg:flex items-center justify-between text-base pt-4 lg:pt-0">
                        { menuItems.map(item => (
                            <li key={item.id}><Link to={item.path} className="nav-link" >{item.title}</Link></li>
                        ))}
                        {!isLoggedIn && <li><Link to="/auth/signin" className="nav-link" >Sign In</Link></li>}
                        {isLoggedIn && <li onClick={() => dispatch(signOut())}  className="nav-link cursor-pointer">Sign Out</li>}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export default NavBar;