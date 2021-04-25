import React from 'react';

import { Box, Button, ButtonGroup, Chip, Container, Grid, Modal, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { withStyles } from '@material-ui/core/styles';

import { GoDeviceCameraVideo, GoMarkGithub } from 'react-icons/go';

import IFrame from 'react-iframe';

import NotFound from '../general/NotFound';
import Player from '../general/Player';

const classes = theme => ({
    title: {
        margin: theme.spacing(2),
        textAlign: 'center'
    },
    slidesOuter: {
        position: 'relative',
        width: '100%',
        paddingTop: '60%',
        marginBottom: theme.spacing(2)
    },
    slidesInner: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '100%',
        height: '100%'
    },
    slides: {
        paddingRight: theme.spacing(5),
        paddingLeft: theme.spacing(5)
    },
    skeleton: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: '80%',
        height: '100%',
        transform: 'translateX(10%)'
    },
    hugeButton: {
        width: '100%'
    },
    buttonIcon: {
        marginRight: theme.spacing(1)
    },
    relatedBar: {
        textAlign: 'center',
        margin: theme.spacing(1),
        marginTop: 0
    },
    relatedChip: {
        margin: theme.spacing(1)
    }
  });

function SlideShowPane(props) {
    const classes = props.classes;
    const slides = props.slides;

    if (slides === null) {
        return (
            <Box />
        );
    }

    return (
        <Box className={classes.slidesOuter}>
            <Skeleton animation="wave" className={classes.skeleton}/>
            <Box className={classes.slidesInner}>
                <IFrame url={slides} width="100%" height="100%" allow="fullscreen" frameBorder="0" className={classes.slides} />
            </Box>
        </Box>
    );
}

class Lecture extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: null,
            loaded: false,
            videoModal: false
        }
    }

    componentDidMount() {
        this.load(this.props.match.params.lect);
    }

    componentDidUpdate() {
        this.load(this.props.match.params.lect);
    }

    load(id) {
        const yaml = require('js-yaml');
        fetch('modules/lectures/'+id+'/index.yml')
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

    render() {
        document.title = "CS 201 - Lecture";
        const classes = this.props.classes;
        const { properties, loaded, videoModal } = this.state;

        if (!loaded) {
            return (
                <Container maxWidth="xl">
                </Container>
            );
        } else if (properties === null) {
            return (<NotFound />);
        } else {
            document.title = "CS 201 - " + properties.title;

            const handleVideoOpen = () => {
                this.setState({videoModal: true});
            };

            const handleVideoClose = () => {
                this.setState({videoModal: false});
            };

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
                                                window.location.href='/#/lecture/'+properties.previous;
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
                                                window.location.href='/#/lecture/'+properties.next;
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
                    <SlideShowPane classes={classes} slides={properties.slides} />
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
                    {properties.examples!==null?
                        <Button
                            className={classes.hugeButton}
                            size="large"
                            variant="outlined"
                            onClick={() => {window.open(properties.examples, '_blank')}}
                        >
                            <GoMarkGithub className={classes.buttonIcon} />
                            Example Code
                        </Button>
                        :''
                    }
                    {properties.video!==null?
                        <>
                            <Button
                                className={classes.hugeButton}
                                size="large"
                                variant="outlined"
                                onClick={handleVideoOpen}
                            >
                                <GoDeviceCameraVideo className={classes.buttonIcon} />
                                Video
                            </Button>
                            <Modal
                                open={videoModal}
                                onClose={handleVideoClose}
                                aria-labelledby="lecture-video"
                                arai-describedby="modal-for-lecture-video"
                            >
                                <Player
                                    video={properties.video}
                                    num={this.props.match.params.lect}
                                />
                            </Modal>
                        </>
                        :''
                    }
                </Container>
            );
        }
    }
}

export default withStyles(classes)(Lecture);