import React from 'react';

import { Accordion, AccordionDetails, AccordionSummary, Box, Button, ButtonGroup, Chip, Container, Divider, Grid, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import { MdExpandMore } from 'react-icons/md';

import NotFound from '../general/NotFound';

import EmbeddedGist from './EmbeddedGist';

const classes = theme => ({
    title: {
        margin: theme.spacing(2),
        textAlign: 'center'
    },
    hugeButton: {
        width: '100%'
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    },
    relatedBar: {
        textAlign: 'center',
        margin: theme.spacing(3),
        marginTop: 0
    },
    relatedChip: {
        margin: theme.spacing(1)
    },
    questionCard: {
        margin: theme.spacing(2),
        padding: theme.spacing(2)
    },
    questionContent: {
        margin: theme.spacing(2)
    },
    questionImage: {
        height: '100%',
        maxWidth: '480px'
    },
    solution: {
        background: green['A700']
    },
  });

class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: null,
            loaded: false,
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.load(this.props.match.params.id);
    }

    componentDidUpdate() {
        if (this.state.id !== this.props.match.params.id) {
            this.load(this.props.match.params.id);
            this.setState({id: this.props.match.params.id});
        }
    }

    load(id) {
        const yaml = require('js-yaml');
        fetch('review/topics/'+id+'/index.yml')
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    if (data.id === undefined) {
                        this.setState({
                            loaded: true,
                            properties: null
                        })
                    } else {
                        this.setState({
                            properties: data,
                            loaded: true
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

    renderQuestionContent(question, classes) {
        switch(question.type) {
            case "text":
                return (
                    <Box className={classes.questionContent}>
                        <Typography variant="body1">
                            {question.content}
                        </Typography>
                    </Box>
                );
            case "image":
                return (
                    <Box className={classes.questionContent} style={{textAlign:'center'}}>
                        <img src={question.content} className={classes.questionImage} />
                    </Box>
                );
            default:
                return question.content;
        }
    }

    render() {
        document.title = "CS 201 - Review";
        const classes = this.props.classes;
        const { properties, loaded } = this.state;

        console.log(loaded);
        console.log(properties);

        if (!loaded) {
            return (
                <Container maxWidth="xl">
                </Container>
            );
        } else if (properties === null) {
            return (<NotFound />);
        } else {
            return (
                <Container maxWidth="xl">
                    <Typography variant="h3" className={classes.title}>
                        Lecture {properties.id} - {properties.title}
                    </Typography>
                    <Grid container justify="center" alignItems="center">
                        <Grid item>
                            <ButtonGroup>
                                {
                                    properties.previous!==null?
                                        <Button
                                            onClick={() => {
                                                window.location.href='/~dboliske/#/review/topic/'+properties.previous;
                                                this.setState({loaded:false,properties:null});
                                            }}
                                        >
                                            Previous
                                        </Button>
                                    :''
                                }
                                {
                                    properties.next!==null?
                                        <Button
                                            onClick={() => {
                                                window.location.href='/~dboliske/#/review/topic/'+properties.next;
                                                this.setState({loaded:false,properties:null});
                                            }}
                                        >
                                            Next
                                        </Button>
                                    :''
                                }
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Typography variant="body1" className={classes.title}>
                        {properties.description}
                    </Typography>
                    <Box className={classes.relatedBar}>
                        {properties.related!==null?properties.related.map((topic) => (
                            <Chip
                                className={classes.relatedBar}
                                label={topic.name}
                                onClick={() => {window.location.href=topic.link}}
                            />
                        )):
                            <Typography variant="body1">NO RELATED TOPICS</Typography>
                        }
                    </Box>
                    {
                        properties.questions.map((q, i) => (
                            <Paper className={classes.questionCard}>
                                <Typography variant="h6">
                                    {(i+1)} {properties.title}
                                </Typography>
                                <Divider />
                                {
                                    q.question.map((para) => (this.renderQuestionContent(para, classes)))
                                }
                                {
                                    q.solution.map((sol, s) => (
                                        <Accordion className={classes.solution}>
                                            <AccordionSummary
                                                expandIcon={<MdExpandMore />}
                                                aria-controls={"solution"+s+"-content"}
                                                id={"solution"+s+"-header"}
                                            >
                                                <Typography variant="subtitle1">{(sol.name===null?"Solution":sol.name)}</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <EmbeddedGist gist={sol.gist} file={sol.name}/>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                }
                            </Paper>
                        ))
                    }
                </Container>
            );
        }
    }
}

export default withStyles(classes)(Topic);