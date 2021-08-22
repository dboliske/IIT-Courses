import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, HashRouter } from 'react-router-dom';

import { Grid, Hidden, IconButton, Link, Paper, Tooltip, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Alert } from '@material-ui/lab';

import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

const classes = theme => ({
    frame: {
        margin: theme.spacing(2),
        [theme.breakpoints.down('md')]: {
            marginLeft: theme.spacing(5),
            marginRight: theme.spacing(5)
        },
        [theme.breakpoints.up('lg')]: {
            marginLeft: theme.spacing(15),
            marginRight: theme.spacing(15)
        }
    },
    day: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        textAlign: 'right',
        height: '100%',
        minHeight: '8rem'
    },
    dayNumber: {
        paddingRight: theme.spacing(2)
    },
    dayName: {
        padding: theme.spacing(2),
        textAlign: 'center'
    },
    event: {
        padding: 0,
        margin: 0
    }
  });

function ProperLink(props) {
      const { text, to, color } = props;
    
      const renderLink = React.useMemo(
        () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
        [to],
      );
    
      return (
        <Link component={renderLink} color={color} variant="h5">
          {text}
        </Link>
      );
  }
  
  ProperLink.propTypes = {
      text: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
  };

function weekDisplay(i, week, data, classes) {
    var afterFirst = i > 0;
    var afterLast = false;
    var days = [];
    var j;
    for (j=0; j<7; j++) {
        var day = week[j];
        if (afterFirst && day === 1) {
            afterLast = true;
        }
        if (!afterFirst && day === 1) {
            afterFirst = true;
        }
        var currentData = null;
        if (data !== null && (typeof data !== "string") && afterFirst && !afterLast) {
            currentData = data[day];
        }

        var color = 'initial';
        var events = [];
        if (currentData === null || currentData === undefined) {
            color = (i===0&&day>7)||(i>3&&day<20)?'textSecondary':'initial';
        } else {
            var k;
            for (k=0; k<currentData.length; k++) {
                var event = currentData[k];
                var alertColor = 'primary';
                var tooltip = '';
                var disabled = false;
                var to = '';
                switch (event.type) {
                    case 'lecture':
                        alertColor = 'success';
                        tooltip = event.text;
                        to = event.link;
                        break;
                    case 'lab':
                        alertColor = 'info';
                        tooltip = 'Lab';
                        break;
                    case 'assignment':
                        alertColor = 'warning';
                        if (event.due==='lab') {
                            tooltip = event.name + " Due";
                        } else if (event.due==='project') {
                            tooltip = event.name + " Due";
                        }
                        break;
                    case 'exam':
                        alertColor = 'error';
                        tooltip = event.text;
                        to = event.link;
                        break;
                    case 'holiday':
                        color = 'textSecondary';
                        tooltip = event.name;
                        break;
                    default:
                        tooltip = event.type;
                }
                var alert = (
                    <ProperLink 
                        to={to}
                        text={<Tooltip
                            title={tooltip}
                            display={disabled?'none':'inherit'}
                            arrow
                            placement='top'
                        >
                            <Alert icon={false} severity={alertColor} variant="filled" style={{padding:0,paddingLeft:'1rem',paddingRight:'1rem',textAlign:'left'}}>
                                <Hidden mdDown>{tooltip}</Hidden>
                            </Alert>
                        </Tooltip>}
                    />
                );
                events.push(alert);
            }
        }

        while (events.length < 2) {
            events.push(<Alert icon={false} color='secondary'></Alert>)
        }

        days.push(<Grid item style={{width:'14.28%'}}>
                <Paper variant="outlined" square className={classes.day}>
                    <Typography
                        variant="h5"
                        color={color}
                        className={classes.dayNumber}
                    >
                        {day<10?'0'+day:day}
                    </Typography>
                    <HashRouter>
                        {events}
                    </HashRouter>
                </Paper>
            </Grid>);
    }

    return (
        <Grid container justify="center" alignItems="center" style={{height:'100%',alignItems: 'stretch'}}>
            {days}
        </Grid>
    )
}

class Calendar extends React.Component {
    constructor(props) {
        super(props);
        var date = new Date();
        this.state = {
            currentMonth: date.getMonth() + 1,
            currentYear: date.getFullYear(),
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate(),
            monthData: null,
            isLoaded: false
        }
    }

    componentDidMount() {
        this.loadMonth(this.state.year, this.state.month);
    }

