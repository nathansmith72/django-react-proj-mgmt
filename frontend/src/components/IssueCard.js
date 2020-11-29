import React from 'react';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';


const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
        margin: 8
    },
    issue_title: {
        fontSize: 15,
        margin: 0,
        color: 'black',
        paddingBottom: 15
    },
    avatar_image: {
        width: 28,
        height: 28,
        borderRadius: '100%',
    },
    avatar_image_container: {
        display: 'flex',
        flexDirection: 'row-reverse'
    },
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));

function IssueCard(props) {
    const classes = useStyles();

    function avatar() {
        return (
            <div className={classes.avatar_image_container}>
                <div>
                    <img alt="avatar" className={classes.avatar_image} src={'https://i.ibb.co/7JM1P2r/picke-rick.jpg'}/>
                </div>
            </div>
        )
    }

    return (
        <Paper className={classes.paper}>
            <p className={classes.issue_title}>{props.issue.title}</p>
            <div className={classes.flex}>
                <div>
                    <CheckBoxIcon />
                    <ArrowUpwardIcon />
                </div>
                {props.issue.assigned_to ? avatar() : ''}
            </div>
        </Paper>
    )
}

export default IssueCard;