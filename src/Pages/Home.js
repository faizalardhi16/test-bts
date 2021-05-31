import React, { useState, useEffect } from "react";
import { API } from "../Config/api";
import { Link } from "react-router-dom";
import { Button, Grid, Paper, Container, TextField } from "@material-ui/core";

function Home(props) {
  const [form, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    console.log(form);
  }, [form]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        username: form.username,
        password: form.password,
      });

      const res = await API.post("/login", body, config);

      localStorage.setItem("token", res.data.data.token);

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
      }}
    >
      <Paper>
        <form onSubmit={(e) => handleLogin(e)} autoComplete="off">
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              padding: 30,
            }}
          >
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                name="username"
                value={form.username}
                onChange={(e) =>
                  setFormData({ ...form, username: e.target.value })
                }
                style={{ width: 360, margin: 10 }}
                label="Username"
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                id="standard-basic"
                id="standard-basic"
                name="password"
                type="password"
                value={form.password}
                onChange={(e) =>
                  setFormData({ ...form, password: e.target.value })
                }
                style={{ width: 360, margin: 10 }}
                label="Password"
              />
            </Grid>

            <Grid xs={12} style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                style={{ width: 360 }}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </form>

        <Link to="/register">
          <h2 style={{ textAlign: "center" }}>Daftar</h2>
        </Link>
      </Paper>
    </Container>
  );
}

export default Home;
