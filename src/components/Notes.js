import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  Typography,
  createStyles,
  withStyles,
} from "@material-ui/core";

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import "./../App.css";

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(2),
    },
    button: {
      margin: `0px ${theme.spacing(1)}px`,
    },
    buttonView: {
      margin: `0px ${theme.spacing(1)}px`,
      backgroundColor: theme.palette.primary.main,
    },
    buttonEdit: {
      margin: `0px ${theme.spacing(1)}px`,
      backgroundColor: theme.palette.secondary.light,
    },
    buttonDelete: {
      margin: `0px ${theme.spacing(1)}px`,
      backgroundColor: theme.palette.secondary.main,
    },
  });

const Note = (props) => (
  <Card className={props.classes.root}>
    <CardActionArea>
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="h5">
          {props.note.title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {props.note.body}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions style={{ padding: "10px", display: "flex" }}>
      <div style={{ marginLeft: "auto" }}>
        <Button
          size="large"
          color="info"
          type="submit"
          variant="contained"
          className={props.classes.buttonView}
        >
          <Link
            to={"/note/" + props.note._id}
            style={{ textDecoration: "none" }}
          >
            <ImportContactsIcon />
          </Link>
        </Button>

        <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          className={props.classes.buttonEdit}
        >
          <Link
            to={"/edit/note/" + props.note._id}
            style={{ textDecoration: "none" }}
          >
            <EditIcon />
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
          <DeleteIcon />
        </Button>
      </div>
    </CardActions>
  </Card>
);

class NotesPage extends Component {
  constructor(props) {
    super(props);

    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      note: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/note/")
      .then((response) => {
        this.setState({ note: response.data });
      })
      .catch((error) => {
        console.log(error);
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

  render() {
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
          Your Notes
          <Button
            size="large"
            color="primary"
            type="submit"
            variant="contained"
            style={{ marginLeft: "35px" }}
          >
            <Link
              to={"/note/add"}
              style={{ textDecoration: "none", float: "right" }}
            >
              Create Note
            </Link>
          </Button>
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

export default withStyles(styles)(NotesPage);
