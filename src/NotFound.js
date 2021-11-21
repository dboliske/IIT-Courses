import React from 'react';
import { Box, Button, Typography } from '@mui/material';

import './NotFound.css';

export default class NotFound extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            home: '#/'+(props.home?props.home:'')
        }
    }

    componentDidMount() {
        const script = document.createElement("script");
        script.type="text/javascript";
        script.innerHTML = "var container = document.getElementById('course-container');if (container !== null) {container.style.margin=0;container.style.minWidth='100%';container.style.minHeight='100%';}var scene = document.getElementById('scene');var parallax = new Parallax(scene);"
        document.body.appendChild(script);
    }

    render() {
        document.title = "Not Found";

        return (
            <section className="wrapper">
                <Box className="container">
                    <Box id='scene' className='scene' data-hover-only="false">
                        <Box className='circle' data-depth='1.2'></Box>
                        <Box className='one' data-depth='0.9'>
                            <Box className='content'>
                                <span className='piece'></span>
                                <span className='piece'></span>
                                <span className='piece'></span>
                            </Box>
                        </Box>
                        <Box className='two' data-depth='0.6'>
                            <Box className='content'>
                                <span className='piece'></span>
                                <span className='piece'></span>
                                <span className='piece'></span>
                            </Box>
                        </Box>
                        <Box className='three' data-depth='0.4'>
                            <Box className='content'>
                                <span className='piece'></span>
                                <span className='piece'></span>
                                <span className='piece'></span>
                            </Box>
                        </Box>
                        <Typography variant="body" className="p404" data-depth='0.5'>404</Typography>
                        <Typography variant="body" className="p404" data-depth='0.1'>404</Typography>
                    </Box>
                    <Box className="text">
                        <article>
                            <Typography variant="subtitle1" style={{color:'white'}}>Uh oh! Looks like you got lost.</Typography>
                            <Typography variant="subtitle1" style={{paddingBottom:'1rem',color:'white'}}>You should probably go home.</Typography>
                            <Button onClick={() => {window.location=this.state.home}}>Home</Button>
                        </article>
                    </Box>
                </Box>
            </section>
        )
    }
}