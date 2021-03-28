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

class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeBody = this.onChangeBody.bind(this);
        this.onChangeStickyNote = this.onChangeStickyNote.bind(this);
        this.onChangeFlashcard = this.onChangeFlashcard.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);

        this.state = {
            title: '',
            body: '',
            stickyNote: '',
            flashcard: '',
            image: '',

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

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    };

    onChangeBody(e) {
        this.setState({
            body: e.target.value
        });
    };

    onChangeStickyNote(e) {
        this.setState({
            stickyNote: e.target.value
        });
    };

    onChangeFlashcard(e) {
        this.setState({
            flashcard: e.target.value
        });
    };

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        });
    };

    onSubmit(e) {
        e.preventDefault();

        const info = {
            title: this.state.title,
            body: this.state.body,
            stickyNote: this.state.stickyNote,
            flashcard: this.state.flashcard,
            image: this.state.image,
        };

        axios.post('http://localhost:5000/note/add', info)
            .then(res => console.log(res.data));
            
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
                    Create Note
                </Typography>

                {/* <CreateInfoCard classes={this.props.classes} /> */}

                <Card>
                    {/* <CardActionArea> */}
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
                                    label="Note" 
                                    value={this.state.body}
                                    onChange={this.onChangeBody}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Sticky Note" 
                                    value={this.state.stickyNote}
                                    onChange={this.onChangeStickyNote}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Flash Card" 
                                    value={this.state.flashcard}
                                    onChange={this.onChangeFlashcard}
                                    style={{ marginBottom: "35px" }}
                                />
                                
                                <TextField 
                                    fullWidth
                                    multiline
                                    rows={10}
                                    id="standard-basic" 
                                    label="Image" 
                                    value={this.state.image}
                                    onChange={this.onChangeImage}
                                    style={{ marginBottom: "35px" }}
                                />
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
export default withRouter(CreateNote)