import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, AlertTitle, Box, Grid, Typography, Skeleton, Paper, Table, TableBody, TableRow, TableCell, TableContainer, ButtonGroup, Button, IconButton, Card, CardContent, Link, useMediaQuery } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { blueGrey } from '@mui/material/colors';

import { FaDiscord } from 'react-icons/fa';

import { Chart, PieSeries, Legend, Tooltip } from '@devexpress/dx-react-chart-material-ui';
import { EventTracker, Palette, HoverState } from '@devexpress/dx-react-chart'

const mdTheme = createTheme();

function DescriptionContent(props) {
    if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4">
                    Course Description
                </Typography>
                <Typography variant="subtitle1" style={{paddingBottom:'0.5rem'}}>
                    {props.description}
                </Typography>
        </Paper>
        );
    }

    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3">
                <Skeleton animation="wave" />
            </Typography>
            <Typography variant="subtitle1" style={{paddingBottom:'0.5rem'}}>
                <Skeleton animation="wave" />
                <Skeleton animation="wave" />
            </Typography>
        </Paper>
    );
}

function InstructorContent(props) {
    if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4">
                    Instructor
                </Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" style={{paddingBottom:'1rem'}}>
                            {props.instructor.name}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign='right'>
                        <ButtonGroup variant="text" aria-label="instructor button group" color='info'>
                            <IconButton link href={"mailto:"+props.instructor.email}>
                                <MailOutlineIcon />
                            </IconButton>
                            <IconButton link href={props.instructor.discord}>
                                <FaDiscord />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="instructor table">
                        <TableBody>
                            <TableRow>
                                <TableCell variant="head">
                                    Office Hours
                                </TableCell>
                                <TableCell>
                                    {props.instructor.hours}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">
                                    Office
                                </TableCell>
                                <TableCell>
                                    {props.instructor.office}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell variant="head">
                                    Mailbox
                                </TableCell>
                                <TableCell>
                                    {props.instructor.mailbox}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }

    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3">
                <Skeleton animation="wave" />
            </Typography>
                <Grid container>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h4" style={{paddingBottom:'1rem'}}>
                            <Skeleton animation="wave" />
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} textAlign='right'>
                        <ButtonGroup variant="text" aria-label="instructor button group" color='info'>
                            <IconButton disabled>
                                <MailOutlineIcon />
                            </IconButton>
                            <IconButton disabled>
                                <FaDiscord />
                            </IconButton>
                        </ButtonGroup>
                    </Grid>
                </Grid>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="instructor table">
                    <TableBody>
                        <TableRow>
                            <TableCell variant="head">
                                <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">
                                <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton animation="wave" />
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell variant="head">
                                <Skeleton animation="wave" />
                            </TableCell>
                            <TableCell>
                                <Skeleton animation="wave" />
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}

