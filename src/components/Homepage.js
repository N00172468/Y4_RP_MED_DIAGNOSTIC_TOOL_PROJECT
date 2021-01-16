import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './../App.css'

const Info = props => (
    <div>
        <CardActionArea>
            <CardContent>
                <Typography
                    variant="h5" 
                    color="textSecondary"
                    component="h5"    
                >
                    {props.info.username}
                </Typography>

                <Typography
                    variant="body2" 
                    color="textSecondary"
                    component="p"    
                >
                    Description: {props.info.description}
                </Typography>

                <Typography
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
                </Typography>
            </CardContent>
        </CardActionArea>

        <CardActions style={{ padding: '10px', display: 'flex'}}>
            <div style={{ marginLeft: "auto" }}>
                <Button 
                    size="large" 
                    color="primary"
                    type="submit"
                    value="Edit"
                >
                    <Link to={"/edit/" + props.info._id}>
                        Edit
                    </Link> 
                </Button>

                <Button 
                    size="large" 
                    color="danger"
                    type="submit"
                    value="Delete"
                >
                    <a href="#" onClick={() => { props.deleteInfo(props.info._id) }}>
                        Delete
                    </a>
                </Button>
            </div>
        </CardActions>
    </div>
);

export default class Homepage extends Component {
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
                <Typography gutterBottom variant="h5" component="h2">
                    Recent Activities
                </Typography>

                <Card>
                    <CardActionArea>
                        <CardContent>
                            <Typography
                                variant="body2" 
                                color="textSecondary"
                                component="p"    
                                style={{ fontFamily: 'Montserrat' }}
                            >
                                { this.infoList() }
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </div>

                // <h3 className="caption">Logged <span className="tertiaryCol">Info</span></h3>

                // <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
                //     <table>
                //         <thead className="heads">
                //             <tr>
                //                 <th>Username</th>
                //                 <th>Description</th>
                //                 <th>Experience</th>
                //                 <th>Date</th>
                //                 <th>Action</th>
                //             </tr>
                //         </thead>

                //         <tbody style={{ textAlign: 'center', fontFamily: 'Montserrat' }}>
                //             { this.infoList() }
                //         </tbody>
                //     </table>
                // </div>
            // </div>
        );
    }
}