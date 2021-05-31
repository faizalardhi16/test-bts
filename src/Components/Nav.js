import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Nav() {
  const classes = useStyles();

  const LogOut = () => {
    localStorage.removeItem("token");

    window.location.reload();
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Tes BTS
          </Typography>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            <Button style={{ marginLeft: 5, marginRight: 5 }} color="inherit">
              Checklist
            </Button>
          </Link>
          <Link to="/item" style={{ color: "white", textDecoration: "none" }}>
            <Button style={{ marginLeft: 5, marginRight: 5 }} color="inherit">
              Item
            </Button>
          </Link>
          <Button
            onClick={() => LogOut()}
            style={{ marginLeft: 5, marginRight: 5 }}
            color="inherit"
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
