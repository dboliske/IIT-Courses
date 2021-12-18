import React, { useDebugValue } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Link as RouterLink, HashRouter } from 'react-router-dom';
import { grey } from '@material-ui/core/colors';

import { Divider, Drawer, Hidden, List, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';

const drawerWidth = 360;

const classes = theme => ({
    drawerHeader: {
        padding: theme.spacing(1),
        color:'inherit',
        background:'inherit'
    },
    drawer: {
      [theme.breakpoints.up('lg')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: Object.assign({},
        theme.mixins.toolbar,
        {
            color: 'white',
            background: grey[800],
            boxShadow:'0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)'
        }
    ),
    drawerPaper: {
        width: drawerWidth,
        borderRightColor: grey[900]
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        color: 'white',
        background: grey[800]
    }
  });

function ListItemLink(props) {
    const { icon, primary, to, onClick } = props;

    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );

    if (props.disabled !== undefined) {
        return (
            <li>
                <ListItem button disabled>
                {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
                <ListItemText primary={primary} />
                </ListItem>
            </li>
        );
    }
  
    return (
      <li>
        <ListItem button component={renderLink} onClick={onClick}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    onClick: PropTypes.func
};

class Sideline extends React.Component {
    render() {
        const { classes, window } = this.props;

        const container = window !== undefined ? () => window() : undefined;

        const drawer = (
            <div>
                <div className={classes.toolbar} >
                    <Typography
                        className={classes.drawerHeader} 
                        variant="h5"
                        align="center"
                        color='textSecondary'
                    >
                        Course Navigation
                    </Typography>
                </div>
                <HashRouter>
                    <List>
                        <ListItemLink to="/" primary="Home" onClick={this.props.handleSideToggle} />
                        <ListItemLink to="/syllabus" primary="Syllabus" onClick={this.props.handleSideToggle} />
                    </List>
                </HashRouter>
                <Divider style={{background:grey[900]}} />
                <HashRouter>
                    <List>
                        <ListItemLink to="/modules" primary="Modules" onClick={this.props.handleSideToggle} />
                        <ListItemLink to="/review" primary="Exams" />
                        <ListItemLink to="/activity" primary="Activity" disabled />
                    </List>
                </HashRouter>
                <div className={classes.footer}>
                    <Divider />
                    <HashRouter>
                        <List>
                            <ListItemLink to="/support" primary="Support" onClick={this.props.handleSideToggle} />
                            <ListItemLink to="/about" primary="About" onClick={this.props.handleSideToggle} />
                        </List>
                    </HashRouter>
                </div>
            </div>
        )

        return (
            <nav className={classes.drawer} aria-label="site navigation">
                <Hidden lgUp>
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor='left'
                        open={this.props.showSide}
                        onClose={this.props.handleSideToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true,
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden mdDown>
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
        );
    }
}

Sideline.propTypes = {
    classes: PropTypes.object.isRequired,
    window: PropTypes.func,
}

export default withStyles(classes)(Sideline);