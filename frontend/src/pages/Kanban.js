import React from 'react';
import Grid from "@material-ui/core/Grid";
import IssueCard from "../components/IssueCard";
import TaskService from "../services/projects/tasks"
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import Modal from "@material-ui/core/Modal";
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = theme => ({
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
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

class Kanban extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            issues: [],
            issueStatuses: [
                'Backlog',
                'To Do',
                'In Progress',
                'Done',
            ],
            modalOpen: false
        }
        this.openCreateIssueModal = this.openCreateIssueModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        TaskService.getTasks().then(response => {
            this.setState({issues: response.results})
        })
    }

    columns () {
        const { classes } = this.props;
        return this.state.issueStatuses.map(status => {
            let issues = this.state.issues.filter(issue => {
                return issue.status.name === status
            }).map(issue => {
                return (<IssueCard issue={issue} />)
            });
            return (
                <Grid item xs={3}>
                    <div className={classes.kanban_column}>
                        {status}
                        {issues}
                    </div>
                </Grid>
            )
        });
    }

    openCreateIssueModal() {
        this.setState({
            modalOpen: true
        })
    }

    closeModal() {
        this.setState({
            modalOpen: false
        })
    }

    render() {
        const columns = this.columns();
        const { classes } = this.props;
        return (
            <div>
                <Grid container justify="space-between" direction="row" style={{ marginBottom: 10 }}>
                    <Grid item xs justify="left"><Button onClick={this.openCreateIssueModal} variant="contained" color="secondary"><AddIcon /> Create</Button></Grid>
                    <Grid item xs><h1 style={{ margin: 0 }}>Kanban Board</h1></Grid>
                    <Grid item xs/>
                </Grid>
                <div className={classes.root}>
                    <Grid container spacing={3}>
                        {columns}
                    </Grid>
                </div>
                <Modal
                    open={this.state.modalOpen}
                    onClose={this.closeModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    className={classes.modal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                      timeout: 500,
                    }}
                >
                    <div>test</div>
                </Modal>
            </div>
        )
    }
}

export default withStyles(useStyles, {withTheme: true})(Kanban);