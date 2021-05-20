import React, { Component } from "react";
import axios from "axios";

import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import { withRouter } from "react-router-dom";

class EditNote extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeBody = this.onChangeBody.bind(this);
    this.onChangeStickyNote = this.onChangeStickyNote.bind(this);
    this.onChangeFlashcard = this.onChangeFlashcard.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: "",
      body: "",
      stickyNote: "",
      flashcard: "",
      image: "",

      users: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/note/" + this.props.match.params.id)
      .then((response) => {
        console.log("response!", response);
        this.setState({
          title: response.data.title,
          body: response.data.body,
          stickyNote: response.data.stickyNote,
          flashcard: response.data.flashcard,
          image: response.data.image
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data,
          loading: false,
        });
      }
    });
  }

  handleUserSelect(e) {
    console.log("select!", e);
    // this,set
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
  }

  onChangeBody(e) {
    this.setState({
      body: e.target.value,
    });
  }

  onChangeStickyNote(e) {
    this.setState({
      stickyNote: e.target.value,
    });
  }

  onChangeFlashcard(e) {
    this.setState({
      flashcard: e.target.value,
    });
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const note = {
      title: this.state.title,
      body: this.state.body,
      stickyNote: this.state.stickyNote,
      flashcard: this.state.flashcard,
      image: this.state.image
    };

    console.log(note);

    axios
      .post(
        "http://localhost:5000/note/update/" + this.props.match.params.id,
        note
      )
      .then((res) => {
        this.props.history.push("/");
      });
  }

  render() {
    if (this.state.loading) return <Typography>Loading</Typography>;
    return (
      <div className="cardRoot">
        <Typography
          gutterBottom
          variant="h5"
          component="h2"
          style={{
            fontFamily: "Raleway",
            textTransform: "uppercase",
            letterSpacing: "3px",
          }}
        >
          Edit Your Note
        </Typography>

        <Card>
          <CardContent>
            <form noValidate autoComplete="off">
              <TextField
                fullWidth
                id="standard-basic"
                label="Title"
                value={this.state.title}
                onChange={this.onChangeTitle}
                style={{ marginBottom: "35px" }}
              />

              <TextField
                fullWidth
                multiline
                rows={10}
                id="standard-basic"
                label="Body"
                value={this.state.body}
                onChange={this.onChangeBody}
                style={{ marginBottom: "35px" }}
              />

              <TextField
                fullWidth
                multiline
                rows={10}
                id="standard-basic"
                label="Sticky Note"
                value={this.state.stickyNote}
                onChange={this.onChangeStickyNote}
                style={{ marginBottom: "35px" }}
              />

              <TextField
                fullWidth
                multiline
                rows={10}
                id="standard-basic"
                label="Flashcard"
                value={this.state.flashcard}
                onChange={this.onChangeFlashcard}
                style={{ marginBottom: "35px" }}
              />

              <TextField
                fullWidth
                multiline
                rows={10}
                id="standard-basic"
                label="Image"
                value={this.state.image}
                onChange={this.onChangeImage}
                style={{ marginBottom: "35px" }}
              />
            </form>
          </CardContent>

          <CardActions style={{ padding: "10px", display: "flex" }}>
            <div style={{ marginLeft: "auto" }}>
              <Button
                size="large"
                color="primary"
                type="submit"
                variant="contained"
                value="Create Info Log"
                onClick={this.onSubmit}
              >
                Submit
              </Button>
            </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default withRouter(EditNote);
