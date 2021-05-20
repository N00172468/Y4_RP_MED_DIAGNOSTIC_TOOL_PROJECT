import {
    React,  
    Component, 
    // useState, 
    // useEffect 
} from "react";
// import { Link } from "react-router-dom";
import axios from "axios";

import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    // Button,
    Typography,
    createStyles,
    withStyles,
    Grid
} from "@material-ui/core"

import "./../App.css";

// const BASE_URL = CHECK RP FOLDER
// const TOKEN = CHECK RP FOLDER


const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(2),
    },
    button: {
      margin: `0px ${theme.spacing(1)}px`,
    },
  });

const Symptom = (props) => (
  // <Grid container>
    <Grid item xs={6}> 
      <Card className={props.classes.root} style={{height: "200px"}}>
        <CardActionArea>
          <CardContent>
            <Typography variant="h5" color="textSecondary" component="h5">
              {props.Symptom.symptom}
              {/* {props.symptoms} */}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions style={{ padding: "10px", display: "flex" }}>
          {/* <div style={{ marginLeft: "auto" }}>
                    <Button 
                        size="large" 
                        color="info"
                        type="submit"
                        variant="contained"
                        className={props.classes.button}
                        >
                        <Link to={"/view/Symptom/" + props.Symptom._id} style ={{ textDecoration: "none" }}>
                        View
                        </Link> 
                    </Button>
                  </div> */}
        </CardActions>
      </Card>
    </Grid>
  // </Grid>
);

// const [posts, setPosts] = useState([]);

class SymptomsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      symptoms: [],
    };
  }

  // componentDidMount() {
  //     axios.get(BASE_URL + "/symptoms?language=en-gb&format=json", {
  //         headers: {
  //             "x-rapidapi-key": TOKEN
  //         }
  //     })
  //     .then(response => {
  //         console.log('response!', response)
  //         this.setState({ symptoms: response.data })
  //     })
  //     .catch((error) => {
  //         console.log(error);
  //     })
  // };

  componentDidMount() {
    axios
      .get("http://localhost:5000/Symptom/")
      .then((response) => {
        this.setState({ symptoms: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
          Categories
        </Typography>

        <Grid container>

          {this.state.symptoms.length > 0 &&
            this.state.symptoms.map((currentSymptom, i) => {
              return (
                <Symptom
                Symptom={currentSymptom}
                deleteSymptom={this.deleteSymptom}
                key={i}
                classes={this.props.classes}
                />
                );
              })}
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SymptomsPage);
