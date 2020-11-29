import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import IssueCard from "../components/IssueCard";
import TaskService from "../services/projects/tasks"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        margin: 8
    },
    kanban_column: {
        backgroundColor: 'rgb(244, 245, 247)',
        padding: 8,
        height: '100%',
    }
}));

class Kanban extends React.Component {

    constructor (props) {
        super(props);
        this.classes = useStyles;
        this.state = {
            issues: [],
            issueStatuses: [
                'Backlog',
                'To Do',
                'In Progress',
                'Done',
            ]
        }
    }

    componentDidMount() {
        TaskService.getTasks().then(response => {
            this.setState({issues: response.results})
        })
    }

    columns () {
        return this.state.issueStatuses.map(status => {
            let issues = this.state.issues.filter(issue => {
                return issue.status.name === status
            }).map(issue => {
                return (<IssueCard issue={issue} />)
            });
            return (
                <Grid item xs={3}>
                    <div className={this.classes.kanban_column}>
                        {status}
                        {issues}
                    </div>
                </Grid>
            )
        });
    }

    render() {
        const columns = this.columns();
        return (
            <div>
                <h1>Kanban Board</h1>
                <div className={this.classes.root}>
                    <Grid container spacing={3}>
                        {columns}
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Kanban;