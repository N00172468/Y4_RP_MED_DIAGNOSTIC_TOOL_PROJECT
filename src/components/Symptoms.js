import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import {
    createStyles,
    withStyles,
} from "@material-ui/core";

import './../App.css'

// const BASE_URL = "https://priaid-symptom-checker-v1.p.rapidapi.com"
// const TOKEN = "3cf5fb64ffmsh61f42d18ae2ad82p1a237ejsn61ee2be8eb99"

const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(2)
    },
    button: {
      margin: `0px ${theme.spacing(1)}px`

    }
  });
  
const Symptom = props => (
    <Card className={props.classes.root} >
        <CardActionArea>
            <CardContent>
                <Typography
                    variant="h5" 
                    color="textSecondary"
                    component="h5"    
                >
                    {props.Symptom.symptom}
                </Typography>

                {/* <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    {props.Symptom.body}
                </Typography> */}
            </CardContent>
        </CardActionArea>

        <CardActions style={{ padding: '10px', display: 'flex'}}>
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
                
                <Button 
                    size="large" 
                    color="primary"
                    type="submit"
                    variant="contained"
                    className={props.classes.button}
                >
                    <Link to={"/edit/" + props.Symptom._id} style ={{ textDecoration: "none" }}>
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
                    onClick={() => { props.deleteSympom(props.Symptom._id) }}
                    style ={{ textDecoration: "none" }}
                >
                    
                        Delete
                    
                </Button>
            </div> */}
        </CardActions>
    </Card>
);
  
class SymptomsPage extends Component {
    constructor(props) {
        super(props);

        // this.deleteSymptom = this.deleteSymptom.bind(this);

        this.state = {
            symptoms: []
        };
    };
    
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
        axios.get('http://localhost:5000/Symptom/')
            .then(response => {
                this.setState({ symptoms: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };
    
    // deleteSymptom(id) {
    //     axios.delete('http://localhost:5000/Symptom/' + id)
    //         .then(res => console.log(res.data)
    //     );
        
    //     this.setState({
    //         symptoms: this.state.Symptom.filter(el => el._id !== id)
    //     });
    // };

    render() {
        return (
            <div className="cardRoot">
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    style={{ fontFamily: "Raleway", textTransform: "uppercase", letterSpacing: "3px" }}
                >
                    Your Symptoms
                
                    {/* <div style={{ padding: '10px', display: 'flex'}}> */}
                        <Button 
                            size="large" 
                            color="primary"
                            type="submit"
                            variant="contained"
                            style={{ marginLeft: "35px" }}
                        >
                            <Link to={"/create/Symptom"} style ={{ textDecoration: "none", float: "right" }}>
                                Create Symptom
                            </Link> 
                        </Button>
                    {/* </div> */}
                </Typography>

                
                {this.state.symptoms.length > 0 && this.state.symptoms.map(currentSymptom => {
                    return <Symptom Symptom={currentSymptom} deleteSymptom={this.deleteSymptom} key={currentSymptom.ID} classes={this.props.classes}/>;
                    })
                }
            </div>
        );
    }
}


export default withStyles(styles)(SymptomsPage)                             
