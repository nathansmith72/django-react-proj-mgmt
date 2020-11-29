import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Projects from "../pages/projects";
import Kanban from "../pages/Kanban";
import Login from "../pages/Login";
import AuthService from "../services/auth/authService"

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ResponsiveDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isLoggedIn = AuthService.isLoggedIn()

  const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {isLoggedIn &&
            <Link to="/projects">
              <ListItem button>
                <ListItemIcon><AccountTreeIcon/></ListItemIcon>
                <ListItemText primary={"Projects"} />
              </ListItem>
            </Link>
          }
          {isLoggedIn &&
          <Link to="/khanban">
            <ListItem button>
              <ListItemIcon><AccountTreeIcon/></ListItemIcon>
              <ListItemText primary={"Khanban"}/>
            </ListItem>
          </Link>
          }
          {!isLoggedIn &&
            <Link to="/login">
              <ListItem button>
                <ListItemIcon><ExitToAppIcon/></ListItemIcon>
                <ListItemText primary={"Login"} />
              </ListItem>
            </Link>
          }
        </List>
      </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                Project Manager
              </Typography>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                  container={container}
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
              >
                {drawer}
              </Drawer>
            </Hidden>
            <Hidden xsDown implementation="css">
              <Drawer
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  variant="permanent"
                  open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>
          {/*todo remove this stuff*/}
          <main className={classes.content}>
            <div className={classes.toolbar} />

            <Switch>
              <Route exact path="/">
                <Dashboard />
              </Route>
              <Route exact path="/projects">
                <Projects />
              </Route>
              <Route exact path="/khanban">
                <Kanban />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
            </Switch>
          </main>
        </div>
      </Router>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
