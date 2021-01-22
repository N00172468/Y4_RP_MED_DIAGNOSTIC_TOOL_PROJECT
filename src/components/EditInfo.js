import React, { Component } from 'react';
import axios from 'axios'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

import {
    // createStyles,
    // withStyles,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    Button,
    Typography,
    InputLabel,
    // MenuItem,
    Select,
    FormControl,
    TextField

} from "@material-ui/core";
import {withRouter} from 'react-router-dom';



class EditInfo extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this)

        this.state = {
            username: '',
            description: '',
            experience: 0,
            date: new Date(),

            users: [],
            loading: true
        };
    };

    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // });
        axios.get('http://localhost:5000/info/' + this.props.match.params.id)
            .then(response => {
                console.log('respponse!', response)
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    experience: response.data.experience,
                    date: new Date(response.data.date)
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
            });
    };

    handleUserSelect(e) {
        console.log('select!', e)
        // this,set
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    };

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    };

    onChangeExperience(e) {
        this.setState({
            experience: e.target.value
        });
    };

    onChangeDate(date) {
        this.setState({
            date: date
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const info = {
            username: this.state.username,
            description: this.state.description,
            experience: this.state.experience,
            date: this.state.date
        };

        console.log(info);

        axios.post('http://localhost:5000/info/update/' + this.props.match.params.id, info)
            .then(res => {
                this.props.history.push('/')

            });

        
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
                    Add Information
                </Typography>

                {/* <CreateInfoCard classes={this.props.classes} /> */}

                <Card>
                    {/* <CardActionArea> */}
                        <CardContent>
                            <form noValidate autoComplete="off">
                                <FormControl>
                                    <InputLabel id="demo-simple-select-label">User</InputLabel>  

                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        style={{ marginBottom: "35px" }}
                                    >
                                     
                                        {
                                            this.state.users.map((user, i) => {
                                                
                                                return <option
                                                            key={i}
                                                            value={user.username}
                                                            onChange={this.handleUserSelect}
                                                        >
                                                            {user.username}
                                                        </option>
                                            })
                                        };
                                    </Select>
                                </FormControl>

                                <TextField 
                                    fullWidth
                                    id="standard-basic" 
                                    label="Description" 
                                    value={this.state.description}
                                    onChange={this.onChangeDescription}
                                    style={{ marginBottom: "35px" }}
                                />

                                <TextField 
                                    id="standard-basic" 
                                    label="Experience (In Years)" 
                                    value={this.state.experience}
                                    onChange={this.onChangeExperience}
                                    style={{ marginBottom: "35px" }}
                                />

                                <MuiPickersUtilsProvider utils={DateFnsUtils} style={{ padding: '10px', display: 'flex'}}>
                                    <div style={{ marginLeft: "auto" }}>
                                        <KeyboardDatePicker
                                            margin="normal"
                                            id="date-picker-dialog"
                                            label="Date picker dialog"
                                            format="dd/MM/yyyy"
                                            onChange={this.onChangeDate}
                                            KeyboardButtonProps={{
                                                'aria-label': 'change date',
                                            }}
                                        />
                                    </div>
                                </MuiPickersUtilsProvider>
                            </form>
                        </CardContent>
                    {/* </CardActionArea> */}

                    <CardActions style={{ padding: '10px', display: 'flex'}}>
                        <div style={{ marginLeft: "auto" }}>
                            <Button 
                                size="large" 
                                color="primary"
                                type="submit"
                                variant="contained"
                                value="Create Info Log"
                                onClick={this.onSubmit}
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

export default withRouter(EditInfo)
