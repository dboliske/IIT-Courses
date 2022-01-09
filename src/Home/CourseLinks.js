import React from 'react';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import TocIcon from '@mui/icons-material/Toc';
import NotesIcon from '@mui/icons-material/Notes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AssignmentIcon from '@mui/icons-material/Assignment';

import { FaBitbucket, FaDiscord, FaJava, FaPython } from 'react-icons/fa';

function MenuItemEmpty() {
    return (
        <Link underline="none" color="inherit" href="">
            <ListItem button>
                <ListItemIcon>
                    <MenuIcon icon="" />
                </ListItemIcon>
                <ListItemText primary="" />
            </ListItem>
        </Link>
    );
}

function MenuItem(props) {
    var details = props.details;
    var course = props.course;
    return (
        <Link underline="none" color="inherit" href={details.url}>
            <Tooltip title={(course===''?'':('CS'+course.toString()+' '))+details.text} placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <MenuIcon icon={details.icon} />
                    </ListItemIcon>
                    <ListItemText primary={(course===''?'':('CS'+course.toString()+' '))+details.name} />
                </ListItem>
            </Tooltip>
        </Link>
    );
}

function MenuIcon(props) {
    switch(props.icon) {
        case 'java':
            return <FaJava size="1.25em" />;
        case 'python':
            return <FaPython size="1.25em" />;
        case 'toc':
            return <TocIcon />;
        case 'notes':
            return <NotesIcon />;
        case 'assignment-in':
            return <AssignmentTurnedInIcon />
        case 'discord':
            return <FaDiscord size="1.25em" />
        case 'bitbucket':
            return <FaBitbucket size="1.25em" />
        case 'mimir':
            return <AssignmentIcon />
    }

    return <FaJava size="1.25em" />;
}

export default class CourseLinks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            course: props.course,
            includeName: props.main?true:false,
            loaded: false,
            items: []
        }
    }

    componentDidMount() {
        this.load(this.props.course);
    }

    load(course) {
        const yaml = require('js-yaml');
        fetch(course+'/links.yml')
            .then(res => res.text())
            .then(
                (result) => {
                    var data = yaml.safeLoad(result);
                    this.setState({
                        loaded: true,
                        items: data
                    })
                },
                (error) => {
                    this.setState({
                        loaded: true,
                        items: []
                    })
                }
            )
    }
    
    render() {
        const {includeName, items} = this.state;

        if (!this.state.loaded) {
            return (
                <React.Fragment>
                    {[1, 2, 3].map((item) => <MenuItemEmpty />)}
                </React.Fragment>
            )
        }

        return (
            <React.Fragment>
                {items.map((item) => <MenuItem details={item} course={includeName?this.props.course:''} />)}
            </React.Fragment>
        );
    }
}