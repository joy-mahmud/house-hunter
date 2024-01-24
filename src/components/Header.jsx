import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Header = () => {
    const { user } = useContext(AuthContext)
    return (
        <div className="container mx-auto bg-[#57B45B] py-2 px-3">
            <div className="flex justify-between items-center ">
                <h2 className="text-white text-4xl font-bold">HouseHunter</h2>
                <ul className="text-white flex gap-2 text-[20px] cursor-pointer">
                    <Link to={'/'}><li>Home</li></Link>
                    <li>About</li>
                </ul>
                <div>
                    {
                        user ? <button className="border-2 border-white rounded-lg py-1 px-3 text-white">logOut</button> :<Link to={'/login'}><button className="border-2 border-white rounded-lg py-1 px-3 text-white">sign in</button></Link>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;