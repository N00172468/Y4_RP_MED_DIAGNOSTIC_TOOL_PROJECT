import React, { Component } from 'react';
import axios from 'axios'

import 'date-fns';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
//   } from '@material-ui/pickers';

import {
    // createStyles,
    // withStyles,
    Card,
    // CardActionArea,
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
import {withRouter} from 'react-router-dom';

import './../App.css'

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

class ViewInfo extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            body: '',
            users: [],
            loading: true
        };
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
            </div>
        )
    } 
}

export default withRouter(ViewInfo)
