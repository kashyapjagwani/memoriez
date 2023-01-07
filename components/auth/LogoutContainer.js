import Button from "@mui/material/Button";

function Logout({ logoutUser }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Button variant="text" onClick={() => logoutUser()}>
        Logout
      </Button>
    </div>
  );
}
export default Logout;
