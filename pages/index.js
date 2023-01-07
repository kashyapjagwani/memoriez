import { useEffect, useState } from "react";
import HeaderContainer from "../components/header/HeaderContainer";
import Post from "../components/post/Post";
import LoginContainer from "../components/auth/LoginContainer";
import LoadingScreen from "../components/common/LoadingScreen";
import SignupContainer from "../components/auth/SignupContainer";
// import useFirestore from "../hooks/useFirestore";
// import useFirestoreGroups from "../hooks/useFirestoreGroups";
import Dialog from "@mui/material/Dialog";
import NewPost from "../components/post/NewPost";
import Progress from "../components/post/Progress";
import { auth, projectFirestore, projectStorage } from "../config/firebase";
import { Typography } from "@mui/material";
// import { useRouter } from "next/router";
import Image from "next/image";
import camera from "../public/camera.png";
import IconButton from "@mui/material/IconButton";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";

const USER_USERNAME = "";

export default function Home() {
  const [dialogStatus, setDialogStatus] = useState(false);
  const [newPost, setNewPost] = useState(null);
  const [newPostCaption, setNewPostCaption] = useState("");
  const [newPostLocation, setNewPostLocation] = useState("");
  const [newPostWidth, setNewPostWidth] = useState(0);
  const [newPostHeight, setNewPostHeight] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [user, setUser] = useState(null);
  const [signup, setSignUp] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    value: "",
    showPassword: false,
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState([]);
  const [groupSelected, setGroupSelected] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // setLoading(true);
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        USER_USERNAME = authUser.email.split("@")[0];
        projectFirestore
          .collection("groups")
          .where("users", "array-contains", authUser.uid)
          .orderBy("name", "asc")
          .onSnapshot((snapshot) => {
            setGroups(
              snapshot.docs.map((doc) => {
                return {
                  ...doc.data(),
                  id: doc.id,
                };
              })
            );
          });
      } else {
        setUser(null);
      }
    });
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => {
      unsub();
    };
  }, []);

  useEffect(() => {
    if (groups.length) {
      setGroupSelected(groups[0]);
    }
  }, [groups]);

  useEffect(() => {
    if (groupSelected) {
      projectFirestore
        .collection("posts")
        .where("groupId", "==", groupSelected.id)
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setPosts(
            snapshot.docs.map((doc) => {
              return {
                ...doc.data(),
                id: doc.id,
              };
            })
          );
        });
    }
  }, [groupSelected]);

  useEffect(() => {
    setUploading(false);
  }, [posts]);

  const handleClickOpen = () => {
    setDialogStatus(true);
  };
  const handleClickClose = () => {
    setDialogStatus(false);
    setNewPost(null);
  };
  const handleFileUpload = (file) => {
    setNewPost(file);
    window.scrollTo(0, -60);
  };
  const handleUploadToFirebase = () => {
    setDialogStatus(false);
    setUploading(true);
  };
  const loginUser = () => {
    auth
      .signInWithEmailAndPassword(`${username}@memoriez.com`, password.value)
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signupUser = () => {
    auth
      .createUserWithEmailAndPassword(
        `${username}@memoriez.com`,
        password.value
      )
      .then((user) => {
        setUser(user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const logoutUser = () => {
    auth.signOut().then(() => {
      setUser(null);
      setGroupSelected(null);
      setPosts([]);
    });
  };
  const createGroup = ({ groupImage, groupName, groupUsers }) => {
    const storageRef = projectStorage.ref(groupImage.name);
    let collectionRef = projectFirestore.collection("groups");
    return new Promise((resolve) => {
      storageRef.put(groupImage).on(
        "state_changed",
        (snap) => {
          let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
          // setProgress(percentage);
        },
        (err) => {
          setError(err);
        },
        async () => {
          const imageUrl = await storageRef.getDownloadURL();
          const users = [user.uid, ...groupUsers];
          collectionRef
            .add({
              imageUrl,
              name: groupName,
              users,
            })
            .then((group) => {
              users.forEach((user) => {
                let userGroups = null;
                const retreivedUser = projectFirestore
                  .collection("users")
                  .doc(user);
                retreivedUser.get().then((userData) => {
                  userGroups = userData.data()?.groups;
                  if (userGroups) {
                    retreivedUser.update({
                      groups: [group.id, ...userGroups],
                    });
                  }
                });
              });
              resolve("Group created successfully");
            });
        }
      );
    });
  };

  return (
    <div>
      {loading && <LoadingScreen />}
      {!loading && !user && !signup && (
        <LoginContainer
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          setSignUp={setSignUp}
          loginUser={loginUser}
        />
      )}
      {!loading && !user && signup && (
        <SignupContainer
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          setSignUp={setSignUp}
          signupUser={signupUser}
        />
      )}
      {!loading && user && (
        <div>
          <HeaderContainer
            openUploadDialog={handleClickOpen}
            handleFileUpload={(file) => handleFileUpload(file)}
            logoutUser={logoutUser}
            groups={groups}
            user={user}
            groupSelected={groupSelected}
            setGroupSelected={setGroupSelected}
            createGroup={createGroup}
            user_username={USER_USERNAME}
          />
          {uploading && newPostWidth && newPostHeight && (
            <Progress
              file={newPost}
              setFile={setNewPost}
              caption={newPostCaption}
              location={newPostLocation}
              width={newPostWidth}
              height={newPostHeight}
              username={user}
              groupId={groupSelected.id}
            />
          )}
          {/* <div>hello{groupSelected.id}</div> */}
          {`${groups}`}
          {!groups ||
            (groups.length === 0 && (
              <div
                style={{
                  position: "relative",
                  top: "35vh",
                  textAlign: "center",
                }}
              >
                <Image
                  // className={styles.header__logo}
                  src={camera}
                  alt="Camera"
                  width="120px"
                  height="120px"
                />
                <Typography
                  variant="body2"
                  gutterBottom
                  component="div"
                  style={{
                    color: "#c5c5c5",
                    fontStyle: "italic",
                  }}
                >
                  Create or join a group to start making memoriez
                </Typography>
              </div>
            ))}
          {posts.length ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <div
              style={{
                position: "relative",
                top: "35vh",
                textAlign: "center",
              }}
            >
              <Image
                // className={styles.header__logo}
                src={camera}
                alt="Camera"
                width="120px"
                height="120px"
              />
              <Typography
                variant="body2"
                gutterBottom
                component="div"
                style={{
                  color: "#c5c5c5",
                  fontStyle: "italic",
                }}
              >
                Create a new memory now...
              </Typography>
              <label htmlFor="contained-button-file">
                <IconButton variant="contained" component="span">
                  <AddAPhotoOutlinedIcon
                    style={{ color: "white", fontSize: "25" }}
                  />
                </IconButton>
              </label>
            </div>
          )}
          <Dialog
            fullScreen
            open={dialogStatus}
            onClose={handleClickClose}
            // TransitionComponent={Transition}
          >
            <NewPost
              post={newPost}
              newPostWidth={newPostWidth}
              newPostHeight={newPostHeight}
              newPostCaption={newPostCaption}
              newPostLocation={newPostLocation}
              handleClickClose={handleClickClose}
              handleUpload={handleUploadToFirebase}
              setNewPostCaption={(caption) => setNewPostCaption(caption)}
              setNewPostLocation={(location) => setNewPostLocation(location)}
              setNewPostWidth={(width) => setNewPostWidth(width)}
              setNewPostHeight={(height) => setNewPostHeight(height)}
            />
          </Dialog>
        </div>
      )}
    </div>
  );
}