    loadMonth(year, month) {
        const yaml = require('js-yaml');
        this.setState({
            isLoaded: false,
            monthData: null    
        });
        fetch("calendar/"+year+"/"+month+".yml")
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    this.setState({
                        isLoaded: true,
                        monthData: data
                    });
                },
            )
    }

    monthToName(month) {
        switch (month) {
            case 1:
                return 'January';
            case 2:
                return 'February';
            case 3:
                return 'March';
            case 4:
                return 'April';
            case 5:
                return 'May';
            case 6:
                return 'June';
            case 7:
                return 'July';
            case 8:
                return 'August';
            case 9:
                return 'September';
            case 10:
                return 'October';
            case 11:
                return 'November';
            case 12:
                return 'December';
            default:
                return 'Undecimber';   
        }
    }

    daysInMonth(month, year) {
        if (month === 2) {
            return year%4===0?29:28;
        } else if ([4, 6, 9, 11].includes(month)) {
            return 30;
        }
        return 31;
    }

    computeDirMonth(month, year, dir) {
        var newMonth;
        var newYear = year;
        if (month === 1 && dir === -1) {
            newMonth = 12;
            newYear = year - 1;
        } else if (month === 12 && dir === 1) {
            newMonth = 1;
            newYear = year + 1;
        } else {
            newMonth = month + dir;
        }

        return [newMonth, newYear];
    }

    updateMonth(dir) {
        const { month, year } = this.state;
        
        var res = this.computeDirMonth(month, year, dir);

        this.setState({month: res[0], year: res[1]});
        this.loadMonth(res[1], res[0]);
    }

    computeDayOfWeek(year, month, day) {
        var m = month;
        if (m === 1 || m === 2) {
            m = m + 12;
        }
        m = m - 2;

        var bigY = month<=2?year-1:year;
        var c = Math.floor(bigY / 100);
        var y = bigY % 100;
        
        var w = (day+Math.floor(2.6*m-0.2)+y+Math.floor(y/4)+Math.floor(c/4)-2*c)%7;
    
        return (w<0?w+7:w);
    }

    buildCalendar() {
        const {month, year} = this.state;

        var startDay = this.computeDayOfWeek(year, month, 1);
        var weeks = [];
        var i;

        var prev = this.computeDirMonth(month, year, -1);
        var maxDays = this.daysInMonth(prev[0], prev[1]);
        var week = []
        for(i=maxDays-startDay;i<maxDays;i++) {
            week.push(i+1); 
        }
        for(i=1;i<=7-startDay;i++) {
            week.push(i);
        }
        weeks.push(week);
        week = [];
        maxDays = this.daysInMonth(month, year);
        for(;i<=maxDays;i++) {
            week.push(i);
            if (week.length === 7) {
                weeks.push(week);
                week = [];
            }
        }
        i = 1;
        while(week.length < 7) {
            week.push(i);
            i++;
        }
        weeks.push(week);

        return weeks;
    }

    render() {
        const { classes } = this.props;

        return (
            <Paper variant="outlined" className={classes.frame} display="flex" >
                <Grid container alignItems="center" justify='center'>
                    <Grid item xs={1} align='right'>
                        <IconButton onClick={() => { this.updateMonth(-1)}}>
                            <RiArrowDropLeftLine />
                        </IconButton>
                    </Grid>
                    <Grid align='center'>
                        <Typography variant="h5">
                            {this.monthToName(this.state.month)}
                            {this.state.year!==this.state.currentYear?' '+this.state.year:''}
                        </Typography>
                    </Grid>
                    <Grid item xs={1} align='left'>
                        <IconButton onClick={() => { this.updateMonth(1)}}>
                            <RiArrowDropRightLine />
                        </IconButton>
                    </Grid>
                </Grid>
                <Hidden smDown>
                    <Grid container justify="center" alignItems="center">
                        {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((day) => (
                            <Grid item style={{width:'14.28%'}}>
                                <Paper variant="outlined" square className={classes.dayName}>
                                    <Typography variant="body2">
                                        {day}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Hidden>
                <Hidden mdUp>
                    <Grid container justify="center" alignItems="center">
                        {["SU","MO","TU","WE","TH","FR","SA"].map((day) => (
                            <Grid item style={{width:'14.28%'}}>
                                <Paper variant="outlined" square className={classes.dayName}>
                                    <Typography variant="body2">
                                        {day}
                                    </Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Hidden>
                {this.buildCalendar().map((week, i) =>  weekDisplay(i, week, this.state.monthData, classes))}
            </Paper>
        );
    }
}

export default withStyles(classes)(Calendar);