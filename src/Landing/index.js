import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';

import Calendar from './Calendar';

const mdTheme = createTheme();

class LandingContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            loaded: false,
            details: null
        }
    }

    componentDidMount() {
        this.load(this.props.course);
    }

    load(course) {
        const yaml = require("js-yaml");
        fetch(course+'/home.yml')
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    if (data.title === undefined) {
                        this.setState({
                            loaded: true,
                            details: null
                        })
                    } else {
                        this.setState({
                            loaded: true,
                            details: data
                        });
                    }
                },
                (error) => {
                    this.setState({
                        loaded: true,
                        properties: null
                    })
                }
            )
    }

    render() {
        const { loaded, details, course } = this.state;
        document.title = loaded ? details.title+" - Home" : "IIT CS Course";
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3">
                                {loaded ? details.name : <Skeleton animation="wave"/>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle1">
                                {loaded ? details.description: <><Skeleton animation="wave"/><Skeleton animation="wave"/><Skeleton animation="wave"/></>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Calendar course={course} />
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        );
    }
}

export default function Landing(props) {
    return <LandingContent course={props.course}/>;
}