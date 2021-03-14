import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Button, Container, FormControl, Hidden, InputLabel, MenuItem, Paper, Select, TextField, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    formPaper: {
        margin: theme.spacing(2),
        paddingRight: theme.spacing(4)
    },
    field: {
        margin: theme.spacing(2),
    },
    select: {
        margin: theme.spacing(2)
    },
    selectLabel: {
        marginLeft: theme.spacing(2)
    },
    submit: {
        margin: theme.spacing(2),
        width: '100%'
    }
}));

export default function Support() {
    document.title = "CS 201 - Support";

    const classes = useStyles();
    const [type, setType] = React.useState('');

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    return (
        <Container maxWidth="xl">
            <Typography variant="h4" align="center">Support</Typography>
            <Typography variant="body1">
                Having trouble using the website? Have ideas for ways it could be improved? If you have any questions, concerns, errors, or suggestions for this course website, please fill out the form below.
            </Typography>
            <Paper className={classes.formPaper}>
                <form method="post" action="https://www.wolframcloud.com/obj/dylanb/CS201/Support%20Form/submission.api">
                    <TextField
                        name="subject"
                        label="Subject"
                        required
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                    />
                    <FormControl style={{width:'100%'}} className={classes.select}>
                        <InputLabel className={classes.selectLabel}>Type</InputLabel>
                        <Select
                            name="type"
                            fullWidth
                            variant="outlined"
                            value={type}
                            onChange={handleTypeChange}
                            default="Other"
                        >
                            <MenuItem value={'Issue'}>Issue</MenuItem>
                            <MenuItem value={'Question'}>Question</MenuItem>
                            <MenuItem value={'Suggestion'}>Suggestion</MenuItem>
                            <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        name="message"
                        label="Message"
                        multiline
                        rows={10}
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                        default="missing"
                    />
                    <TextField
                        name="email"
                        label="Email"
                        fullWidth
                        variant="outlined"
                        className={classes.field}
                        helperText="Provide this only if you wish to be contacted about your feedback"
                        default="missing"
                    />
                    <Hidden only={['xs', 'sm', 'md', 'lg', 'xl']}>
                        <TextField
                            name="username"
                            label="Username"
                            fullWidth
                            className={classes.field}
                            default="missing"
                        />
                    </Hidden>
                    <Button
                        variant="contained"
                        type="submit"
                        className={classes.submit}
                        size="large"
                        color="primary"
                    >
                        Submit
                    </Button>
                </form>
            </Paper>
        </Container>
    );
}