import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AuthService from "../services/auth/authService";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    container: {
        padding: theme.spacing(3),
    },
}));

class Login extends React.Component {

    constructor (props) {
        super(props);
        this.classes = useStyles;
        this.state = {
            username: '',
            password: '',
            logged_in: false
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.redirect = this.redirect.bind(this);
    }

    handleLogin(e) {
        e.preventDefault();
        AuthService.login(this.state.username, this.state.password)
            .then(
                () => {
                    this.setState(
                        {logged_in: true}
                    )
                },
                error => {
                    console.log(error.response)
                });
    }

    handleChange (event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    redirect() {
        return (
            <Redirect to="/" />
        )
    }

    render() {
        return (
            <Container className={this.classes.container} maxWidth="xs">
                {this.state.logged_in ? this.redirect() : ''}
                <form onSubmit={this.handleLogin}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField fullWidth
                                               value={this.state.username}
                                               label="Username"
                                               name="username"
                                               size="small"
                                               variant="outlined"
                                               onChange={this.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        value={this.state.password}
                                        label="Password"
                                        name="password"
                                        size="small"
                                        type="password"
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button color="primary" fullWidth type="submit" variant="contained">
                                Log in
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }


}

export default Login;