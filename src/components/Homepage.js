import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import {
    createStyles,
withStyles,
} from "@material-ui/core";

import './../App.css'

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
  
const Info = props => (
    <Card className={props.classes.root} >
        <CardActionArea>
            <CardContent>
                {/* <Typography
                    variant="h5" 
                    color="textSecondary"
                    component="h5"    
                >
                    {props.info.username}
                </Typography> */}
                
                <Typography
                    variant="h5" 
                    color="textSecondary"
                    component="h5"    
                >
                    {props.info.title}
                </Typography>

                <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    {props.info.body}
                </Typography>

                {/* <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    Experience: {props.info.experience}
                </Typography>

                <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    Date: {props.info.date.substring(0,10)}
                </Typography> */}
            </CardContent>
        </CardActionArea>

        <CardActions style={{ padding: '10px', display: 'flex'}}>
            <div style={{ marginLeft: "auto" }}>
                <Button 
                    size="large" 
                    color="info"
                    type="submit"
                    variant="contained"
                    className={props.classes.button}
                >
                    <Link to={"/view/" + props.info._id} style ={{ textDecoration: "none" }}>
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
                    <Link to={"/edit/" + props.info._id} style ={{ textDecoration: "none" }}>
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
                    onClick={() => { props.deleteInfo(props.info._id) }}
                    style ={{ textDecoration: "none" }}
                >
                    
                        Delete
                    
                </Button>
            </div>
        </CardActions>
    </Card>
);

class Homepage extends Component {
    constructor(props) {
        super(props);

        this.deleteInfo = this.deleteInfo.bind(this);

        this.state = {
            info: []
        };
    };

    componentDidMount() {
        axios.get('http://localhost:5000/info/')
            .then(response => {
                this.setState({ info: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };

    deleteInfo(id) {
        axios.delete('http://localhost:5000/info/' + id)
            .then(res => console.log(res.data)
        );
        
        this.setState({
            info: this.state.info.filter(el => el._id !== id)
        });
    };

    infoList() {
        return this.state.info.map(currentInfo => {
            return <Info info={currentInfo} deleteInfo={this.deleteInfo} key={currentInfo._id}/>;
        })
    };

    render() {
        return (
            <div className="cardRoot">
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    style={{ fontFamily: "Raleway", textTransform: "uppercase", letterSpacing: "3px" }}
                >
                    Recent Activities
                </Typography>

                {this.state.info.map(currentInfo => {
                    return <Info info={currentInfo} deleteInfo={this.deleteInfo} key={currentInfo._id} classes={this.props.classes}/>;
                    })
                }
            </div>
        );
    }
}


export default withStyles(styles)(Homepage)                             
