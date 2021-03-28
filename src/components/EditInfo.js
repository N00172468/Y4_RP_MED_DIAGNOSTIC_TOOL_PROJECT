import React, { Component } from 'react';
import axios from 'axios'

import {
    Card,
    CardActions,
    CardContent,
    Button,
    Typography,
    TextField

} from "@material-ui/core";
import {withRouter} from 'react-router-dom';

class EditInfo extends Component {
    constructor(props) {
        super(props);

        this.onChangeOverview = this.onChangeOverview.bind(this);
        this.onChangeSymptoms = this.onChangeSymptoms.bind(this);
        this.onChangeCauses = this.onChangeCauses.bind(this);
        this.onChangeRiskFactors = this.onChangeRiskFactors.bind(this);
        this.onChangeComplications = this.onChangeComplications.bind(this);
        this.onChangePrevention = this.onChangePrevention.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.handleUserSelect = this.handleUserSelect.bind(this)

        this.state = {
            title: '',
            overview: '',
            symptoms: '',
            causes: '',
            risk_factors: '',
            complications: '',
            prevention: '',

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
                    overview: response.data.overview,
                    symptoms: response.data.symptoms,
                    causes: response.data.causes,
                    risk_factors: response.data.risk_factors,
                    complications: response.data.complications,
                    prevention: response.data.prevention
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
            title: this.state.title,
            overview: this.state.overview,
            symptoms: this.state.symptoms,
            causes: this.state.causes,
            risk_factors: this.state.risk_factors,
            complications: this.state.complications,
            prevention: this.state.prevention,
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
                    Edit Your Knowledge
                </Typography>

                <Card>
                        <CardContent>
                            <form noValidate autoComplete="off">
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
                            </form>
                        </CardContent>

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
