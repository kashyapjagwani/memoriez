import styles from "../../styles/NewPost.module.css";
import Image from "next/image";
import IconButton from "@mui/material/IconButton";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DoneIcon from "@mui/icons-material/Done";
import Input from "@mui/material/Input";

function NewPost({
  post,
  //   newPostCaption,
  //   newPostLocation,
  newPostWidth,
  newPostHeight,
  handleClickClose,
  handleUpload,
  setNewPostCaption,
  setNewPostLocation,
  setNewPostWidth,
  setNewPostHeight,
}) {
  const uploadPost = () => {
    setNewPostCaption(document.getElementById("captionRef").value);
    setNewPostLocation(document.getElementById("locationRef").value);
    handleUpload();
  };
  if (post) {
    const postUrl = URL.createObjectURL(post);
    let img = document.createElement("img");
    img.src = URL.createObjectURL(post);
    img.onload = () => {
      setNewPostWidth(img.width);
      setNewPostHeight(img.height);
    };
  }

  return (
    <div className={styles.newpost_container}>
      <div className={styles.newpost_container__header}>
        <IconButton onClick={handleClickClose}>
          <ClearOutlinedIcon style={{ color: "white", fontSize: "30" }} />
        </IconButton>
        <h3>New memory</h3>
        <IconButton onClick={uploadPost}>
          <DoneIcon style={{ color: "white", fontSize: "30" }} />
        </IconButton>
      </div>
      <div className={styles.newpost_container__image}>
        {post && newPostWidth && newPostHeight && (
          <Image
            src={postUrl}
            alt="New post"
            width={newPostWidth}
            height={newPostHeight}
          />
        )}
      </div>
      <div className={styles.newpost_container__caption}>
        <Input
          id="captionRef"
          placeholder="Write a caption"
          fullWidth
          className={styles.newpost_container__caption__input}
        />
        <Input
          id="locationRef"
          placeholder="Add location"
          fullWidth
          className={styles.newpost_container__caption__input}
        />
      </div>
    </div>
  );
}

export default NewPost;
