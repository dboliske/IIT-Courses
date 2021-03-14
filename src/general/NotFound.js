import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Container, Grid, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    buttons: {
        margin: theme.spacing(2)
    },
}));

export default function NotFound() {
    document.title = "CS 201 - Not Found";

    const classes = useStyles();

    return (
        <Container maxWidth="xl">
            <Typography variant="h1" align='center'>Oops!</Typography>
            <Typography variant="h4" align='center'>404 Not Found</Typography>
            <Typography variant="body1" align='center'>Sorry, an error has occurred. Requested page not found!</Typography>
            <Grid containter justify='center' alignItems="center">
                <Grid item xs={12} align='center'>
                    <ButtonGroup className={classes.buttons} size="large" variant="contained">
                        <Button onClick={() => { window.location = "/" }}>Take Me Home</Button>
                        <Button onClick={() => { window.open('mailto:dboliske@hawk.iit.edu', 'mail') }}>Contact Support</Button>
                    </ButtonGroup>
                </Grid>
            </Grid>
        </Container>
    );
}