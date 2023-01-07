import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../public/logo.png";
import Image from "next/image";
import styles from "../../styles/Loading.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__content}>
        <Image
          className={styles.header__logo}
          src={logo}
          alt="Memoriezz Logo"
          width="200px"
          height="200px"
        />
        <div className={styles.loading__content__loader}>
          <CircularProgress />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
