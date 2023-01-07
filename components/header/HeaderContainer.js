import styles from "../../styles/Header.module.css";
import Image from "next/image";
import logo from "../../public/logo.png";
import IconButton from "@mui/material/IconButton";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import Drawer from "@mui/material/Drawer";
import { useState, useEffect } from "react";
import DrawerContainer from "./DrawerContainer";
import CreateGroupDrawerContianer from "./CreateGroupDrawerContainer";

function HeaderContainer({
  openUploadDialog,
  handleFileUpload,
  logoutUser,
  groups,
  user,
  groupSelected,
  setGroupSelected,
  createGroup,
  user_username,
}) {
  const [drawerStatus, setDrawerStatus] = useState(false);

  const toggleDrawer = (status) => {
    setDrawerStatus(status);
  };

  const clearInput = (e) => {
    e.target.value = "";
  };

  const uploadFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      handleFileUpload(selectedFile);
      openUploadDialog();
    }
  };

  return (
    <div className={styles.header}>
      <Image
        className={styles.header__logo}
        src={logo}
        alt="Memoriezz Logo"
        width="60px"
        height="60px"
      />
      <h3>{groupSelected && groupSelected.name}</h3>
      <div className={styles.header__actions}>
        {groups && groups.length > 0 && (
          <label htmlFor="contained-button-file">
            <IconButton variant="contained" component="span">
              <AddAPhotoOutlinedIcon
                style={{ color: "white", fontSize: "25" }}
              />
            </IconButton>
          </label>
        )}
        {groups && groups.length > 0 && (
          <IconButton>
            <FavoriteBorderOutlinedIcon
              style={{ color: "white", fontSize: "25" }}
            />
          </IconButton>
        )}
        {groups && groups.length > 0 ? (
          <IconButton onClick={() => toggleDrawer(true)}>
            <PersonOutlineOutlinedIcon
              style={{ color: "white", fontSize: "25" }}
            />
          </IconButton>
        ) : (
          <IconButton onClick={() => toggleDrawer(true)}>
            <GroupAddOutlinedIcon style={{ color: "white", fontSize: "25" }} />
          </IconButton>
        )}
        <input
          className={styles.header__actions__input}
          accept="image/*"
          id="contained-button-file"
          type="file"
          onClick={clearInput}
          onInput={uploadFile}
        />
      </div>
      <Drawer
        anchor="right"
        open={drawerStatus}
        onClose={() => toggleDrawer(false)}
      >
        <div
          style={{
            width: "100vw",
            height: "100vh",
            color: "white",
            backgroundColor: "#121212",
          }}
        >
          {groups && groups.length > 0 ? (
            <DrawerContainer
              groups={groups}
              closeDrawer={() => toggleDrawer(false)}
              logoutUser={logoutUser}
              user={user}
              setGroupSelected={setGroupSelected}
              createGroup={createGroup}
              user_username={user_username}
            />
          ) : (
            <CreateGroupDrawerContianer
              // groups={groups}
              closeDrawer={() => toggleDrawer(false)}
              createGroup={createGroup}
              user_username={user_username}
              // user={user}
              // setGroupSelected={setGroupSelected}
            />
          )}
        </div>
      </Drawer>
    </div>
  );
}

export default HeaderContainer;
