import React from 'react';
import { Link } from 'react-router-dom';

import Nav from "./Nav";

import {
  createStyles,
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
  CssBaseline,
  InputBase,
  fade
} from "@material-ui/core";
import {
  Menu,
  Home,
  AddCircleOutline,
  Face,
  TurnedInNot,
  Widgets,
  Search
  // ListItemIcon
} from "@material-ui/icons";

const drawerWidth = 60;

const styles = (theme) => 
createStyles({
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
      marginRight: drawerWidth,
    },
    
  },
  appBarToolbar: {
    justifyContent: 'space-between'
  },
  menuButton: {
    // marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  mobileDrawerPaper: {
    width: 240
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  // drawer: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: drawerWidth,
  //     flexShrink: 0,
  //   },
  // },

  // appBar: {
  //   [theme.breakpoints.up('sm')]: {
  //     width: `calc(100% - ${drawerWidth}px)`,
  //     marginLeft: drawerWidth
  //   },
  // },

  // menuButton: {
  //   marginRight: theme.spacing(2),
  //   [theme.breakpoints.up('sm')]: {
  //     display: 'none',
  //   },
  // },

  // // necessary for content to be below app bar
  // toolbar: theme.mixins.toolbar,
  // drawerPaper: {
  //   width: drawerWidth,
  // },

  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },

  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },

    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },

  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputRoot: {
    color: 'inherit',
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: '12ch',

      '&:focus': {
        width: '20ch',
      },
    },
  },
});

const Navigation = (props) => {
  const { window, classes } = props;
  
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawer = (
    <div>
      <div className={classes.toolbar}>

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
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
  // const container = this.window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
          <CssBaseline />

          <AppBar position="fixed" className={props.classes.appBar}>
            <Toolbar className={classes.appBarToolbar}>
     
              
              {/* <Nav />  */}

              <div className={props.classes.search} edge="start">
                <div className={props.classes.searchIcon}>
                  <Search />
                </div>
                <InputBase
                  placeholder="Search…"
                  className={
                    props.classes.inputRoot,
                    props.classes.inputInput
                  }
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                className={props.classes.menuButton}
              >
                <Menu />
              </IconButton>
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
            <Hidden smUp implementation="css"> 
              <Drawer
                container={container}
                variant="temporary"
                anchor={theme.direction === 'rtl' ? 'right' : 'right'}
                open={mobileOpen}
                onClose={handleDrawerToggle}
                classes={{paper: props.classes.mobileDrawerPaper}}
                ModalProps={{keepMounted: true}} // Better open performance on mobile.
              >
                {drawer}
              </Drawer>
            </Hidden> 

            <Hidden xsDown implementation="css">
            <Drawer
                classes={{paper: props.classes.drawerPaper}}
                className={props.classes.drawer}
                variant="permanent"
                anchor="right"
              >
                {drawer}
              </Drawer>
            </Hidden>
          </nav>

          <main className={props.classes.content}>
            <div className={props.classes.toolbar} />
            
            {props.children}
          </main>

    </div>
    
  );
}

export default withStyles(styles)(Navigation);
