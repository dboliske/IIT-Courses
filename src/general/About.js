import React from 'react';
import PropTypes from 'prop-types';

import { Container, Divider, Link, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { FaFontAwesome, FaGithub, FaGoogle } from 'react-icons/fa';
import { SiMaterialUi, SiNpm, SiReact, SiWolfram } from 'react-icons/si';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
    },
    description: {
        margin: theme.spacing(2),
    },
}));

function ListItemLink(props) {
    const { icon, primary, to } = props;
  
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <Link href={to} {...itemProps} />),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
}

ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired
};

export default function About() {
    document.title = "CS 201 - About";

    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" className={classes.title}>About</Typography>
            <Divider variant="middle" />
            <Typography variant="h6" align="center" className={classes.description}>
            Get to know more about the components that went into making this website.
            </Typography>
            <Paper elevation={0} style={{maxWidth:'50vw',marginLeft:'25%'}}>
                <List component="nav">
                    <ListItemLink primary='Material UI' to='https://material-ui.com/' icon={<SiMaterialUi />} />
                    <ListItemLink primary='npm' to='https://www.npmjs.com/' icon={<SiNpm />} />
                    <ListItemLink primary='React Icons' to='https://react-icons.github.io/react-icons' icon={<SiReact />} />
                    <ListItemLink primary='Fontawesome' to='https://fontawesome.com/' icon={<FaFontAwesome />} />
                    <ListItemLink primary='Google Charts' to='https://developers.google.com/chart' icon={<FaGoogle />} />
                    <ListItemLink primary='Google Fonts' to='https://fonts.google.com/' icon={<FaGoogle />} />
                    <ListItemLink primary='GitHub Gist' to='https://gist.github.com/' icon={<FaGithub />} />
                    <ListItemLink primary='WolframCloud' to='https://www.wolframcloud.com/' icon={<SiWolfram />} />
                    <ListItemLink primary='YAML' to='https://yaml.org/' />
                </List>
            </Paper>
        </Container>
    );
}