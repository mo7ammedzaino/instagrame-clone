import { Button } from "@mui/material";

const Header = ({ user, onSignIn, onSignUp, onLogout }) => {
  return (
    <div className="app_header">
      <img
        className="app_headerImage"
        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""
      />
      {user ? (
        <div className="app__headerRight">
          <Button onClick={onLogout}>LogOut</Button>
        </div>
      ) : (
        <form className="app_loginContainer">
          <Button onClick={() => onSignIn(true)}>Sign In</Button>
          <Button onClick={() => onSignUp(true)}>Sign up</Button>
        </form>
      )}
    </div>
  );
};

export default Header;
