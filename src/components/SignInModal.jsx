import React from "react";
import { Modal, Input, Button } from "@material-ui/core";
import { Box } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const SignInModal = ({
  open,
  onClose,
  username,
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onLogin,
}) => {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <Box sx={style}>
        <form className="app__signup">
          <center>
            <img
              className="app_headerImage"
              src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
              alt=""
            />
          </center>

          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
          <Button onClick={onLogin}>Login</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default SignInModal;
