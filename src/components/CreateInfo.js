import React, { Component } from 'react';
import axios from 'axios'

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
  } from '@material-ui/pickers';

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


import {withRouter} from 'react-router-dom';



const styles = (theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.secondary.main,
      margin: theme.spacing(2)
    },
    button: {
      margin: `0px ${theme.spacing(1)}px`

    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
    marginTop: theme.spacing(2),
    },
  });

// const CreateInfoCard = props => (
//     <Card className={props.classes.root} >
//         <CardActionArea>
//             <CardContent>
//                 <FormControl className={props.classes.formControl}>
//                     <InputLabel id="demo-simple-select-label">User</InputLabel>  

//                     <Select
//                         labelId="demo-simple-select-label"
//                         id="demo-simple-select"
//                         value={this.state.username}
//                         onChange={this.onChangeUsername}
//                     >
//                         {
//                             this.state.users.map(function(user) {
//                                 return <option
//                                             key={user}
//                                             value={user}
//                                         >
//                                             {user}
//                                         </option>
//                             })
//                         };
//                     </Select>
//                 </FormControl>
//             </CardContent>
//         </CardActionArea>
//     </Card>
// );

// const classes = styles();
// const [selectedDate, setSelectedDate] = React.useState(new Date('2014-08-18T21:11:54'));
// const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };
class CreateInfo extends Component {

    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeExperience = this.onChangeExperience.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            experience: 0,
            date: new Date(),

            users: []
        };
    };

    componentDidMount() {
        // this.setState({
        //     users: ['test user'],
        //     username: 'test user'
        // });

        axios.get('http://localhost:5000/users/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    });
                }
            });
    };

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

        // console.log(info);

        axios.post('http://localhost:5000/info/add', info)
            .then(res => console.log(res.data));

        // window.location = '/';
        this.props.history.push('/')
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
                                            this.state.users.map(function(user) {
                                                return <option
                                                            key={user}
                                                            value={user}
                                                        >
                                                            {user}
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
                                            value={this.state.date}
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

// export default withStyles(styles)(CreateInfo)   
export default withRouter(CreateInfo)