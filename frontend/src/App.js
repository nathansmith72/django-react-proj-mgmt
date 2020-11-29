import './App.css';
import React from 'react';
import ResponsiveDrawer from "./components/drawer";
import {makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function App() {
    const classes = useStyles();
    return (
        <div className="App">
            <ResponsiveDrawer />
        </div>
    );
}

export default App;
