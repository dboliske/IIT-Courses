import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper, Skeleton, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, ButtonGroup, Fab, useMediaQuery, Stack, Divider, Grid } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassIcon from '@mui/icons-material/Class';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { red, blue, green, blueGrey } from '@mui/material/colors';

import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import EmbeddedGist from './EmbeddedGist';

import NotFound from '../NotFound.js';

const mdTheme = createTheme();

function avatarIcon(section) {
    switch (section) {
        case 'midterm':
            return red['A700'];
        case 'final':
            return blue['A700'];
        case 'bonus':
            return green['A700'];
    }

    return blueGrey['A700'];
}

class Landing extends React.Component {
    render() {
        return (
            <Box>
                <Typography variant='h3' style={{minWidth:'100%'}} gutterBottom>
                    {
                        this.props.loaded?
                        this.props.details.name:
                        <Skeleton animation='wave' />
                    }
                </Typography>
                <Typography variant='subtitle1' style={{minWidth:'100%'}} gutterBottom>
                    {
                        this.props.loaded?
                        this.props.details.description:
                        <Box>
                            <Skeleton animation='wave' />
                            <Skeleton animation='wave' />
                            <Skeleton animation='wave' />
                        </Box>
                    }
                </Typography>
                {
                    this.props.loaded&&this.props.details.sections!==null?
                    <Box>
                        {
                            this.props.details.sections.map((topic, i) => (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id='panel-header'>
                                        <Typography>{topic.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card sx={{minWidth:'100%'}} elevation={0}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        sx={{bgcolor: avatarIcon(topic.exam)}}
                                                    >
                                                        {i+1}
                                                    </Avatar>
                                                }
                                                title={topic.title}
                                                subheader={this.props.details[topic.exam]}
                                            />
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {topic.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing sx={{justifyContent:'right'}}>
                                                <IconButton link href={"#/"+this.props.course+"/lectures/"+topic.lecture}>
                                                    <ClassIcon />
                                                </IconButton>
                                                <IconButton link href={"#/"+this.props.course+"/review/"+i}>
                                                    <AssignmentTurnedInIcon />
                                                </IconButton>
                                            </CardActions>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Box>:
                    (
                        !this.props.loaded?
                        <Box style={{minWidth:'100%'}}>
                            <Skeleton animation='wave' height={480} />
                        </Box>:''
                    )
                }
            </Box>
        );
    }
}

class Topic extends React.Component {
    render() {
        var { id, details, loaded} = this.props;

        return (
            <Box sx={{flexGrow:1}}>
                <Typography variant='h3' style={{minWidth:'100%'}} gutterBottom>
                    {
                        loaded?
                        ("Lecture "+id+" - "+details.sections[id].title):
                        <Skeleton animation='wave' />
                    }
                </Typography>
                <Typography variant='subtitle1' style={{minWidth:'100%'}} gutterBottom>
                    {
                        loaded?
                        details.sections[id].description:
                        <Box>
                            <Skeleton animation='wave' />
                            <Skeleton animation='wave' />
                            <Skeleton animation='wave' />
                        </Box>
                    }
                </Typography>
                <Box sx={{width:'100%',paddingTop:'1rem',paddingBottom:'1rem'}}>
                    <ButtonGroup
                        sx={{width:'100%'}}
                        variant="contained"
                        disableElevation
                    >
                        <Button
                            sx={{width:'100%'}}
                            startIcon={<ArrowBackIosIcon />}
                            link
                            disabled={id==0}
                            href={'#/'+this.props.course+"/review/"+(id-1)}
                        >
                            <Typography noWrap sx={{display:{xs:'none',sm:'inherit',md:'none'}}}>
                                Previous
                            </Typography>
                        </Button>
                        <Button
                            sx={{width:'100%'}}
                            endIcon={<ArrowForwardIosIcon />}
                            link
                            disabled={details===null || id===(details.sections.length-1)}
                            href={'#/'+this.props.course+"/review/"+(id+1)}
                        >
                            <Typography noWrap sx={{display:{xs:'none',sm:'inherit',md:'none'}}}>
                                Next
                            </Typography>
                        </Button>
                    </ButtonGroup>
                </Box>
                <Grid container spacing={2}>
                    {
                        (loaded?details.sections[id].questions:[null, null, null]).map(
                            (question, i) =>
                                <Grid item xs={12}><QuestionCard question={question} i={i} section={details===null?null:details.sections[id]} key={id} /></Grid>
                        )
                    }
                </Grid>
            </Box>
        );
    }
}

function QuestionContent(props) {
    var type = props.type;
    var content = props.content;

    if (type === 'image') {
        return (
            <Grid item xs={12} textAlign="center">
                <img src={content} alt={content} loading="lazy" />
            </Grid>
        );
    }

    return (
        <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>
                {content}
            </Typography>
        </Grid>
    );
}

function QuestionCard(props) {
    var question = props.question;
    var index = props.i;
    var section = props.section;

    if (question === null || question === undefined) {
        return (
            <Paper elevation={0} sx={{p:'1rem'}}>
                <Typography variant="h4" gutterBottom>
                    <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{width:'100%'}}>
                        <Box sx={{pl:'0.5rem'}}>{index+1}</Box>
                        <Skeleton animation="wave" sx={{width:'100%'}} />
                    </Stack>
                </Typography>
                <Typography variant="body1" gutterBottom>
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                    <Skeleton animation="wave" />
                </Typography>
                <Box>
                    <Accordion disabled>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={"panel-content-"+index} id={'panel-header-'+index}>
                            <Typography>Solution</Typography>
                        </AccordionSummary>
                    </Accordion>
                </Box>
            </Paper>
        );
    }
    console.log(question);
    return (
        <Paper elevation={0} sx={{p:'1rem'}}>
            <Typography variant="h5" gutterBottom>
                <Stack direction='row' spacing={2} divider={<Divider orientation="vertical" flexItem />} sx={{width:'100%'}}>
                    <Box sx={{pl:'0.5rem'}}>{index+1}</Box>
                    <Box>{section.title}</Box>
                </Stack>
            </Typography>
            <Grid container>
                {question.question.map((part) => QuestionContent(part))}
            </Grid>
            <Box>
               {question.solution.map((part) => (
                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id='panel-header'>
                            <Typography>{part.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EmbeddedGist gist={part.gist} file={part.name}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Paper>
    )
}

class ReviewContent extends React.Component {
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
        fetch(course+'/exams.yml')
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
        const { loaded, details } = this.state;
        document.title = loaded ? details.title+" - Review" : "IIT CS Course";

        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline />
                    <Router basename={"/"+this.props.course+"/review"}>
                        <Switch>
                            <Route exact path="/" render={() => (<Landing loaded={this.state.loaded} details={this.state.details} course={this.props.course} />)} />
                            <Route exact path="/:id" render={({ match }) => (<Topic id={parseInt(match.params.id)} details={this.state.details} loaded={this.state.loaded} course={this.props.course} />)}/>
                            <Route>
                                <NotFound home={this.props.course} />
                            </Route>
                        </Switch>
                    </Router>
                </Box>
            </ThemeProvider>
        );
    }
}

export default function Review(props) {
    return <ReviewContent course={props.course} />;
}