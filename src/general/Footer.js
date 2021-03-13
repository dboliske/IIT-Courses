import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { RiDiscordFill, RiGithubFill } from 'react-icons/ri';

const useStyles = makeStyles((theme) => ({
    footer: {
        background:grey[800],
        position:'absolute',
        bottom:0,
        width:'100%',
        padding: theme.spacing(2),
    },
    footerLinks: {
        color: theme.palette.info.main
    },
    footerButtons: {
        color: theme.palette.info.main,
    },
    divider: {
        margin: theme.spacing(1, 0),
    },
}));

function IconButtonLink(props) {
    const { icon, to, className } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
      <IconButton component={renderLink} className={className}>
        {icon}
      </IconButton>
    );
}

IconButtonLink.propTypes = {
    icon: PropTypes.element,
    to: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
};

function ListItemLink(props) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} style={{textAlign:'right'}} />
        </ListItem>
      </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
};

export default function Footer(props) {
    const classes = useStyles();

    return (
        <div className={classes.footer} style={{height:props.height}}>
            <Grid container spacing={2} style={{color:'#fff'}}>
                <Grid item xs={4}>
                    <Typography variant="h5" color="inherit">
                        Course Information
                    </Typography>
                    <Divider className={classes.divider} />
                    <Link
                        href="mailto:dboliske@hawk.iit.edu"
                        variant="body1"
                        className={classes.footerLinks}
                    >
                        dboliske@hawk.iit.edu
                    </Link>
                </Grid>
                <Grid item xs={4} align="center">
                    <HashRouter>
                        <ButtonGroup
                            variant="text"
                            color="info"
                            aria-label="text button group"
                            size="large"
                        >
                            <IconButtonLink className={classes.footerButtons} icon={<RiDiscordFill />} to='' />
                            <IconButtonLink className={classes.footerButtons} icon={<RiGithubFill />} to='' />
                        </ButtonGroup>
                    </HashRouter>
                </Grid>
                <Grid item xs={4}>
                    <HashRouter>
                        <List style={{paddingTop:0}}>
                            <ListItemLink to="/support" primary="Support" />
                            <ListItemLink to="/about" primary="About" />
                        </List>
                    </HashRouter>
                </Grid>
            </Grid>
        </div>
    );
}