import React from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink, HashRouter } from 'react-router-dom';

import { Grid, IconButton, Link, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';

const classes = theme => ({
    frame: {
        margin: theme.spacing(2)
    },
    day: {
        paddingTop: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingBottom: theme.spacing(6),
        textAlign: 'right'
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

        if (currentData === null || currentData === undefined) {
            days.push(<Grid item style={{width:'14.28%'}}>
                <Paper variant="outlined" square className={classes.day} >
                    <Typography
                        variant="h5"
                        color={(i===0&&day>7)||(i>3&&day<20)?'textSecondary':'initial'}
                    >
                        {day<10?'0'+day:day}
                    </Typography>
                </Paper>
            </Grid>);
        } else if (currentData.type === 'lecture') {
            days.push(<Grid item style={{width:'14.28%'}}>
                <Paper variant="outlined" square className={classes.day} >
                    <HashRouter>
                        <ProperLink
                            color='primary'
                            text={day<10?'0'+day:day}
                            to={currentData.link}
                        />
                    </HashRouter>
                </Paper>
            </Grid>);
        } else if (currentData.type === 'lab') {
            days.push(<Grid item style={{width:'14.28%'}}>
                <Paper variant="outlined" square className={classes.day} >
                    <Typography
                        variant="h5"
                        color='secondary'
                    >
                        {day<10?'0'+day:day}
                    </Typography>
                </Paper>
            </Grid>);
        }
    }

    return (
        <Grid container justify="center" alignItems="center">
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
                {this.buildCalendar().map((week, i) =>  weekDisplay(i, week, this.state.monthData, classes))}
            </Paper>
        );
    }
}

export default withStyles(classes)(Calendar);