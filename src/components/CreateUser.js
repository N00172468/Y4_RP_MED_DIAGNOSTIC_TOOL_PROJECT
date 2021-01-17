import React, { Component } from 'react';
import axios from 'axios'

import {
    createStyles,
    withStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    InputLabel,
    MenuItem,
    Select,
    FormControl,
    TextField

} from "@material-ui/core";

import './../App.css'

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        };
    };

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        };

        console.log(user);

        axios.post('http://localhost:5000/users/add', user)
            .then(res => console.log(res.data));

        this.setState({
            username: ''
        });
    };

    render() {
        return(
            <div className="cardRoot">
                <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h2" 
                    style={{ fontFamily: "Raleway", textTransform: "uppercase", letterSpacing: "3px" }}
                >
                    Add User
                </Typography>

                <Card>
                    <CardActionArea>
                        <CardContent>
                        <form noValidate autoComplete="off">
                        <TextField 
                                    fullWidth
                                    id="standard-basic" 
                                    label="Name" 
                                    value={this.state.username}
                                    onChange={this.onChangeUsername}
                                />
                        </form>
                        </CardContent>
                    </CardActionArea>

                    <CardActions style={{ padding: '10px', display: 'flex'}}>
                        <div style={{ marginLeft: "auto" }}>
                            <Button 
                                size="large" 
                                color="primary"
                                type="submit"
                                variant="contained"
                                value="Create User"
                            >
                                Submit
                            </Button>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    };
}