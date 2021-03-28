import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

import {
  // createStyles,
  // withStyles,
  Card,
  // CardActionArea,
  CardActions,
  // CardContent,
  Button,
  Typography,
  // InputLabel,
  // MenuItem,
  // Select,
  // FormControl,
  // TextField
} from "@material-ui/core";

import "./../App.css";

// const styles = (theme) =>
//   createStyles({
//     root: {
//       backgroundColor: theme.palette.secondary.main,
//       margin: theme.spacing(2)
//     },
//     button: {
//       margin: `0px ${theme.spacing(1)}px`

//     }
//   });

const Note = (props) => (
  <Card className={props.classes.root}>
    <CardActions style={{ padding: "10px", display: "flex" }}>
      <div style={{ marginLeft: "auto" }}>
        <Button
          size="large"
          color="info"
          type="submit"
          variant="contained"
          className={props.classes.button}
        >
          <Link
            to={"/view/note/" + props.note._id}
            style={{ textDecoration: "none" }}
          >
            View
          </Link>
        </Button>

        <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          className={props.classes.button}
        >
          <Link
            to={"/edit/" + props.note._id}
            style={{ textDecoration: "none" }}
          >
            Edit
          </Link>
        </Button>

        <Button
          size="large"
          className={props.classes.button}
          color="secondary"
          type="submit"
          value="Delete"
          variant="contained"
          onClick={() => {
            props.deleteNote(props.note._id);
          }}
          style={{ textDecoration: "none" }}
        >
          Delete
        </Button>
      </div>
    </CardActions>
  </Card>
);

class ViewNote extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      body: "",
      stickyNote: "",
      flashcard: "",
      image: "",
      users: [],
      loading: true,
      note: [],
    };

    this.deleteNote = this.deleteNote.bind(this);
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
          image: response.data.image,
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

  deleteNote(id) {
    axios
      .delete("http://localhost:5000/note/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      note: this.state.note.filter((el) => el._id !== id),
    });
  }

  noteList() {
    return this.state.note.map((currentNote) => {
      return (
        <Note
          note={currentNote}
          deleteNote={this.deleteNote}
          key={currentNote._id}
        />
      );
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
          {this.state.title}
        </Typography>

        <br />

        <Typography variant="body1" color="textSecondary" component="p">
          {this.state.body}
        </Typography>

        <br />

        <Typography variant="body1" color="textSecondary" component="p">
          {this.state.stickyNote}
        </Typography>

        <br />

        <Typography variant="body1" color="textSecondary" component="p">
          {this.state.flashcard}
        </Typography>

        <br />

        <Typography variant="body1" color="textSecondary" component="p">
          {this.state.image}
        </Typography>

        {this.state.note.map((currentNote) => {
          return (
            <Note
              note={currentNote}
              deleteNote={this.deleteNote}
              key={currentNote._id}
              classes={this.props.classes}
            />
          );
        })}
      </div>
    );
  }
}

export default withRouter(ViewNote);
