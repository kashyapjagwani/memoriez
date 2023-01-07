import styles from "../../styles/GroupSettings.module.css";
import {
  Avatar,
  Divider,
  Input,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../../config/firebase";

const GroupSettings = ({ group }) => {
  const [editGroupName, setEditGroupName] = useState(false);
  const [groupUsers, setGroupUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedUsers, setFetchedUsers] = useState(true);
  const groupNameInput = useRef(null);

  useEffect(() => {
    projectFirestore.collection("users").onSnapshot((snapshot) => {
      setFetchedUsers(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });
  }, []);

  useEffect(() => {
    if (fetchedUsers.length) {
      setGroupUsers(
        fetchedUsers.filter((user) => {
          return user.groups.find((userGroup) => {
            return userGroup === group.id;
          });
        })
      );
    }
  }, [fetchedUsers]);

  useEffect(() => {
    if (groupUsers.length === group.users.length) {
      setLoading(false);
    }
  }, [groupUsers]);

  useEffect(() => {
    if (editGroupName) {
      groupNameInput.current.focus();
    }
  }, [editGroupName]);

  return (
    <div className={styles.group_settings}>
      <div className={styles.group_settings__top_bar}>
        <div className={styles.group_settings__top_bar__bar}></div>
      </div>
      <div className={styles.group_settings__profile}>
        {loading ? (
          <Skeleton
            variant="circular"
            sx={{ bgcolor: "grey.900" }}
            animation="wave"
          >
            <Avatar sx={{ width: 80, height: 80 }} />
          </Skeleton>
        ) : (
          <Avatar src={group?.imageUrl} sx={{ width: 80, height: 80 }} />
        )}
      </div>
      <div className={styles.group_settings__change_name}>
        {loading ? (
          <Skeleton sx={{ bgcolor: "grey.900" }} animation="wave">
            <label htmlFor="contained-group-setting-button-file">
              Change Group Photo
            </label>
          </Skeleton>
        ) : (
          <label htmlFor="contained-group-setting-button-file">
            Change Group Photo
          </label>
        )}
      </div>
      <input
        className={styles.group_settings__image_input}
        accept="image/*"
        id="contained-group-setting-button-file"
        type="file"
      />
      <Divider light style={{ backgroundColor: "#686868", margin: "12px 0" }} />
      <div className={styles.group_settings__chat_settings}>
        <div style={{ fontWeight: "bold" }}>Chat Settings</div>
        <List style={{ padding: 0 }}>
          <ListItem style={{ padding: "12px 0" }}>
            <div style={{ marginRight: "8px" }}>Group name:</div>
            {editGroupName ? (
              <Input
                defaultValue={group?.name}
                inputRef={groupNameInput}
                style={{ color: "white", width: "65%" }}
              />
            ) : (
              <div
                onClick={() => {
                  setEditGroupName(true);
                }}
                style={{
                  width: "65%",
                }}
              >
                {group?.name}
              </div>
            )}
          </ListItem>
        </List>
        <div style={{ fontWeight: "bold", marginTop: "4px" }}>Members</div>
        <List
          style={{ paddingLeft: 0, maxHeight: "515px", overflow: "scroll" }}
        >
          {groupUsers &&
            groupUsers.length &&
            groupUsers.map((user) => {
              return (
                <ListItem key={user.id} style={{ paddingLeft: 0 }}>
                  <ListItemAvatar>
                    <Avatar
                      src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                      sx={{ width: 48, height: 48 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    className={styles.group_settings__members__username}
                    primary={user.username}
                  />
                </ListItem>
              );
            })}
        </List>
      </div>
    </div>
  );
};

export default GroupSettings;
