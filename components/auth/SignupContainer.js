import styles from "../../styles/Login.module.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Typography from "@mui/material/Typography";
import { useState } from "react";

function Signup({
  username,
  setUsername,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
  setSignUp,
  signupUser,
}) {
  const handleChange = (event) => {
    setPassword({
      ...password,
      value: event.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
    console.log(password, confirmPassword);
  };

  return (
    <div className={styles.login}>
      <Image
        className={styles.header__logo}
        src={logo}
        alt="Memoriezz Logo"
        width="200px"
        height="200px"
      />
      <Input
        placeholder="Username"
        fullWidth
        className={styles.login__input}
        variant="outlined"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        size="large"
      />
      <Input
        placeholder="Password"
        className={styles.login__input}
        type={password.showPassword ? "text" : "password"}
        value={password.value}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              edge="end"
              style={{ color: "#c5c5c5" }}
            >
              {password.showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
      />
      <Input
        placeholder="Confirm password"
        className={styles.login__input}
        value={confirmPassword}
        onChange={(event) => setConfirmPassword(event.target.value)}
        fullWidth
        type="password"
        error={confirmPassword !== password.value}
        // helperText={
        //   confirmPassword === password.value ? "" : "Passwords don't match"
        // }
        variant="outlined"
      />
      <Button
        disabled={confirmPassword !== password.value}
        className={styles.login__button}
        variant="contained"
        fullWidth
        onClick={signupUser}
      >
        Sign Up
      </Button>
      <div className={styles.login__signup}>
        <Typography variant="caption" display="block">
          Have an account?
        </Typography>
        <Button onClick={() => setSignUp(false)}>Log In</Button>
      </div>
    </div>
  );
}
export default Signup;
