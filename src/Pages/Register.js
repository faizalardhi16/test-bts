import React, { useState, useEffect } from "react";
import { API } from "../Config/api";
import { Button, Grid, Paper, Container, TextField } from "@material-ui/core";

function Register(props) {
  const [form, setFormData] = useState({
    username: "",
    password: "",
    email: "",
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
        email: form.email,
      });

      await API.post("/register", body, config);

      alert("Berhasil Daftar!");
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
                name="email"
                type="email"
                value={form.email}
                onChange={(e) =>
                  setFormData({ ...form, email: e.target.value })
                }
                style={{ width: 360, margin: 10 }}
                label="Email"
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
                Daftar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
