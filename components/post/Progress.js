import styles from "../../styles/Progress.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { useEffect } from "react";
import useStorage from "../../hooks/useStorage";

const Progress = ({
  file,
  setFile,
  caption,
  location,
  width,
  height,
  username,
  groupId,
}) => {
  const { progress, url } = useStorage(
    file,
    caption,
    location,
    width,
    height,
    username,
    groupId
  );

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url]);

  return (
    <div className={styles.progress}>
      <LinearProgress variant="determinate" color="primary" value={progress} />
    </div>
  );
};

export default Progress;
