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
        <Link underline="none" color="inherit" href="#/331">
            <Tooltip title="CS331 Home" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <FaPython size="1.25em" />
                    </ListItemIcon>
                    <ListItemText primary="CS 331" />
                </ListItem>
            </Tooltip>
        </Link>
        <Link underline="none" color="inherit" href="#/331/syllabus">
            <Tooltip title="CS331 Syllabus" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <TocIcon />
                    </ListItemIcon>
                    <ListItemText primary="Syllabus" />
                </ListItem>
            </Tooltip>
        </Link>
        <Link underline="none" color="inherit" href="#/331/lectures">
            <Tooltip title="CS331 Lectures" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <NotesIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lectures" />
                </ListItem>
            </Tooltip>
        </Link>
        <Link underline="none" color="inherit" href="#/331/review">
            <Tooltip title="CS331 Exam Review" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentTurnedInIcon />
                    </ListItemIcon>
                    <ListItemText primary="Exams" />
                </ListItem>
            </Tooltip>
        </Link>
        <Link underline="none" color="inherit" href="#/331">
            <Tooltip title="CS331 Discord" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <FaDiscord size="1.25em" />
                    </ListItemIcon>
                    <ListItemText primary="Discord" />
                </ListItem>
            </Tooltip>
        </Link>
        <Link underline="none" color="inherit" href="#/331">
            <Tooltip title="CS331 Mimir" placement="right" arrow>
                <ListItem button>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Mimir" />
                </ListItem>
            </Tooltip>
        </Link>
  </div>
);
