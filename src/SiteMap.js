import * as React from 'react';
import { TreeItem, TreeView } from '@mui/lab';
import { FaPlusSquare, FaMinusSquare } from 'react-icons/fa';
import { Container } from '@mui/material';

export default class SiteMap extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            details: {
                id: 'root',
                name: 'IIT Courses',
                children: [
                    {
                        id: '1',
                        name: 'CS 201',
                        children: [
                            {
                                id: '1.1',
                                name: 'Home'
                            },
                            {
                                id: '1.2',
                                name: 'Syllabus'
                            },
                            {
                                id: '1.3',
                                name: 'Lectures'
                            },
                            {
                                id: '1.4',
                                name: 'Exam Review'
                            }
                        ]
                    },
                    {
                        id: '2',
                        name: 'CS 331',
                        children: [
                            {
                                id: '2.1',
                                name: 'Home'
                            },
                            {
                                id: '2.2',
                                name: 'Syllabus'
                            },
                            {
                                id: '2.3',
                                name: 'Lectures'
                            }
                        ]
                    }
                ]
            }
        }
    }

    render() {
        document.title = "Site Map";

        const renderTree = (nodes) => (
            <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name}>
              {Array.isArray(nodes.children)
                ? nodes.children.map((node) => renderTree(node))
                : null}
            </TreeItem>
          );

        return (
            <TreeView
                aria-label="rich object"
                defaultCollapseIcon={<FaMinusSquare />}
                defaultExpanded={['root']}
                defaultExpandIcon={<FaPlusSquare />}
                sx={{ flexGrow: 1, backgroundColor: '#ffffff', height: '100vh', overflowY: 'auto', overflowX: 'hidden', maxWidth: '100vw', margin: 0, padding: '5rem' }}
            >
                {renderTree(this.state.details)}
            </TreeView>
        );
    }
}