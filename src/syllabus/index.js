import React from 'react';

import { Button, ButtonGroup, Card, CardContent, Container, Divider, Paper, TableContainer, Table, TableBody, TableRow, TableCell, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import { Alert, AlertTitle } from '@material-ui/lab';

import { Chart } from 'react-google-charts';

const classes = theme => ({
    title: {
        margin: theme.spacing(2),
    },
    section: {
        margin: theme.spacing(2, 0),
    },
    text: {
        margin: theme.spacing(1),
    },
    book: {
        padding: theme.spacing(2),
        margin: theme.spacing(1)
    }
  });

class Syllabus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.load();
    }

    load() {
        const yaml = require('js-yaml');
        fetch("syllabus/syllabus.yml")
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    this.setState({
                        isLoaded: true,
                        data: data
                    });
                },
            )
    }

    renderContent(body, classes) {
        switch (typeof body) {
            case "object":
                switch (body.type) {
                    case 'paragraph':
                        return (
                            <Typography variant="body1" className={classes.text}>
                                {body.content}
                            </Typography>
                        );
                    case 'list':
                        return (
                            <ul>
                                {body.content.map((entry) => (
                                    <li>
                                        <Typography variant="body1" className={classes.text}>
                                            {entry}
                                        </Typography>
                                    </li>
                                ))}
                            </ul>
                        );
                    case 'identity':
                        return (
                            <>
                                <Typography variant="h6" className={classes.text}>{body.content.name}</Typography>
                                <TableContainer component={Paper} variant="outlined" >
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    <strong>Office Hours</strong>
                                                </TableCell>
                                                <TableCell>{body.content.hours}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    <strong>Office</strong>
                                                </TableCell>
                                                <TableCell>{body.content.office}</TableCell>
                                            </TableRow>
                                            {body.content.mailbox===undefined?'':
                                                <TableRow>
                                                    <TableCell component="th" scope="row">
                                                        <strong>Mailbox</strong>
                                                    </TableCell>
                                                    <TableCell>{body.content.mailbox}</TableCell>
                                                </TableRow>
                                            }
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </>
                        );
                    case 'table':
                        return (
                            <Paper elevation={0} className={classes.book}>
                                <Typography variant="h6" className={classes.text} style={{textAlign:'center'}}>{body.content.title}</Typography>
                                <TableContainer component={Paper} variant="outlined" >
                                    <Table>
                                        {body.content.rows.map((row) => (
                                            <TableRow>
                                                {row.map((column) => (
                                                    <TableCell align="center">{column}</TableCell>
                                                ))}
                                            </TableRow>
                                        ))}
                                    </Table>
                                </TableContainer>
                            </Paper>
                        )
                    case 'raw':
                        return (
                            <Typography variant="body1" dangerouslySetInnerHTML={{__html: body.content}}/>
                        );
                    case 'callout':
                        return (
                            <Alert severity={body.content.level} className={classes.book}>
                                <AlertTitle>{body.content.title}</AlertTitle>
                                <Typography variant="sbutitle1">{body.content.text}</Typography>
                            </Alert>
                        )
                    case 'book':
                        return (
                            <Paper variant="outlined" className={classes.book} >
                                <Typography variant="h6" className={classes.text}>{body.content.title}</Typography>
                                <TableContainer component={Paper} variant="outlined" >
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    <strong>Author</strong>
                                                </TableCell>
                                                <TableCell>{body.content.author}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    <strong>Publisher</strong>
                                                </TableCell>
                                                <TableCell>{body.content.publisher}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell component="th" scope="row">
                                                    <strong>ISBN</strong>
                                                </TableCell>
                                                <TableCell>{body.content.isbn}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        );
                    case 'graph':
                        var raw = body.content;
                        var data = [['Assignment', 'Percentage']];
                        var i;
                        for (i=0; i<raw.length; i++) {
                            data.push([raw[i].label, raw[i].value]);
                        }
                        console.log(data);
                        return (
                            <Chart
                                width={'100%'}
                                height={'33vh'}
                                chartType="PieChart"
                                data={data}
                                options={{
                                    colors:[blueGrey[200], blueGrey[400], blueGrey[600], blueGrey[800]],
                                    legend: {position: 'bottom', alignment: 'center'}
                                }}
                            />
                        );
                    case 'resource':
                        return (
                            <Paper variant="outlined" className={classes.book} >
                                <Typography variant="h6" className={classes.text}>{body.content.name}</Typography>
                                <Typography variant="body1" className={classes.text}>{body.content.text}</Typography>
                                {
                                    body.content.links.map((row) => (
                                        <>
                                            <ButtonGroup size="large" className={classes.text} style={{width:'100%'}} variant="contained">
                                                {row.map((link) => (
                                                    <Button style={{width:'100%'}} onClick={() => {window.open(link.to, '_blank')}}>
                                                        {link.label}
                                                    </Button>
                                                ))}
                                            </ButtonGroup>
                                            <br />
                                        </>
                                    ))
                                }
                            </Paper>
                        );
                    case 'multiple':
                        return body.content.map((entry) => this.renderContent(entry, classes));
                    default:
                        return 'unknown type';
                }
            default:
                return '';
        }
    }

    renderSection(section, classes) {
        return (
            <>
                <Divider variant="middle" />
                <Card className={classes.section} elevation={0}>
                    <CardContent>
                        <Typography variant="h5">{section.section}</Typography>
                        {this.renderContent(section.body, classes)}
                    </CardContent>
                </Card>
            </>
        );
    }

    render() {
        const { classes } = this.props;
        const { isLoaded, data } = this.state;

        document.title = "CS 201 - Syllabus";

        var content = [];
        if (isLoaded) {
            content = data;
        }

        return (
            <Container maxWidth="xl">
                <Typography variant="h3" align="center" className={classes.title}>Advanced Introduction to Object Oriented Programming</Typography>
                {content.map((sect) => this.renderSection(sect, classes))}
            </Container>
        )
    }

}

export default withStyles(classes)(Syllabus);