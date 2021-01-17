import React, { Component } from 'react';
import axios from 'axios'

import './../App.css'

export default class CreateInfo extends Component {
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

        console.log(info);

        axios.post('http://localhost:5000/info/add', info)
            .then(res => console.log(res.data));

        window.location = '/';
    };

    
}