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



// const styles = (theme) =>
//   createStyles({
//     root: {
//       backgroundColor: theme.palette.secondary.main,
//       margin: theme.spacing(2)
//     },
//     button: {
//       margin: `0px ${theme.spacing(1)}px`

//     },
//     formControl: {
//         margin: theme.spacing(1),
//         minWidth: 120,
//     },
//     selectEmpty: {
//     marginTop: theme.spacing(2),
//     },
//   });

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

        // this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeOverview = this.onChangeOverview.bind(this);
        this.onChangeSymptoms = this.onChangeSymptoms.bind(this);
        this.onChangeCauses = this.onChangeCauses.bind(this);
        this.onChangeRiskFactors = this.onChangeRiskFactors.bind(this);
        this.onChangeComplications = this.onChangeComplications.bind(this);
        this.onChangePrevention = this.onChangePrevention.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            // username: '',
            title: '',
            // body: '',
            overview: '',
            symptoms: '',
            causes: '',
            risk_factors: '',
            complications: '',
            prevention: '',

            users: []
        };
    };

    componentDidMount() {
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

    // onChangeUsername(e) {
    //     this.setState({
    //         username: e.target.value
    //     });
    // };

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    };

    onChangeOverview(e) {
        this.setState({
            overview: e.target.value
        });
    };

    onChangeSymptoms(e) {
        this.setState({
            symptoms: e.target.value
        });
    };

    onChangeCauses(e) {
        this.setState({
            causes: e.target.value
        });
    };

    onChangeRiskFactors(e) {
        this.setState({
            risk_factors: e.target.value
        });
    };

    onChangeComplications(e) {
        this.setState({
            complications: e.target.value
        });
    };

    onChangePrevention(e) {
        this.setState({
            prevention: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const info = {
            // username: this.state.username,
            title: this.state.title,
            // body: this.state.body,
            overview: this.state.overview,
            symptoms: this.state.symptoms,
            causes: this.state.causes,
            risk_factors: this.state.risk_factors,
            complications: this.state.complications,
            prevention: this.state.prevention,
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
                    Publicise Your Knowledge
                </Typography>

                {/* <CreateInfoCard classes={this.props.classes} /> */}

                <Card>
                    {/* <CardActionArea> */}
                        <CardContent>
                            <form noValidate autoComplete="off">
                                {/* <FormControl>
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
                                </FormControl> */}

                                <TextField 
                                    fullWidth
                                    id="standard-basic" 
                                    label="Title" 
                                    value={this.state.title}
                                    onChange={this.onChangeTitle}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Overview" 
                                    value={this.state.overview}
                                    onChange={this.onChangeOverview}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Symptoms" 
                                    value={this.state.symptoms}
                                    onChange={this.onChangeSymptoms}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Causes" 
                                    value={this.state.causes}
                                    onChange={this.onChangeCauses}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Risk Factors" 
                                    value={this.state.risk_factors}
                                    onChange={this.onChangeRiskFactors}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Complications" 
                                    value={this.state.complications}
                                    onChange={this.onChangeComplications}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Prevention" 
                                    value={this.state.prevention}
                                    onChange={this.onChangePrevention}
                                    style={{ marginBottom: "35px" }}
                                />
                                

                                {/* <TextField 
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
                                </MuiPickersUtilsProvider> */}
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