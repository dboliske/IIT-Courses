import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';
import { FaBars as MenuIcon, FaEnvelope as MailIcon, FaDiscord as ChatIcon, FaBitbucket as CodeIcon } from 'react-icons/fa';

const drawerWidth = 360;

const classes = theme => ({
    appBar: {
      [theme.breakpoints.up('lg')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('lg')]: {
        display: 'none',
      },
    },
    grow: {
      flexGrow: 1
    },
    desktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    iconButton: {
      marginLeft: theme.spacing(2)
    }
  });

function MenuLinkItem(props) {
  const { icon, className, to } = props;
  
  return (
    <IconButton
      color="inherit"
      aria-label="chat"
      size="small"
      className={className}
      onClick={() => {window.open(to, '_blank')}}
    >
      {icon}
    </IconButton>
  );
}

class Header extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <AppBar position="fixed" className={classes.appBar} style={{background:grey[800]}}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={this.props.handleSideToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        CS 201
                    </Typography>
                    <div className={classes.grow} />
                    <div className={classes.desktop}>
                      <MenuLinkItem icon={<MailIcon />} className={classes.iconButton} to="mailto:dboliske@hawk.iit.edu" />
                      <MenuLinkItem icon={<ChatIcon />} className={classes.iconButton} to="https://discord.com/channels/876492986651922442/876492986651922445" />
                      <MenuLinkItem icon={<CodeIcon />} className={classes.iconButton} to="" />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(classes)(Header);