function TAContent(props) {
    if (props.loaded && props.assistants !== null) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Teaching Assistants
                </Typography>
                <Grid container spacing={2}>
                {props.assistants.map((ta) => (
                    <Grid item xs={6}>
                        <Card variant="outlined">
                            <CardContent style={{paddingBottom:'0.5rem'}}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} sm={8}>
                                        <Typography variant="h5">
                                            {ta.name}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} textAlign='right'>
                                        <IconButton link href={"mailto:"+ta.email} color='info'>
                                            <MailOutlineIcon />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid item xs={4}>
                                        <Typography variant="body1">
                                            {ta.office}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Typography variant="body1">
                                            {ta.hours}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
                </Grid>
            </Paper>
        );
    } else if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Teaching Assistants
                </Typography>
                <Typography variant="subtitle2" textAlign="center" gutterBottm>
                    TBD
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3" gutterBottom>
                <Skeleton animation="wave" />
            </Typography>
            <Grid container spacing={2}>
            {[1, 2, 3, 4].map((i) => (
                <Grid item xs={6}>
                    <Card variant="outlined">
                        <CardContent style={{paddingBottom:'0.5rem'}}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={8}>
                                    <Typography variant="h4">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={4} textAlign='right'>
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid item xs={4}>
                                    <Typography variant="body1">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </Grid>
                                <Grid item xs={8}>
                                    <Typography variant="body1">
                                        <Skeleton animation="wave" />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
            </Grid>
        </Paper>
    );
}

function TextbookContent(props) {
    if (props.loaded && props.textbooks.books !== null) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Textbooks
                </Typography>
                {props.textbooks.required?'':(
                    <Alert severity="info" style={{marginBottom:'1rem'}}>
                        <AlertTitle>Important</AlertTitle>
                        None of these are required textbooks. They are simply additional resources that you are welcome to use. Additionally, none of these need to be purchased as they are all available online as e-books through Galvin Library.
                    </Alert>
                )}
                <Grid container spacing={2}>
                    {props.textbooks.books.map((book) => (
                        <Grid item xs={12} lg={6}>
                            <Card variant="outlined">
                                <CardContent style={{paddingBottom:'0.5rem'}}>
                                    <Typography variant="h5" gutterBottom>
                                        {book.title}
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <strong>Author</strong>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {book.author}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <strong>Publisher</strong>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {book.publisher}
                                        </Grid>
                                        <Grid item xs={2}>
                                            <strong>ISBN</strong>
                                        </Grid>
                                        <Grid item xs={10}>
                                            {book.isbn}
                                        </Grid>
                                    </Grid>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        );
    } else if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Textbooks
                </Typography>
                <Typography variant="subtitle2" textAlign="center" gutterBottm>
                    TBD
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3" gutterBottom>
                <Skeleton animation="wave" />
            </Typography>
            <Grid container spacing={2}>
                {[1, 2, 3].map((i) => (
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardContent style={{paddingBottom:0}}>
                                <Typography variant="h4">
                                    <Skeleton animation="wave" />
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={2}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                    <Grid item xs={10}>
                                        <Skeleton animation="wave" />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

function ResourceContent(props) {
    if (props.loaded && props.resources !== null) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Resources
                </Typography>
                <Grid container spacing={2}>
                    {props.resources.map((resource) => (
                        <Grid item xs={12} lg={6}>
                            <Card variant="outlined">
                                <CardContent style={{paddingBottom:'0.5rem'}}>
                                    <Typography variant="h5">
                                        {resource.title}
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        {resource.description}
                                    </Typography>
                                    <div style={{width: '100%'}}>
                                        <Box sx={{display: 'flex'}}>
                                            {
                                                resource.links.length===1?(
                                                    <Button sx={{flexGrow: 1}} link href={resource.links[0].link} variant="contained" color='success'>
                                                        {resource.links[0].name}
                                                    </Button>
                                                ):(
                                                    <ButtonGroup sx={{flexGrow:1}} variant="contained" color='success'>
                                                        {
                                                            resource.links.map((link) => (
                                                                <Button sx={{flexGrow:1}}  link href={link.link}>
                                                                    {link.name}
                                                                </Button>
                                                            ))
                                                        }
                                                    </ButtonGroup>
                                                )
                                            }
                                        </Box>
                                    </div>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        );
    } else if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Resources
                </Typography>
                <Typography variant="subtitle2" textAlign="center" gutterBottm>
                    TBD
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3" gutterBottom>
                <Skeleton animation="wave" />
            </Typography>
            <Grid container spacing={2}>
                {[1, 2, 3, 4].map((i) => (
                    <Grid item xs={12} sm={6}>
                        <Card variant="outlined">
                            <CardContent style={{paddingBottom:'0.5rem'}}>
                                <Typography variant="h4">
                                    <Skeleton animation="wave" />
                                </Typography>
                                <Typography variant="body1">
                                    <Skeleton animation="wave" />
                                </Typography>
                                <div style={{width:'100%'}}>
                                    <Box sx={{display:'flex'}}>
                                        <LoadingButton sx={{flexGrow:1}} variant="contained" disabled loading/>
                                    </Box>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
}

function GoalsContent(props) {
    if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Course Goals
                </Typography>
                <Typography variant="body1">
                    <ul>
                        {props.goals.map((goal) => (<li>{goal}</li>))}
                    </ul>
                </Typography>
            </Paper>
        );
    }

    return (<LoadingContent />);
}

function OutcomesContent(props) {
    if (props.loaded && props.outcomes !== null) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Course Outcomes
                </Typography>
                <Typography variant="body1">
                    <ul>
                        {props.outcomes.map((outcome) => (<li>{outcome}</li>))}
                    </ul>
                </Typography>
            </Paper>
        );
    } else if (props.loaded) {
        return (
            <React.Fragment></React.Fragment>
        );
    }

    return (<LoadingContent />);
}

function ParagraphContent(props) {
    if (props.loaded && props.paragraphs !== null && props.paragraphs !== undefined) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    {props.title}
                </Typography>
                {props.paragraphs.map((p) => (
                    <Typography variant="body1" gutterBottom>{p}</Typography>
                ))}
            </Paper>
        );
    } else if (props.loaded) {
        return (
            <Box sx={{maxHeight:0}}></Box>
        );
    }

    return (<LoadingContent />);
}

class InLineList extends React.Component {
    render() {
        return (
            <Box className="MuiListItem-root LegendItem-root-95 MuiListItem-gutters" component="li" sx={{p:1,flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center'}}>
                {this.props.children}
            </Box>
        )
    }
}

function ResponsiveList(props) {
    return (
        <Box className="MuiList-root LegendRoot-root-94 MuiList-padding" name="legend-bottom" component="li" sx={{display:'flex',flexDirection:'row',flexWrap:(useMediaQuery(mdTheme.breakpoints.up('md'))?'nowrap':'wrap'),justifyContent:'center'}} style={{width:'100%',listStyleType:'none'}}>
            {props.children}
        </Box>
    );
}

class InLineUnorderedList extends React.Component {
    render() {

        return (
            <ResponsiveList>
                {this.props.children}
            </ResponsiveList>
        )
    }
}

function GradingContent(props) {
    if (props.loaded) {
        return (
            <Paper style={{padding:'1rem'}} elevation={0}>
                <Typography variant="h4" gutterBottom>
                    Grading
                </Typography>
                <Paper elevation={0}>
                    <Chart data={props.grading.chart}>
                        <Palette scheme={[blueGrey['A100'], blueGrey['A200'], blueGrey['A400'], blueGrey['A700']]} />
                        <PieSeries valueField='value' argumentField='assignment' />
                        <Legend position='bottom' itemComponent={InLineList} rootComponent={InLineUnorderedList} />
                        <EventTracker />
                        <HoverState />
                        <Tooltip />
                    </Chart>
                </Paper>
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                {props.grading.letterBreakdowns.map((section) => 
                    (<Grid item xs>
                        {section.title===undefined?<></>:<Typography variant='h5' gutterBottom style={{textAlign:'center'}}>
                            {section.title}
                        </Typography>}
                        <TableContainer component={Paper}>
                            <Table sx={{minWidth: '100%'}} aria-label={section.title+" table"}>
                                <TableBody>
                                    {section.values.map((row) => (
                                        <TableRow>
                                            <TableCell variant="head">
                                                {row.letter}
                                            </TableCell>
                                            <TableCell>
                                                {row.range}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>)
                )}
                </Grid>
            </Paper>
        );
    }

    return (<LoadingContent />);
}

function LoadingContent(props) {
    return (
        <Paper style={{padding:'1rem'}} elevation={0}>
            <Typography variant="h3" gutterBottom>
                <Skeleton animation="wave" />
            </Typography>
            <Typography variant="body1">
                {[1,2,3,4,5].map((i) => (<Skeleton animation="wave" />))}
            </Typography>
        </Paper>
    );
}

class SyllabusContent extends React.Component {
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
        fetch(course+'/syllabus.yml')
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
        document.title = loaded ? details.title+" - Syllabus" : "IIT CS Course";
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h3">
                                {loaded ? details.name : <Skeleton animation="wave"/>}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <DescriptionContent loaded={loaded} description={details===null?null:details.description} />
                        </Grid>
                        <Grid item xs={12}>
                            <InstructorContent loaded={loaded} instructor={details===null?null:details.instructor} />
                        </Grid>
                        <Grid item xs={12}>
                            <TAContent loaded={loaded} assistants={details===null?null:details.assistants} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextbookContent loaded={loaded} textbooks={details===null?null:details.textbooks} />
                        </Grid>
                        <Grid item xs={12}>
                            <ResourceContent loaded={loaded} resources={details===null?null:details.resources} />
                        </Grid>
                        <Grid item xs={12}>
                            <GoalsContent loaded={loaded} goals={details===null?null:details.goals} />
                        </Grid>
                        {
                            loaded&&details.outcomes!==null&&details.outcomes!==undefined?<Grid item xs={12}>
                                <OutcomesContent loaded={loaded} outcomes={details===null?null:details.outcomes} />
                            </Grid>:''
                        }
                        <Grid item xs={12}>
                            <ParagraphContent loaded={loaded} paragraphs={details===null?null:details.assignments} title={"Assignments"} />
                        </Grid>
                        {
                            loaded&&details.quizess!==null&&details.quizess!==undefined?<Grid item xs={12}>
                                <ParagraphContent loaded={loaded} paragraphs={details===null?null:details.quizzes} title={"Quizzes"} />
                            </Grid>:''
                        }
                        <Grid item xs={12}>
                            <ParagraphContent loaded={loaded} paragraphs={details===null?null:details.exams} title={"Exams"} />
                        </Grid>
                        {
                            loaded&&details.project!==null&&details.project!==undefined?
                            <Grid item xs={12}>
                                <ParagraphContent loaded={loaded} paragraphs={details.project} title={"Project"} />
                            </Grid>:
                            ''
                        }
                        <Grid item xs={12}>
                            <GradingContent loaded={loaded} grading={details===null?null:details.grading} />
                        </Grid>
                        <Grid item xs={12}>
                            <ParagraphContent loaded={loaded} paragraphs={[<span>The IIT’s policy on academic honesty can be found here. Any indication of copying or cheating during exams, on assignments, or on the programming project will be considered a violation of academic integrity policy and will result in an immediate zero for the assignment for all parties involved. The unauthorized procuring or disseminating of solution to exams, quizzes, and assignments is also considered a violation of the academic integrity policy. All violations of academic integrity will be reported to <Link href='mailto:academichonesty@iit.edu'>academichonesty@iit.edu</Link>.</span>]} title="Academic Honesty" />
                        </Grid>
                        <Grid item xs={12}>
                            <ParagraphContent loaded={loaded} paragraphs={[<span>Reasonable accommodations will be made for students with documented disabilities. In order to receive accommodations, students must obtain a letter of accommodation from the Center for Disability Resources and make an appointment to speak with me as soon as possible. My office hours are listed above. The Center for Disability Resources can be contacted at <Link href='tel:312-567-5744'>312-567-5744</Link> or <Link href='mailto:disabilities@iit.edu'>disabilities@iit.edu</Link>.</span>]} title="Disabilities" />
                        </Grid>
                        <Grid item xs={12}>
                            <ParagraphContent loaded={loaded} paragraphs={["Our school is committed to fostering a safe, productive learning environment. Title IX and our school policy prohibits discrimination on the basis of sex. Sexual misconduct — including harassment, domestic and dating violence, sexual assault, and stalking — is also prohibited at our school.","Our school encourages anyone experiencing sexual misconduct to talk to someone about what happened, so they can get the support they need and our school can respond appropriately.","If you wish to speak confidentially about an incident of sexual misconduct, want more information about filing a report, or have questions about school policies and procedures, please contact our Title IX Coordinator, which can be found on our school's website. Our school is legally obligated to investigate reports of sexual misconduct, and therefore it cannot guarantee the confidentiality of a report, but it will consider a request for confidentiality and respect it to the extent possible.","As a teacher, I am also required by our school to report incidents of sexual misconduct and thus cannot guarantee confidentiality. I must provide our Title IX coordinator with relevant details such as the names of those involved in the incident."]} title="Title IX" />
                        </Grid>
                    </Grid>
                </Box>
            </ThemeProvider>
        )
    }
}

export default function Syllabus(props) {
    return <SyllabusContent course={props.course} />;
}