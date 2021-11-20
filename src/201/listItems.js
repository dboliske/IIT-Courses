import * as React from 'react';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TocIcon from '@mui/icons-material/Toc';
import NotesIcon from '@mui/icons-material/Notes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { FaBitbucket, FaDiscord, FaJava, FaPython } from 'react-icons/fa';

export const mainListItems = (
  <div>
    <Link underline="none" color="inherit" href="#/201">
        <Tooltip title="CS201 Home" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <FaJava size="1.25em" />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201/syllabus">
        <Tooltip title="CS201 Syllabus" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <TocIcon />
                </ListItemIcon>
                <ListItemText primary="Syllabus" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201/lectures">
        <Tooltip title="CS201 Lectures" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <NotesIcon />
                </ListItemIcon>
                <ListItemText primary="Lectures" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201/review">
        <Tooltip title="CS201 Exam Review" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentTurnedInIcon />
                </ListItemIcon>
                <ListItemText primary="Exams" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201/activities">
        <Tooltip title="CS201 Lecture Projects" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <AccountTreeIcon />
                </ListItemIcon>
                <ListItemText primary="Activities" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201">
        <Tooltip title="CS201 Discord" placement="right" arrow>
            <ListItem button>
                <ListItemIcon>
                    <FaDiscord size="1.25em"/>
                </ListItemIcon>
                <ListItemText primary="Discord" />
            </ListItem>
        </Tooltip>
    </Link>
    <Link underline="none" color="inherit" href="#/201">
        <Tooltip title="CS201 Lecture BitBucket Repository" placement="right" arrow>
            <ListItem button>
            <ListItemIcon>
                <FaBitbucket size="1.25em" />
            </ListItemIcon>
            <ListItemText primary="BitBucket" />
            </ListItem>
        </Tooltip>
    </Link>
  </div>
);
