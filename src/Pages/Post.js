import React, { useState, useEffect } from "react";
import { API } from "../Config/api";
import { Grid, Button, TextField, Paper, Container } from "@material-ui/core";
import { Nav } from "../Components";
import { Link } from "react-router-dom";
function Post(props) {
  const [data, setData] = useState([]);
  const [form, setFormData] = useState({
    name: "",
    itemName: "",
    checklistId: "",
  });
  const token = localStorage.getItem("token");

  const loadData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const res = await API.get("/checklist", config);

      setData(res.data.data);

      console.log(res.data);
    } catch (error) {}
  };

  const handleUpCheck = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        name: form.name,
      });

      const res = await API.post("/checklist", body, config);

      setData([...data, res.data.data]);

      handleItem(res.data.data.id);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleItem = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      const bodies = JSON.stringify({
        checklistId: id,
        itemName: form.itemName,
        itemCompletionStatus: true,
      });

      const resz = await API.post("/item", bodies, config);

      console.log(resz);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      await API.delete(`/checklist/${id}`, config);

      loadData();
    } catch (error) {}
  };

  return (
    <div>
      <Nav />
      <Container maxWidth="lg" style={{ marginTop: 100 }}>
        <Grid container>
          <Grid xs={12} lg={8} container>
            {data.map((item) => (
              <Grid xs={12} sm={4} style={{ margin: 20 }}>
                <Paper>
                  <Link
                    style={{ textDecoration: "none" }}
                    to={{
                      pathname: `/item/${item.id}`,
                      state: item.items,
                    }}
                  >
                    <div style={{ padding: 20 }}>{item.name}</div>
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

          <Grid xs={12} lg={4}>
            <Paper>
              <form onSubmit={(e) => handleUpCheck(e)} autoComplete="off">
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
                      style={{ width: 360, marginTop: 10, marginBottom: 10 }}
                      label="Name"
                    />
                  </Grid>

                  <Grid xs={12}>
                    <TextField
                      id="standard-basic"
                      name="itemName"
                      value={form.itemName}
                      onChange={(e) =>
                        setFormData({ ...form, itemName: e.target.value })
                      }
                      style={{ width: 360, marginTop: 10, marginBottom: 10 }}
                      label="Item Name"
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

export default Post;
