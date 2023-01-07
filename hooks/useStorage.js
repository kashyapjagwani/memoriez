import { useEffect } from "react";
import { useState } from "react";
import {
  projectStorage,
  projectFirestore,
  timeStamp,
} from "../config/firebase";

const useStorage = (
  file,
  caption,
  location,
  width,
  height,
  username,
  groupId
) => {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("posts");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const imageUrl = await storageRef.getDownloadURL();
        const createdAt = timeStamp();
        collectionRef.add({
          imageUrl,
          createdAt,
          width,
          height,
          caption,
          location,
          username: username.email.split("@")[0],
          groupId,
        });
        setUrl(url);
      }
    );
  }, [file]);

  return { progress, error, url };
};

export default useStorage;
