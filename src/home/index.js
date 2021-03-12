import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { Container, Divider, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(2),
    },
    description: {
        margin: theme.spacing(2),
    },
}));

export default function Home() {
    document.title = "CS 201 - Home";

    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Typography variant="h3" align="center" className={classes.title}>Advanced Introduction to Object Oriented Programming</Typography>
            <Divider variant="middle" />
            <Typography variant="h6" className={classes.description}>
            Problem-solving and design using an object-oriented programming language. Introduces a variety of problem-solving techniques, algorithms, and data structures in object-oriented programming.
            </Typography>
            <Divider variant="middle" />
        </Container>
    );
}