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
  
const Symtom = props => (
    <Card className={props.classes.root} >
        <CardActionArea>
            <CardContent>
                <Typography
                    variant="h5" 
                    color="textSecondary"
                    component="h5"    
                >
                    {props.Symtom.title}
                </Typography>

                <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    {props.Symtom.body}
                </Typography>
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
                    <Link to={"/view/Symtom/" + props.Symtom._id} style ={{ textDecoration: "none" }}>
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
                    <Link to={"/edit/" + props.Symtom._id} style ={{ textDecoration: "none" }}>
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
                    onClick={() => { props.deleteSymtom(props.Symtom._id) }}
                    style ={{ textDecoration: "none" }}
                >
                    
                        Delete
                    
                </Button>
            </div>
        </CardActions>
    </Card>
);

class SymtomsPage extends Component {
    constructor(props) {
        super(props);

        // this.deleteSymtom = this.deleteSymtom.bind(this);

        this.state = {
            symtoms: []
        };
    };

    componentDidMount() {
        axios.get('http://localhost:5000/Symtom/')
            .then(response => {
                this.setState({ symtoms: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    };
    
    // deleteSymtom(id) {
    //     axios.delete('http://localhost:5000/Symtom/' + id)
    //         .then(res => console.log(res.data)
    //     );
        
    //     this.setState({
    //         symtoms: this.state.Symtom.filter(el => el._id !== id)
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
                    Your Symtoms
                
                    {/* <div style={{ padding: '10px', display: 'flex'}}> */}
                        {/* <Button 
                            size="large" 
                            color="primary"
                            type="submit"
                            variant="contained"
                            style={{ marginLeft: "35px" }}
                        >
                            <Link to={"/create/Symtom"} style ={{ textDecoration: "none", float: "right" }}>
                                Create Symtom
                            </Link> 
                        </Button> */}
                    {/* </div> */}
                </Typography>

                
                {this.state.Symtom.map(currentSymtom => {
                    return <Symtom Symtom={currentSymtom} 
                    //deleteSymtom={this.deleteSymtom} 
                    key={currentSymtom._id} classes={this.props.classes}/>;
                    })
                }
            </div>
        );
    }
}


export default withStyles(styles)(SymtomsPage)                             
