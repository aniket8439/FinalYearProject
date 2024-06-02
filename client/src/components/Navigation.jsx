import { Link , } from "react-router-dom";
import { useSelector } from "react-redux";

import { images } from "../constants";

import { useDispatch } from "react-redux";
import { logoutUser } from "../store/reducers/userSlice";

const Navigation = () => {
  const dispatch = useDispatch();
  // const history = useHistory();

  const handleLogout = () => {
    // Dispatch logout action to clear user state
    dispatch(logoutUser());
    // history.push("/login");
  };
  const user = useSelector((state) => state.user.user);

  const mainMenu = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Guides and Chat",
      link: "/guide",
    },
    {
      label: "Explore",
      link: "/explore",
    },
    {
      label: "Contact Us",
      link: "/contact",
    },
  ];

  return (
    <nav className="navigation glass-effect">
      <Link
        to={"/"}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <img
          src={images.logos_black}
          alt="logo"
          style={{
            width: "4rem",
            height: "4rem",
          }}
        />
        <h1>
          TAG <span></span>
        </h1>
      </Link>
      <div className="row">
        {mainMenu.map((item, index) => (
          <Link key={index} to={item.link}>
            {item.label}
          </Link>
        ))}
      </div>
      {user ? (
        <div className="row">
          <Link to="/create-trip">Create Trip</Link>
          <Link to="/profile" className="button">
            Profile
          </Link>
          <Link to="/login"> <p className="button" onClick={handleLogout}>Logout</p></Link>
        </div>
      ) : (
        <div className="row">
          <Link to="/login">Login</Link>
          <Link to="/signup" className="button">
            Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
