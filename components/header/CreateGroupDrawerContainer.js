import styles from "../../styles/CreateGroupDrawer.module.css";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import Avatar from "@mui/material/Avatar";
import Input from "@mui/material/Input";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useEffect, useState } from "react";
import { projectFirestore } from "../../config/firebase";
import { CircularProgress } from "@mui/material";

function CreateGroupDrawerContianer({
  closeDrawer,
  createGroup,
  user_username,
}) {
  const [checked, setChecked] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const [groupImage, setGroupImage] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [creatingGroup, setCreatingGroup] = useState(false);

  useEffect(() => {
    projectFirestore
      .collection("users")
      .where("username", "!=", user_username)
      .orderBy("username", "asc")
      .onSnapshot((snapshot) => {
        const allUsers = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setUsers(allUsers);
        setSearchedUsers(allUsers);
      });
  }, []);

  useEffect(() => {
    if (groupImage) {
      console.log(window.URL.createObjectURL(groupImage));
    }
  }, [groupImage]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  const searchUsers = (event) => {
    setSearch(event.target.value);
    setSearchedUsers(
      users.filter((user) => {
        return user.username.includes(event.target.value);
      })
    );
  };
  const clearInput = (e) => {
    e.target.value = "";
  };

  const uploadFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      setGroupImage(selectedFile);
    }
  };

  return (
    <div className={styles.create_group_drawer}>
      <div className={styles.create_group_drawer__header}>
        <IconButton onClick={closeDrawer}>
          <ClearIcon style={{ color: "white", fontSize: "25" }} />
        </IconButton>
        <h3>New Group</h3>
        {groupName !== "" && groupImage && checked.length ? (
          <IconButton
            onClick={() => {
              setCreatingGroup(true);
              createGroup({ groupImage, groupName, groupUsers: checked }).then(
                () => {
                  setCreatingGroup(false);
                  closeDrawer();
                }
              );
            }}
          >
            {creatingGroup ? (
              <CircularProgress size="30px" />
            ) : (
              <DoneIcon style={{ color: "white", fontSize: "30" }} />
            )}
          </IconButton>
        ) : (
          <IconButton disabled>
            <DoneIcon style={{ color: "#c5c5c5", fontSize: "30" }} />
          </IconButton>
        )}
      </div>
      <div className={styles.create_group_drawer__form}>
        <div className={styles.create_group_drawer__form__creds}>
          <label htmlFor="contained-group-button-file">
            <Avatar
              src={groupImage ? window.URL.createObjectURL(groupImage) : ""}
              className={styles.create_group_drawer__form__creds__img}
              sx={{ width: 48, height: 48 }}
            />
          </label>
          <Input
            placeholder="Write a group name"
            fullWidth
            className={styles.create_group_drawer__form__creds__input}
            value={groupName}
            onInput={(e) => setGroupName(e.target.value)}
          />
        </div>
        <h3>Add Members</h3>
        <Input
          placeholder="Search"
          fullWidth
          className={styles.create_group_drawer__form__search}
          value={search}
          onChange={searchUsers}
        />
        {searchedUsers.length && (
          <List>
            {searchedUsers.map((user) => {
              return (
                <ListItem
                  key={user.id}
                  secondaryAction={
                    <Checkbox
                      edge="end"
                      onChange={handleToggle(user.id)}
                      checked={checked.indexOf(user.id) !== -1}
                      icon={<CircleOutlinedIcon />}
                      checkedIcon={<CheckCircleIcon />}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton
                    className={styles.create_group_drawer__form__user}
                    onClick={handleToggle(user.id)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt={user.username}
                        src={`/static/images/avatar/${1}.jpg`}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={user.username} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        )}
      </div>
      <input
        className={styles.create_group_drawer__input}
        accept="image/*"
        id="contained-group-button-file"
        type="file"
        onClick={clearInput}
        onInput={uploadFile}
      />
    </div>
  );
}

export default CreateGroupDrawerContianer;
