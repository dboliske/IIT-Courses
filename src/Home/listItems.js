import * as React from 'react';
import Link from '@mui/material/Link';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AssignmentIcon from '@mui/icons-material/Assignment';
import TocIcon from '@mui/icons-material/Toc';
import NotesIcon from '@mui/icons-material/Notes';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

import { FaBitbucket, FaDiscord, FaJava, FaPython } from 'react-icons/fa';

export const mainListItems = (
  <div>
    <Link underline="none" color="inherit" href="#/201">
        <ListItem button>
            <ListItemIcon>
                <FaJava size="1.25em" />
            </ListItemIcon>
            <ListItemText primary="CS 201" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201/syllabus">
        <ListItem button>
        <ListItemIcon>
            <TocIcon />
        </ListItemIcon>
        <ListItemText primary="Syllabus" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201/lectures">
        <ListItem button>
        <ListItemIcon>
            <NotesIcon />
        </ListItemIcon>
        <ListItemText primary="Lectures" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201/review">
        <ListItem button>
        <ListItemIcon>
            <AssignmentTurnedInIcon />
        </ListItemIcon>
        <ListItemText primary="Exams" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201/activities">
        <ListItem button>
        <ListItemIcon>
            <AccountTreeIcon />
        </ListItemIcon>
        <ListItemText primary="Activities" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201">
        <ListItem button>
        <ListItemIcon>
            <FaDiscord size="1.25em" />
        </ListItemIcon>
        <ListItemText primary="Discord" />
        </ListItem>
    </Link>
    <Link underline="none" color="inherit" href="#/201">
        <ListItem button>
        <ListItemIcon>
            <FaBitbucket size="1.25em" />
        </ListItemIcon>
        <ListItemText primary="BitBucket" />
        </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
    <div>
        <Link underline="none" color="inherit" href="#/cs331">
            <ListItem button>
            <ListItemIcon>
                <FaPython size="1.25em" />
            </ListItemIcon>
            <ListItemText primary="CS 331" />
            </ListItem>
        </Link>
        <Link underline="none" color="inherit" href="#/cs331/syllabus">
            <ListItem button>
            <ListItemIcon>
                <TocIcon />
            </ListItemIcon>
            <ListItemText primary="Syllabus" />
            </ListItem>
        </Link>
        <Link underline="none" color="inherit" href="#/cs331/lectures">
            <ListItem button>
            <ListItemIcon>
                <NotesIcon />
            </ListItemIcon>
            <ListItemText primary="Lectures" />
            </ListItem>
        </Link>
        <Link underline="none" color="inherit" href="#/cs331/review">
            <ListItem button>
            <ListItemIcon>
                <AssignmentTurnedInIcon />
            </ListItemIcon>
            <ListItemText primary="Exams" />
            </ListItem>
        </Link>
        <Link underline="none" color="inherit" href="#/cs331">
            <ListItem button>
            <ListItemIcon>
                <FaDiscord size="1.25em" />
            </ListItemIcon>
            <ListItemText primary="Discord" />
            </ListItem>
        </Link>
        <Link underline="none" color="inherit" href="#/cs331">
            <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Mimir" />
            </ListItem>
        </Link>
  </div>
);
