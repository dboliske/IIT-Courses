import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Paper, Skeleton, Typography, Accordion, AccordionSummary, AccordionDetails, Card, CardHeader, CardContent, CardActions, Avatar, IconButton, Button, ButtonGroup, Fab, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ClassIcon from '@mui/icons-material/Class';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { red, blue, green, blueGrey, purple } from '@mui/material/colors';

import { FaBitbucket } from 'react-icons/fa';

import IFrame from 'react-iframe';

import { Route, HashRouter as Router, Switch } from 'react-router-dom';

import ReactEmbedGist from 'react-embed-gist';

import NotFound from '../NotFound.js';

const mdTheme = createTheme();

function avatarIcon(section) {
    switch (section) {
        case 'midterm':
        case 'midterm-1':
            return red['A700'];
        case 'midterm-2':
            return purple['A700'];
        case 'final':
            return blue['A700'];
        case 'bonus':
            return green['A700'];
    }

    return blueGrey['A700'];
}

class LectureContent extends React.Component {
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
        fetch(course+'/lectures.yml')
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
        document.title = loaded ? details.title+" - Lectures" : "IIT CS Course";
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline />
                    <Router basename={"/"+this.props.course+"/lectures"}>
                        <Switch>
                            <Route exact path="/" render={() => (
                                <Landing loaded={this.state.loaded} details={this.state.details} course={this.props.course} />)} />
                            <Route exact path="/:id" render={({ match }) => (<Lecture id={parseInt(match.params.id)} details={this.state.details} loaded={this.state.loaded} course={this.props.course} />)}/>
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
                    this.props.loaded?
                    <Box>
                        {
                            this.props.details.lectures.map((lecture, i) => (
                                <Accordion>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id='panel-header'>
                                        <Typography>{lecture.title}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Card sx={{minWidth:'100%'}} elevation={0}>
                                            <CardHeader
                                                avatar={
                                                    <Avatar
                                                        sx={{bgcolor: avatarIcon(lecture.section)}}
                                                    >
                                                        {i+1}
                                                    </Avatar>
                                                }
                                                title={lecture.title}
                                                subheader={lecture.dates}
                                            />
                                            <CardContent>
                                                <Typography variant="body2">
                                                    {lecture.description}
                                                </Typography>
                                            </CardContent>
                                            <CardActions disableSpacing sx={{justifyContent:'right'}}>
                                                <IconButton link href={"#/"+this.props.course+"/lectures/"+i}>
                                                    <ClassIcon />
                                                </IconButton>
                                                {lecture.examples!==undefined&&lecture.examples!==null?
                                                <IconButton link href={lecture.examples}>
                                                    <FaBitbucket />
                                                </IconButton>:''}
                                                {lecture.video!==undefined&&lecture.video!==null?<IconButton>
                                                    <OndemandVideoIcon />
                                                </IconButton>:''}
                                            </CardActions>
                                        </Card>
                                    </AccordionDetails>
                                </Accordion>
                            ))
                        }
                    </Box>:
                    <Box style={{minWidth:'100%'}}>
                        <Skeleton animation='wave' height={480} />
                    </Box>
                }
            </Box>
        );
    }
}

class Lecture extends React.Component {
    componentDidUpdate() {
        document.querySelectorAll('[role="status"]').forEach(function (e1){console.log(e1);e1.remove()})
    }

