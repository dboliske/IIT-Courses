import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClassIcon from '@mui/icons-material/Class';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, amber, orange, deepOrange, brown, grey, blueGrey } from '@mui/material/colors';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, DayView, MonthView, Appointments, AppointmentTooltip, Resources } from '@devexpress/dx-react-scheduler-material-ui';

const mdTheme = createTheme();

function formatDate(date) {
    var month = date.getMonth();
    var day = date.getDate();
    return date.getFullYear()+'-'+(month<9?'0':'')+(month+1)+'-'+(day<10?'0':'')+day;
}

function CalendarPlaceHolder() {
    return (
        <Skeleton variant='rectangular' width='100%' animation='wave' style={{ borderRadius: "4px 6.7px" }}>
            <div style={{ paddingTop: '80%' }} />
        </Skeleton>
    );
}

function resources(course) {
    return [{
        fieldName: 'type',
        title: '',
        instances: [
            { id: '201-Assignment', text: 'Due Date', color: amber },
            { id: '201-Lecture', text: 'Lecture', color: red },
            { id: '201-Lab', text: 'Lab', color: orange },
            { id: '201-Exam', text: 'Exam', color: deepOrange },
            { id: '331-Assignment', text: 'Due Date', color: pink },
            { id: '331-Lecture', text: 'Lecture', color: indigo },
            { id: '331-Lab', text: 'Lab', color: purple },
            { id: '331-Exam', text: 'Exam', color: deepPurple },
            { id: '201-Holiday', text: 'No Class', color: blueGrey },
            { id: '331-Holiday', text: 'No Class', color: blueGrey }
        ]
    }];
}

function buildTooltipLinks(type, data) {
    switch (type) {
        case "Lecture":
            return (
                <Tooltip title="Lecture Slides">
                    <IconButton onClick={() => {window.location.hash=data.link}}>
                        <ClassIcon />
                    </IconButton>
                </Tooltip>        
            );
    }
    return <></>;
}

const Header = ({
    children, appointmentData, classes, ...restProps
  }) => (
    <AppointmentTooltip.Header
      {...restProps}
      appointmentData={appointmentData}
    >
      {buildTooltipLinks(appointmentData.type, appointmentData)}
    </AppointmentTooltip.Header>
  );

function RenderCalendar(props) {
    var schedulerData = [];

    var d;
    for (d=0;d<props.details.length;d++) {
        schedulerData.push(
            props.details[d]
        );
    }

    var smallScreen = useMediaQuery(mdTheme.breakpoints.down('md'));

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Grid container justifyContent="center" alignItems="center">
                    <Grid item xs={12}>
                            <Grid container direction='row' spacing={3} justifyContent="center" alignItems="center">
                                <Grid item xs textAlign='center'>
                                    <IconButton onClick={() => {var c = new Date(props.calendar.state.current);(smallScreen?c.setDate(c.getDate()-1):c.setMonth(c.getMonth()-1));props.calendar.setState({current: c})}} >
                                        <ArrowBackIosIcon />
                                    </IconButton>
                                </Grid>
                                <Grid item xs textAlign='center'>
                                    <Button onClick={() => {props.calendar.setState({current: props.calendar.state.today});}} >
                                        Today
                                    </Button>
                                </Grid>
                                <Grid item xs textAlign='center'>
                                    <IconButton onClick={() => {var c = new Date(props.calendar.state.current);(smallScreen?c.setDate(c.getDate()+1):c.setMonth(c.getMonth()+1));props.calendar.setState({current: c})}} >
                                        <ArrowForwardIosIcon />
                                    </IconButton>
                                </Grid>
                            </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper>
                            <Scheduler data={schedulerData}>
                                <ViewState currentDate={formatDate(props.current)} />
                                {useMediaQuery(mdTheme.breakpoints.down('md'))?<DayView startDayHour={15} endDayHour={24} cellDuration={60} />:<MonthView startDayHour={15} endDayHour={24} cellDuration={60} />}
                                <Appointments />
                                <AppointmentTooltip
                                    headerComponent={Header}
                                    showCloseButton
                                />
                                <Resources data={resources(props.course)} />
                            </Scheduler>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

class CalendarContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            today: new Date(),
            current: new Date(),
            data: [],
            loaded: false
        };
    }

    componentDidMount() {
        const { today } = this.state;
        var start = new Date();
        start.setDate(1);
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);
        if (Array.isArray(this.props.course)) {
            this.props.course.map((course) => this.load(course));
        } else {
            this.load(this.props.course);
        }
    }

    load(course) {
        const yaml = require("js-yaml");
        fetch(course+'/calendar.yml')
            .then(res => res.text())
            .then(
                (result) => {
                    var events = yaml.safeLoad(result);
                    this.setState((state) => {
                        return {data: (events===null?[]:(events[0].title===undefined?[]:
                            this.deleteDuplicates(this.state.data.concat(events.map((event) => ({...event, type: course+'-'+event.type}))))))
                        };
                    });
                },
                (error) => {
                    this.setState((state) => {
                        return {data: []};
                    });
                }
            )
    }

    deleteDuplicates(array) {
        let unique = array.filter((value, index, self) =>
        index === self.findIndex((t) => (
          t.title === value.title && t.startDate === value.startDate
        ))
      )

        return unique;
    }

    render() {
        return (
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    {
                        this.state.data===null ?
                        <CalendarPlaceHolder /> :
                        <RenderCalendar details={this.state.data} current={this.state.current} calendar={this} course={this.state.course} />
                    }
                </Box>
            </ThemeProvider>
        )
    }
}

export default function Calendar(props) {
    return <CalendarContent course={props.course} />;
}
