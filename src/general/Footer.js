import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, HashRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import { ButtonGroup, Divider, Grid, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

import { FaDiscord, FaBitbucket, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const drawerWidth = 360;

const useStyles = makeStyles((theme) => ({
    footer: {
        background:grey[800],
        position:'absolute',
        bottom:0,
        width:'100%',
        padding: theme.spacing(2),
        [theme.breakpoints.up('lg')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        [theme.breakpoints.up('md')]: {
            display: 'none'
        }
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
  
    return (
      <IconButton className={className} onClick={() => {window.open(to, '_blank')}} size='small'>
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
        <div className={classes.footer}>
            <Grid container spacing={2} style={{color:'#fff'}}>
                <Grid item xs={8} align="left">
                    <Typography variant="h6">Advanced Introduction to Object Oriented Programming</Typography>
                </Grid>
                <Grid item xs={1} align="right">
                    <IconButtonLink
                        to="mailto:dboliske@hawk.iit.edu"
                        className={classes.footerButtons}
                        icon={<FaEnvelope />}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <IconButtonLink
                        to="https://www.google.com/maps/place/Stuart+Building/@41.8386693,-87.6280428,19z"
                        className={classes.footerButtons}
                        icon={<FaMapMarkerAlt />}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <IconButtonLink
                        to="https://discord.com/channels/849303573611282464/849303574248423487"
                        className={classes.footerButtons}
                        icon={<FaDiscord />}
                    />
                </Grid>
                <Grid item xs={1} align="right">
                    <IconButtonLink
                        to="https://bitbucket.org/dboliske/cs201-202106-lectures/src/master/"
                        className={classes.footerButtons}
                        icon={<FaBitbucket />}
                    />
                </Grid>
            </Grid>
        </div>
    );
}