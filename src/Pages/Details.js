import React, { useState, useEffect } from "react";
import { API } from "../Config/api";
import { useParams } from "react-router-dom";
import { Grid, Container, Button, Paper, TextField } from "@material-ui/core";
import { Nav } from "../Components";
import Item from "./Item";
function Details(props) {
  const [form, setFormData] = useState({
    itemName: "",
  });
  const [data, setData] = useState();
  const token = localStorage.getItem("token");
  const { id } = useParams();

  const loadData = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const res = await API.get(`/item/${id}`, config);

      console.log(res.data.data);
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      await API.delete(`/item/${id}`, config);
      console.log("berhasil");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUpdate = () => {
    setFormData({
      itemName: data.name,
    });
  };

  const statusUpdate = async () => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };
    } catch (error) {}
  };
  const handleUpdates = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify({
        checklistId: 0,
        itemName: form.itemName,
      });

      await API.put(`/item/rename/${id}`, body, config);

      alert("Data Berhasil Diubah");
      loadData();
    } catch (error) {}
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      <Nav />
      <Container maxWidth="lg" style={{ marginTop: 100 }}>
        <Grid container spacing={4}>
          <Grid xs={12} sm={7} style={{ margin: 10 }}>
            <Paper style={{ padding: 20 }} square>
              <h2>{data ? data.name : ""}</h2>
            </Paper>
            <Button
              onClick={() => handleDelete(data.id)}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>

            <Button
              onClick={() => handleUpdate(data.id)}
              variant="contained"
              color="primary"
            >
              Update
            </Button>
          </Grid>

          <Grid xs={12} sm={4} style={{ margin: 10 }}>
            <Paper style={{ padding: 20 }}>
              <form onSubmit={(e) => handleUpdates(e)} autoComplete="off">
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
                      name="itemName"
                      value={form.itemName}
                      onChange={(e) =>
                        setFormData({ ...form, itemName: e.target.value })
                      }
                      style={{ width: 360 }}
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
                      Edit
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

export default Details;
