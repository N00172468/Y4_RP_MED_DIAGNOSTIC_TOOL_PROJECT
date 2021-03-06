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
    withStyles
} from "@material-ui/core"

import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import BookmarkIcon from '@material-ui/icons/Bookmark';

import "./../App.css";

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(2),
    },
    button: {
      margin: `0px ${theme.spacing(1)}px`
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

const Info = (props) => (
  <Card className={props.classes.root}>
    <CardActionArea>
      <CardContent>
        <Typography variant="h5" color="textSecondary" component="h5">
        <BookmarkIcon/>
          {props.info.title}
        </Typography>

        <Typography variant="body2" color="textSecondary" component="p">
          {props.info.overview}
        </Typography>
      </CardContent>
    </CardActionArea>

    <CardActions style={{ padding: "10px", display: "flex" }}>
      <div style={{ marginLeft: "auto" }}>
        <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          className={props.classes.buttonView}
        >
          <Link
            to={"/view/" + props.info._id}
            style={{ textDecoration: "none" }}
          >
            {/* View */}
            <ImportContactsIcon />
          </Link>
        </Button>
      </div>
    </CardActions>
  </Card>
);

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
          color="primary"
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
          color="info"
          type="submit"
          variant="contained"
          // className={props.classes.button}
          className={props.classes.buttonEdit}
        >
          <Link
            to={"/edit/" + props.note._id}
            style={{ textDecoration: "none" }}
          >
            {/* Edit */}
            <EditIcon />
          </Link>
        </Button>

        <Button
          size="large"
          color="secondary"
          type="submit"
          value="Delete"
          variant="contained"
          onClick={() => {
            props.deleteNote(props.note._id);
          }}
          style={{ textDecoration: "none" }}
        >
          {/* Delete */}
          <DeleteIcon />
        </Button>
      </div>
    </CardActions>
  </Card>
);

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.deleteInfo = this.deleteInfo.bind(this);
    this.deleteNote = this.deleteNote.bind(this);

    this.state = {
      info: [],
      note: [],
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/info/")
      .then((response) => {
        this.setState({ info: response.data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios
      .get("http://localhost:5000/note/")
      .then((response) => {
        this.setState({ note: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteInfo(id) {
    axios
      .delete("http://localhost:5000/info/" + id)
      .then((res) => console.log(res.data));

    this.setState({
      info: this.state.info.filter((el) => el._id !== id),
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
          Recent Activities
        </Typography>

        {this.state.info.map((currentInfo) => {
          return (
            <Info
              info={currentInfo}
              deleteInfo={this.deleteInfo}
              key={currentInfo._id}
              classes={this.props.classes}
            />
          );
        })}

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

export default withStyles(styles)(Homepage);
