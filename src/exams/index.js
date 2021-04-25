import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, HashRouter } from 'react-router-dom';

import { Container, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const classes = theme => ({
    title: {
        margin: theme.spacing(2),
    },
    subtitle: {
        marginBottom: theme.spacing(1),
    },
    module: {
        padding: theme.spacing(2)
    }
  });

function ListItemLink(props) {
      const { icon, primary, to } = props;
    
      const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={'review/topic/'+to} ref={ref} {...itemProps} />),
        [to],
      );
    
      return (
        <li>
          <ListItem button component={renderLink}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <ListItemText primary={primary} variant="body1" />
          </ListItem>
          <Divider variant="middle" />
        </li>
      );
}
  
ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

class Review extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: []
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        const yaml = require('js-yaml');
        fetch("review/index.yml")
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    this.setState({
                        modules: data
                    });
                },
            )
    }

    render() {
        const { classes } = this.props;
        document.title = "CS 201 - Review";
        return (
            <Container maxWidth="xl">
                <Typography variant="h4" align="center" className={classes.title}>Advanced Introduction to Object Oriented Programming</Typography>
                <Grid container spacing={2} justify="center">
                    {this.state.modules.map((mod, i) => (
                        <Grid item xs={12} md={6} xl={3}>
                            <Paper className={classes.module} variant="outlined" style={{height:'100%'}}>
                                <Typography variant="h6" align="center" className={classes.subtitle}>
                                    {mod.title}
                                </Typography>
                                <Divider variant="middle" />
                                <HashRouter>
                                    <List component="nav">
                                        {mod.capsules.map((cap, j) => (
                                            <ListItemLink primary={(i+1)+'.'+j+' '+cap.title} to={cap.to} />
                                        ))}
                                    </List>
                                </HashRouter>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        );
    }
}

export default withStyles(classes)(Review);