import React, { useState } from 'react';
import Mail from '../Mails/mail.component';

import { makeStyles } from '@material-ui/core/styles';
import {
  Drawer,
  AppBar,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core/';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import ScheduleIcon from '@material-ui/icons/Schedule';

import { Link } from 'react-router-dom';

import { auth } from '../../firebase/firebase.utils';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function ClippedDrawer({
  currentUser,
  ShowmailsList,
  ScheduleMail,
}) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [composeComponent, setComposeComponent] = useState(false);
  const [scheduleComponent, setScheduleComponent] = useState(false);
  const [sentComponent, setSentComponent] = useState(false);

  const name = 'Ayush';
  const greeting = `Hello ${currentUser ? currentUser.displayName : null}`;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            LIPR MAIL
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {currentUser ? (
              <ListItem button key={greeting}>
                <ListItemIcon>
                  <PersonIcon />
                </ListItemIcon>
                <ListItemText primary={greeting} />
              </ListItem>
            ) : (
              <Link className="option" to="/signin">
                <ListItem button key="SIGN IN">
                  <ListItemIcon>
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText primary="SIGN IN" />
                </ListItem>
              </Link>
            )}
          </List>
          <List>
            {currentUser ? (
              <div>
                <Link to="/c">
                  <ListItem button key="Compose">
                    <ListItemIcon>
                      <AddCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Compose" />
                  </ListItem>
                </Link>
                <ListItem
                  button
                  key="Schedule Mail"
                  onClick={() => setScheduleComponent(!scheduleComponent)}
                >
                  <ListItemIcon>
                    <ScheduleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Schedule Mail" />
                </ListItem>
                <ListItem
                  button
                  key="SENT"
                  onClick={() => setSentComponent(!sentComponent)}
                >
                  <ListItemIcon>
                    <InboxIcon />
                  </ListItemIcon>
                  <ListItemText primary="HISTORY" />
                </ListItem>
                <div onClick={() => auth.signOut()}>
                  <ListItem button key="LOGOUT">
                    <ListItemIcon>
                      <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary="LOGOUT" />
                  </ListItem>
                </div>
              </div>
            ) : null}
          </List>
          <Divider />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
        {composeComponent ? <Mail /> : null}
        {sentComponent ? <ShowmailsList /> : null}
        {scheduleComponent ? <ScheduleMail /> : null}
      </main>
    </div>
  );
}
