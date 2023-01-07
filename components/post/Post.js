import styles from "../../styles/Post.module.css";
import Image from "next/image";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import moment from "moment";

function Post({ post }) {
  return (
    <div className={styles.post}>
      <div className={styles.post__header}>
        <Avatar
          src="https://statinfer.com/wp-content/uploads/dummy-user.png"
          className={styles.post__header__img}
          sx={{ width: 30, height: 30 }}
        />
        <div>
          <h5 className={styles.post__header__username}>
            {post.username.split("@")[0]}
          </h5>
          {post.location && (
            <h5 className={styles.post__header__location}>{post.location}</h5>
          )}
        </div>
      </div>
      <div className={styles.post__image}>
        <Image
          src={post.imageUrl}
          alt="Memoriezz Logo"
          width={post.width}
          height={post.height}
        />
      </div>
      <div className={styles.post__footer}>
        {post.caption && (
          <h5 className={styles.post__footer__username}>
            {`${post.username.split("@")[0]} `}
            <span className={styles.post__footer__caption}>{post.caption}</span>
          </h5>
        )}

        <div className={styles.post__footer__actions}>
          <Avatar
            src="https://statinfer.com/wp-content/uploads/dummy-user.png"
            className={styles.post__footer__actions__img}
            sx={{ width: 24, height: 24 }}
          />
          <Input
            placeholder="Add a comment"
            fullWidth
            className={styles.post__footer__actions__input}
            // value={comment}
            // onChange={(event) => setComment(event.target.value)}
          />
          {/* {comment && <Button size="small">Post</Button>} */}
        </div>
        {post.createdAt && (
          <Typography
            variant="caption"
            display="block"
            className={styles.post__footer__date}
          >
            {moment(post.createdAt.toDate()).fromNow()}
          </Typography>
        )}
      </div>
    </div>
  );
}

export default Post;
