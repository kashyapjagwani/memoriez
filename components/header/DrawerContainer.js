import styles from "../../styles/Drawer.module.css";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import CreateGroupDrawerContianer from "./CreateGroupDrawerContainer";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutContainer from "../auth/LogoutContainer";
import GroupSettings from "./GroupSettings";

function DrawerContainer({
  closeDrawer,
  logoutUser,
  groups,
  user,
  setGroupSelected,
  createGroup,
  user_username,
}) {
  const [createGroupDrawerStatus, setCreateGroupDrawerStatus] = useState(false);
  const [groupOptionsDrawerStatus, setGroupOptionsDrawerStatus] =
    useState(false);
  const [groupOptionsSelected, setGroupOptionsSelected] = useState(null);

  const toggleCreateGroupDrawer = (status) => {
    setCreateGroupDrawerStatus(status);
  };

  const handleOptions = (group) => {
    setGroupOptionsDrawerStatus(true);
    setGroupOptionsSelected(group);
  };

  return (
    <div className={styles.drawer_container}>
      <div className={styles.drawer}>
        <div className={styles.drawer__header}>
          <div className={styles.drawer__header__back_username}>
            <IconButton onClick={closeDrawer}>
              <ArrowBackIosIcon style={{ color: "white", fontSize: "25" }} />
            </IconButton>
            <h2 className={styles.drawer__header__back_username__username}>
              {user.email.split("@")[0]}
            </h2>
          </div>
          <IconButton onClick={() => toggleCreateGroupDrawer(true)}>
            <GroupAddOutlinedIcon style={{ color: "white", fontSize: "25" }} />
          </IconButton>
        </div>
        <div className={styles.drawer__groups}>
          <h3>Groups</h3>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
        }}
      >
        <List style={{ paddingTop: 0, maxHeight: "515px", overflow: "scroll" }}>
          {groups.map((group) => (
            <ListItem key={group.id}>
              <ListItemButton
                style={{ padding: 0 }}
                onClick={() => {
                  closeDrawer();
                  setGroupSelected(group);
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={
                      group.imageURL
                        ? group.imageURL
                        : "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                    }
                    sx={{ width: 48, height: 48 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  className={styles.drawer__groups__group_name}
                  primary={group.name}
                  //   secondary={secondary ? 'Secondary text' : null}
                />
              </ListItemButton>
              <IconButton onClick={(event) => handleOptions(group, event)}>
                <MoreVertIcon style={{ color: "white", fontSize: "25" }} />
              </IconButton>
            </ListItem>
          ))}
        </List>
        <LogoutContainer logoutUser={logoutUser} />
      </div>

      <Drawer
        anchor="right"
        open={createGroupDrawerStatus}
        onClose={() => toggleCreateGroupDrawer(false)}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            color: "white",
            backgroundColor: "#121212",
          }}
        >
          <CreateGroupDrawerContianer
            // groups={groups}
            closeDrawer={() => toggleCreateGroupDrawer(false)}
            createGroup={createGroup}
            user_username={user_username}
            // user={user}
            // setGroupSelected={setGroupSelected}
          />
        </div>
      </Drawer>
      <Drawer
        anchor="bottom"
        open={groupOptionsDrawerStatus}
        onClose={() => {
          setGroupOptionsDrawerStatus(false);
        }}
      >
        <GroupSettings group={groupOptionsSelected} />
      </Drawer>
    </div>
  );
}

export default DrawerContainer;
