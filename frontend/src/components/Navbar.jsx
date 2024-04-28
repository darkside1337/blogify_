import MaxWidthWrapper from "./MaxWidthWrapper";
import { Link } from "react-router-dom";
import Logo from "src/assets/logo.svg";
import ThemeToggle from "./ui/ThemeToggle";
import { useState, useEffect } from "react";
import HamburgerButton from "./ui/HamburgerButton";
import useThemeContext from "src/hooks/UseThemeContext";
import useAuth from "src/hooks/useAuth";
import { AUTH_ACTIONS } from "src/context/AuthContext";
import { useNavigate } from "react-router-dom";
import UserProfilePicture from "./ui/UserProfilePicture";
const Navbar = () => {
  const { currentTheme, setTheme } = useThemeContext();
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, dispatch, username } = useAuth();

  const themeToggle = (e) => {
    if (e.target.checked) {
      setTheme("night");
    } else {
      setTheme("emerald");
    }
  };

  const logout = () => {
    dispatch({ type: AUTH_ACTIONS.LOGOUT });
    navigate("/");
  };

  const toggleMenu = () => setMenuToggle(!menuToggle);
  const hideMenu = () => setMenuToggle(false);

  console.log(isAuthenticated, isAdmin);

  return (
    <header className="min-h-20 h-full w-full flex justify-center items-center shadow-xl mb-8">
      <MaxWidthWrapper>
        <div className="w-full flex items-center justify-between">
          <Link to="/">
            <img src={Logo} alt="logo" className="z-0" />
          </Link>

          {/* MOBILE  menu */}
          <div className="md:hidden z-30">
            <HamburgerButton isOpen={menuToggle} onChange={toggleMenu} />
            {/* MOBILE DROPDOWN */}
            <div
              className={`fixed top-0 z-30 left-0  w-screen h-screen flex gap-9 justify-center items-center flex-col transition-transform duration-500 origin-top   bg-base-100   ${
                menuToggle
                  ? "scale-y-100 pointer-events-auto"
                  : "scale-y-0 pointer-events-none"
              }  `}
            >
              <Link to="/" onClick={hideMenu}>
                Home
              </Link>
              <Link to="/posts">Posts</Link>

              {isAuthenticated ? (
                <>
                  {isAdmin && (
                    <Link to="/admin/dashboard" onClick={hideMenu}>
                      Dashboard
                    </Link>
                  )}
                  <button onClick={() => logout()}>Logout</button>

                  <UserProfilePicture username={username} />
                </>
              ) : (
                <>
                  <Link onClick={hideMenu} to="/auth/login">
                    Login
                  </Link>
                  <Link onClick={hideMenu} to="/auth/signup">
                    Signup
                  </Link>
                </>
              )}
              <ThemeToggle
                currentTheme={currentTheme}
                toggleTheme={themeToggle}
              />
            </div>
          </div>

          {/* DESKTOP NAV */}

          <div className="hidden md:flex justify-center items-center gap-8">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>

            {isAuthenticated ? (
              <>
                {isAdmin && <Link to="/admin/dashboard">Dashboard</Link>}

                <button onClick={() => logout()}>Logout</button>

                <UserProfilePicture username={username} />
              </>
            ) : (
              <>
                <Link to="/auth/login">Login</Link>
                <Link to="/auth/signup">Signup</Link>
              </>
            )}
            <ThemeToggle
              currentTheme={currentTheme}
              toggleTheme={themeToggle}
            />
          </div>
        </div>
      </MaxWidthWrapper>
    </header>
  );
};

export default Navbar;
