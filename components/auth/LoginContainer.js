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

function Login({
  username,
  setUsername,
  password,
  setPassword,
  setSignUp,
  loginUser,
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
      <Button
        className={styles.login__button}
        variant="contained"
        fullWidth
        onClick={loginUser}
      >
        Log In
      </Button>
      <div className={styles.login__signup}>
        <Typography variant="caption" display="block">
          Wanna create some cool memoriez?
        </Typography>
        <Button onClick={() => setSignUp(true)}>Sign Up</Button>
      </div>
    </div>
  );
}
export default Login;
