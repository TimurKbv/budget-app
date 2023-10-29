import { FC } from "react";
import { FaBtc, FaSignOutAlt } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useAppDispatch } from "../store/hooks";
import { logout } from "../store/user/userSlice";
import { removeTokenFromLocalStorage } from "../helper/localstorage.helper";
import { toast } from "react-toastify";

const Header: FC = () => {
  const isAuth = useAuth();
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    removeTokenFromLocalStorage('token')
    toast.success('You logget out')
    navigate('/')
  }

  return (
    <header className="flex items-center bg-slate-800 px-4 py-2 shadow-sm backdrop-blur-sm ">
      <Link to="/">
        <FaBtc size={20} />
      </Link>


{/* menu */}
      {isAuth && (
        <nav className="ml-auto mr-10">
          <ul className="flex items-center gap-5 ">

            <li>
              <NavLink to={"/"} className={ ({ isActive }) => isActive ? 'text-white' : 'text-white/50' }>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/transactions"} className={ ({ isActive }) => isActive ? 'text-white' : 'text-white/50'}>Transactions</NavLink>
            </li>
            <li>
              <NavLink to={"/categories"} className={ ({ isActive }) => isActive ? 'text-white' : 'text-white/50'} >Categories</NavLink>
            </li>

          </ul>
        </nav>
      )}

      {/* actions */}
      {
        isAuth ? (
            <button className="btn btn-red" onClick={logoutHandler}>
                <span>Log Out</span>
                <FaSignOutAlt />
            </button>
        ) : (
            <Link to={'/login'} className=" py-2 text-white/50 hover:text-white ml-auto">
                Log In / Sign In
            </Link>
        )

      }
    </header>
  );
};

export default Header;
