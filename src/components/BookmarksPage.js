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
import BookmarkIcon from '@material-ui/icons/Bookmark';

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
            <ImportContactsIcon />
          </Link>
        </Button>

        {/* <Button
          size="large"
          color="primary"
          type="submit"
          variant="contained"
          className={props.classes.button}
        >
          <Link
            to={"/edit/" + props.info._id}
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
            props.deleteInfo(props.info._id);
          }}
          style={{ textDecoration: "none" }}
        >
          Delete
        </Button> */}
      </div>
    </CardActions>
  </Card>
);

class Bookmark extends Component {
  constructor(props) {
    super(props);

    this.deleteInfo = this.deleteInfo.bind(this);

    this.state = {
      info: [],
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
          Bookmarks
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
      </div>
    );
  }
}

export default withStyles(styles)(Bookmark);
