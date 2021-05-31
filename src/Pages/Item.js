import React, { useState, useEffect } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { Nav } from "../Components";
import { API } from "../Config/api";
import { Container, Grid, Button, TextField, Paper } from "@material-ui/core";
function Item(props) {
  const [form, setFormData] = useState({
    checklistId: "",
    itemName: "",
  });

  const [data, setData] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log(form);
  }, [form]);

  const location = useLocation();

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        checklistId: form.checklistId,
        itemName: form.itemName,
      });

      const res = await API.post("/item", body, config);

      setData([...data, res.data.data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
      await API.delete(`/item/${id}`, config);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  console.log(location.state);
  return (
    <div>
      <Nav />

      <Container style={{ marginTop: 50 }} maxWidth="lg">
        <Grid xs={12} spacing={4} container>
          <Grid xs={12} sm={8} container spacing={2}>
            {location.state.map((item) => (
              <Grid xs={12} sm={4} style={{ margin: 20 }}>
                <Paper square>
                  <Link
                    style={{ color: "black", textDecoration: "none" }}
                    to={`/details/${item.id}`}
                  >
                    <div style={{ padding: 15 }}>{item.name}</div>
                  </Link>

                  <Button
                    onClick={() => handleDelete(item.id)}
                    variant="contained"
                    color="secondary"
                  >
                    Delete
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>

          <Grid xs={12} sm={4}>
            <Paper>
              <form onSubmit={(e) => handleUpload(e)} autoComplete="off">
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
                      name="name"
                      value={form.name}
                      onChange={(e) =>
                        setFormData({ ...form, name: e.target.value })
                      }
                      style={{ width: 360 }}
                      label="Name"
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
                      Add Checklist
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Item;