    render() {
        var { id, details, loaded} = this.props;

        return (
            <Box sx={{flexGrow:1}}>
                <Typography variant='h3' style={{minWidth:'100%',textAlign:'center'}} gutterBottom>
                    {loaded?('Lecture '+(id+1)+' - '+details.lectures[id].title):<Skeleton animation='wave' />}
                </Typography>
                <Typography variant='subtitle1' style={{minWidth:'100%',textAlign:'center'}} gutterBottom>
                    {loaded?(details.lectures[id].description):<Skeleton animation='wave' />}
                </Typography>
                {loaded&&details.lectures[id].slides!==undefined?
                    <Box style={{position: 'relative',width: '100%',paddingTop: '60%',marginBottom: mdTheme.spacing(2)}}>
                        <Skeleton animation="wave" style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,width: '80%',height: '100%',transform: 'translateX(10%)'}} />
                        <Box style={{position: 'absolute',top: 0,left: 0,bottom: 0,right: 0,width: '100%',height: '100%'}}>
                            <IFrame key={id} url={loaded?details.lectures[id].slides:''} width="100%" height="100%" allow="fullscreen" frameBorder="0" style={{paddingRight: mdTheme.spacing(5),paddingLeft: mdTheme.spacing(5)}} />
                        </Box>
                    </Box>:(
                        loaded&&details.lectures[id].notebook!==undefined?
                        <Box  style={{width: '100%',marginBottom: mdTheme.spacing(2)}}>
                            <ReactEmbedGist
                                gist={details.lectures[id].notebook.gist}
                                file={details.lectures[id].notebook.name}
                                key={id}
                            />
                        </Box>:''
                    )
                }
                {
                    loaded&&details.lectures[id].examples!==undefined&&details.lectures[id].examples!==null?
                    <Box sx={{width:'100%'}}>
                        <Button
                            sx={{width:'100%'}}
                            variant="contained"
                            startIcon={<FaBitbucket />}
                            disableElevation
                            link
                            href={details.lectures[id].examples}
                        >
                            Lecture Examples
                        </Button>
                    </Box>:
                    null
                }
                {loaded&&details.lectures[id].video!==undefined&&details.lectures[id].video!==null?
                    <React.Fragment>
                        <Box sx={{position:'absolute',zIndex:5,top:100,right:'1rem',display:{xs:'none',md:'inherit',lg:'none'}}}>
                            <Fab color="primary" aria-label="video">
                                <PlayArrowIcon />
                            </Fab>
                        </Box>
                        <Box sx={{display:{md:'none',lg:'inherit'},width:{xs:'100%',md:0,lg:'100%'},paddingTop:{xs:'1rem',md:0,lg:'1rem'}}}>
                            <Button
                                sx={{width:'100%'}}
                                variant="contained"
                                startIcon={<PlayArrowIcon />}
                                disableElevation
                            >
                                Lecture Video
                            </Button>
                        </Box>
                    </React.Fragment>:
                    null
                }
                <Box sx={{width:'100%',paddingTop:'1rem'}}>
                    <ButtonGroup
                        sx={{width:'100%'}}
                        variant="contained"
                        disableElevation
                    >
                        {
                            loaded&&id>0?
                            <Button
                                sx={{width:'100%'}}
                                startIcon={<ArrowBackIosIcon />}
                                link
                                href={'#/'+this.props.course+"/lectures/"+(id-1)}
                            >
                                <Typography noWrap sx={{display:{xs:'none',md:'inherit'}}}>
                                    {details.lectures[id-1].title}
                                </Typography>
                                <Typography noWrap sx={{display:{xs:'none',sm:'inherit',md:'none'}}}>
                                    Previous
                                </Typography>
                            </Button>:
                            <Button sx={{width:'100%'}} disabled variant="outlined">
                                None
                            </Button>
                        }
                        {
                            loaded&&id<(details.lectures.length-1)?
                            <Button
                                sx={{width:'100%'}}
                                endIcon={<ArrowForwardIosIcon />}
                                link
                                href={'#/'+this.props.course+"/lectures/"+(id+1)}
                            >
                                <Typography noWrap sx={{display:{xs:'none',md:'inherit'}}}>
                                    {details.lectures[id+1].title}
                                </Typography>
                                <Typography noWrap sx={{display:{xs:'none',sm:'inherit',md:'none'}}}>
                                    Next
                                </Typography>
                            </Button>:
                            <Button sx={{width:'100%'}} disabled variant="outlined">
                                None
                            </Button>
                        }
                    </ButtonGroup>
                </Box>
            </Box>
        );
    }
}

export default function Lectures(props) {
    return <LectureContent course={props.course} />;
}