import React, { Component } from 'react';
import {withRouter, Link} from 'react-router-dom';
import axios from 'axios'

import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
//   } from '@material-ui/pickers';

import {
    createStyles,
    withStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    // InputLabel,
    // MenuItem,
    // Select,
    // FormControl,
    TextField

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
        <CardActions style={{ padding: '10px', display: 'flex'}}>
            <div style={{ marginLeft: "auto" }}>
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

class ViewInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            users: [],
            loading: true,
            info: []
        };

        this.deleteInfo = this.deleteInfo.bind(this);
    };

    componentDidMount() {
        axios.get('http://localhost:5000/info/' + this.props.match.params.id)
            .then(response => {
                console.log('response!', response)
                this.setState({
                    title: response.data.title,
                    body: response.data.body,
                })
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data,
                        loading: false
                    });
                }
            }
        );
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
        if(this.state.loading) return <Typography>Loading</Typography>

        return (
            <div className="cardRoot">
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    style={{ fontFamily: "Raleway", textTransform: "uppercase", letterSpacing: "3px" }}
                >
                    {this.state.title}
                </Typography>

                <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    {this.state.body}
                </Typography>

                {this.state.info.map(currentInfo => {
                    return <Info info={currentInfo} deleteInfo={this.deleteInfo} key={currentInfo._id} classes={this.props.classes}/>;
                    })
                }

                {/* <Button 
                    size="large" 
                    color="primary"
                    type="submit"
                    variant="contained"
                    className={this.state.button}
                >
                    <Link to={"/edit/" + this.state.info._id} style ={{ textDecoration: "none" }}>
                        Edit
                    </Link> 
                </Button>

                <Button 
                    size="large" 
                    className={this.state.button}
                    color="secondary"
                    type="submit"
                    value="Delete"
                    variant="contained"
                    onClick={() => { this.props.deleteInfo(this.props.info._id) }}
                    style ={{ textDecoration: "none" }}
                >
                    
                    Delete
                    
                </Button> */}
            </div>
        )
    } 
}

export default withRouter(ViewInfo)
