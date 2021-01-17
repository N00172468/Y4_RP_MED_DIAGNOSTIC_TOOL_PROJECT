import React from 'react';
import { Link } from 'react-router-dom';

import Nav from "./Nav";

import {
  makeStyles,
  useTheme,
  withStyles,
  List,
  ListItem,
  ListItemIcon,
  Divider,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Hidden,
  Drawer,
  CssBaseline
} from "@material-ui/core";
import {
  Inbox,
  Mail,
  Menu,
  Home,
  AddCircleOutline,
  Face,
  TurnedInNot,
  Widgets
  // ListItemIcon
} from "@material-ui/icons";

const drawerWidth = 500;

const styles = makeStyles((theme) => ({
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
      marginLeft: 'drawerWidth',
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

const Navigation = (props) => {
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <div className={props.classes.toolbar} />
      <Divider />

      <List>
        <Link to="/" style ={{ textDecoration: "none" }}>
          {['Home'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index = <Home />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Link>

        <Link to="/create" style ={{ textDecoration: "none" }}>
          {['Create Info'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index = <AddCircleOutline />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Link>

        <Link to="/User" style ={{ textDecoration: "none" }}>
          {['Add User'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index = <Face />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Link>
      
        <Link to="/" style ={{ textDecoration: "none" }}>
          {['Bookmarks'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index = <TurnedInNot />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Link>

        <Link to="/" style ={{ textDecoration: "none" }}>
          {['Categories'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index = <Widgets />}
              </ListItemIcon>

              <ListItemText primary={text} />
            </ListItem>
          ))}
        </Link>
      </List>

      {/* <Divider /> */}
    </div>
  );

  return (
    <React.Fragment>
          <CssBaseline />

          <AppBar position="fixed" className={props.classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={props.classes.menuButton}
              >
                <Menu />
              </IconButton>
              
              <Nav /> 
            </Toolbar>
          </AppBar>

          <nav className={props.classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css">
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{paper: props.classes.drawerPaper}}
                ModalProps={{keepMounted: true}} // Better open performance on mobile.
              >
                {drawer}
              </Drawer>
            </Hidden>

            <Hidden xsDown implementation="css">
              <Drawer
                classes={{paper: props.classes.drawerPaper}}
                variant="permanent"
                open
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>

          <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            
            {props.children}
          </main>

    </React.Fragment>
  );
}

export default withStyles(styles)(Navigation);
