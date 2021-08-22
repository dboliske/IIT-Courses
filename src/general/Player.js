import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import screenfull from 'screenfull';
import ReactPlayer from 'react-player/lazy';
import { FaPlay, FaVolumeMute, FaPause, FaForward, FaStepForward, FaVolumeDown, FaExpandArrowsAlt, FaExpand, FaInfo, FaTimes } from 'react-icons/fa';
import { Button, ButtonGroup, Fade, Grid, Menu, MenuItem, Popover, Slider, Tooltip } from '@material-ui/core';

function formatTimestamp(timestamp) {
    if (timestamp===undefined || timestamp===null) {
        return "00:00:00";
    }
    
    var time;
    if (typeof timestamp === "number"){
        time = timestamp;
    } else if (typeof timestamp === "string" && timestamp.match(/\d{2}:\d{2}:\d{2}/g)) {
        return timestamp;
    } else {
        time = parseFloat(timestamp);
    }

    var h = Math.floor(time/3600);
    var m = Math.floor((time-h*3600)/60);
    var s = Math.floor(time - h*3600 - m*60);
    return (h<10?"0"+h:h) + ":" + (m<10?"0"+m:m) + ":" + (s<10?"0"+s:s);
}

function ValueLabelComponent(props) {
    const {children, open, value} = props;

    return (
        <Tooltip title={formatTimestamp(value)}>
            {children}
        </Tooltip>
    )
}

ValueLabelComponent.propTypes = {
    children: PropTypes.element.isRequired,
    open: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired
}

class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.video.url,
            markers: props.video.timestamps===undefined?[]:props.video.timestamps,
            pip: false,
            playing: false,
            controls: false,
            light: false,
            volume: 1.0,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false,
            fullscreen: props.fullscreen===undefined?false:props.fullscreen,
            showControls: true,
            infoAnchor: null,
            volumeAnchor: null,
            shownControls: 0,
            playedSeconds: 0,
            number: props.num===undefined?0:props.num,
        }
        this.player = React.createRef();
        this.video = React.createRef();
    }

    load = url => {
        this.setState({
            url,
            played: 0,
            loaded: 0,
            pip: false
        })
    }

    onClose = () => {
        this.props.onClose()
    }

    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing, shownControls: 0 })
    }

    handleStop = () => {
        this.setState({ playing: false})
    }

    handleToggleControls = () => {
        const url = this.state.url;
        this.setState({
            controls: !this.state.controls,
            url: null
        }, () => this.load(url))
    }

    handleToggleLight = () => {
        this.setState({ light: !this.state.light })
    }
    
      handleToggleLoop = () => {
        this.setState({ loop: !this.state.loop })
      }
    
      handleVolumeChange = (e, v) => {
        this.setState({ volume: v, volumeAnchor: null })
      }
    
      handleToggleMuted = () => {
        this.setState({ muted: !this.state.muted })
      }
    
      handleSetPlaybackRate = e => {
          var currentPlayback = this.state.playbackRate;
          var nextPlayback = 1.0;
          if(currentPlayback === 1.0) {
              nextPlayback = 1.5;
          } else if (currentPlayback === 1.5) {
              nextPlayback = 2.0;
          } else if (currentPlayback === 2.0) {
              nextPlayback = 0.5;
          }
        this.setState({ playbackRate: nextPlayback })
      }
    
      handleTogglePIP = () => {
        this.setState({ pip: !this.state.pip })
      }
    
      handlePlay = () => {
        // console.log('onPlay')
        this.setState({ playing: true })
      }
    
      handleEnablePIP = () => {
        // console.log('onEnablePIP')
        this.setState({ pip: true })
      }
    
      handleDisablePIP = () => {
        // console.log('onDisablePIP')
        this.setState({ pip: false })
      }
    
      handlePause = () => {
        // console.log('onPause')
        this.setState({ playing: false, shownControls: 0 })
      }
    
      handleSkipToMarker = () => {
          this.setState({seeking: true});
          var currentTime = this.state.playedSeconds===undefined?0:this.state.playedSeconds;
        //   console.log("current: " + currentTime);
          for (var i=0; i<this.state.markers.length; i++) {
              var marker = this.state.markers[i];
            //   console.log("marker: " + marker.value);
              if (marker.value > currentTime) {
                //   console.log("percentage: " + (marker.value/this.state.duration));
                  this.setState({played: (marker.value/this.state.duration)});
                  this.setState({seeking:false});
                  this.player.seekTo(marker.value/this.state.duration);
                  return;
              }
          }
      }

      handleSeekMouseDown = e => {
        this.setState({ seeking: true })
      }
    
      handleSeekChange = (e, v) => {
        this.setState({ played: v })
      }
    
      handleSeekMouseUp = (e, v) => {
        this.setState({ seeking: false });
        this.player.seekTo(this.state.played);
      }

      handleJump = (e, v) => {
          this.setState({infoAnchor: null});
          this.player.seekTo(v);
      }
    
      handleProgress = state => {
        // console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)
        }
        if (this.state.playing && this.state.showControls) {
            if (this.state.shownControls === 5) {
                this.setState({showControls: false, shownControls: 0});
            } else {
                this.setState({shownControls: (this.state.shownControls + 1)});
            }
        }
      }
    
      handleEnded = () => {
        // console.log('onEnded')
        this.setState({ playing: this.state.loop })
      }
    
      handleDuration = (duration) => {
        // console.log('onDuration', duration)
        this.setState({ duration })
      }

      toggleFullscreen = () => {
          this.setState({fullscreen:!screenfull.isFullscreen});
          if (screenfull.isFullscreen) {
            screenfull.exit();
          } else {
            screenfull.request(findDOMNode(this.video));
          }
      }
    
      renderLoadButton = (url, label) => {
        return (
          <button onClick={() => this.load(url)}>
            {label}
          </button>
        )
      }

      setShowControls = e => {
          e.preventDefault();
          this.setState({showControls: true});
      }

      changeVideos = () => {
        if (this.props.num !== undefined && this.props.num !== null) {
            window.location.href = "#/lecture/"+(this.props.num)+"?_video=true";
            window.location.reload();
        }
      }

      render() {
        const { url, playing, controls, light, volume, muted, loop, loaded, duration, playbackRate, pip, markers } = this.state;

        return (
            <div style={{position:'relative',paddingTop:'56.25%',width:'100%',maxHeight:'100vh'}} ref={element => this.video = element} onMouseMove={this.setShowControls}>
                <ReactPlayer
                    ref={element => this.player = element}
                    className='react-player'
                    width='100%'
                    height='100%'
                    url={url}
                    pip={pip}
                    playing={playing}
                    controls={controls}
                    light={light}
                    loop={loop}
                    playbackRate={playbackRate}
                    volume={volume}
                    muted={muted}
                    style={{position:'absolute',top:0,maxWidth:'100%',maxHeight:'100vh'}}
                    onReady={() => console.log('onReady')}
                    onStart={() => console.log('onStart')}
                    onPlay={this.handlePlay}
                    onEnablePIP={this.handleEnablePIP}
                    onDisablePIP={this.handleDisablePIP}
                    onPause={this.handlePause}
                    onBuffer={() => console.log('onBuffer')}
                    onSeek={e => console.log('onSeek', e)}
                    onEnded={this.handleEnded}
                    onError={e => console.log('onError', e)}
                    onProgress={this.handleProgress}
                    onDuration={this.handleDuration}
                />
                <div style={{position:'absolute',top:0,left:0,background:'none',margin:0,transform:'translate(50vw,50vh) translate(-50%,-50%)',zIndex:20,display:((loaded&&!playing)?'block':'none'),borderRadius:'2rem'}}>
                    <Button onClick={this.handlePlay}>
                        <FaPlay
                            color='#717171'
                            size={100}
                        />
                    </Button>
                </div>
                <Fade
                    style={{
                        position:'absolute',
                        top:'1rem',
                        left: 0,
                        zIndex:30,
                        background:'none',
                        maxHeight:'100vh',
                        paddingRight:'1rem',
                        paddingLeft:'1rem',
                        transform:'translateX(50vw) translateX(-50%)',
                        maxWidth:'calc(100vh * 16.0/9.0)'
                    }}
                    in={this.state.showControls}
                    timeout={600}
                >
                    <Grid container justify="space-evenly">
                        <Grid item xs>
                            <ButtonGroup style={{background:'#ffffff'}} variant="contained">
                                <Tooltip title="Close Player" placement="bottom">
                                    <Button onClick={this.onClose}><FaTimes /></Button>
                                </Tooltip>
                            </ButtonGroup>
                        </Grid>
                        <Grid item xs style={{textAlign:'right'}}>
                            <ButtonGroup style={{background:'#ffffff'}} variant="contained">
                                <Tooltip title="Change Playback Speed" placement="bottom">
                                    <Button onClick={this.handleSetPlaybackRate}>{playbackRate===1||playbackRate===2?(playbackRate+".0"):playbackRate}x</Button>
                                </Tooltip>
                                <Tooltip title="Jump to Marker" placement="bottom-start">
                                    <Button disabled={markers.length===0||(markers.length!==0&&!loaded)} onClick={(e) => {this.setState({infoAnchor: e.currentTarget})}}><FaInfo /></Button>
                                </Tooltip>
                            </ButtonGroup>
                            <Menu
                                id="marker-menu"
                                anchorEl={this.state.infoAnchor}
                                keepMounted
                                open={Boolean(this.state.infoAnchor)}
                                onClose={() => {this.setState({infoAnchor: null})}}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }}
                                transformOrigin={{
                                    vertical:'top',
                                    horizontal:'right'
                                }}
                            >
                                {
                                    markers.map((marker) => (
                                        <MenuItem onClick={((e) => this.handleJump(e, marker.value))}>{marker.tag}</MenuItem>
                                    ))
                                }
                            </Menu>
                        </Grid>
                    </Grid>
                </Fade>
                <Fade
                    style={{
                        position:'absolute',
                        top:0,
                        left:0,
                        zIndex:25,
                        background:'none',
                        width:'100%',
                        paddingLeft:'1rem',
                        paddingRight:'1rem',
                        paddingBottom:'1rem',
                        transform:'translateX(50vw) translateY(min(calc(100vw * 9.0/16.0), 100vh)) translate(-50%, -100%)',
                        maxWidth:'calc(100vh * 16.0/9.0)'
                    }}
                    in={this.state.showControls}
                    timeout={600}
                >
                    <Grid container justify="space-evenly">
                        <Grid item xs={12}>
                            <Slider
                                ValueLabelComponent={ValueLabelComponent}
                                value={this.state.playedSeconds}
                                min={0}
                                max={duration}
                                marks={markers}
                                onMouseDown={this.handleSeekMouseDown}
                                onChange={this.handleSeekChange}
                                onMouseUp={this.handleSeekMouseUp}
                                style={{color:'#0071ff',opacity:1}}
                                disabled={!loaded}
                                getAriaValueText={formatTimestamp}
                                valueLabelFormat={formatTimestamp}
                            />
                        </Grid>
                        <Grid xs>
                            <ButtonGroup size="large" style={{background:'#ffffff'}} variant="contained">
                                <Tooltip title="Play/Pause" placement="top-end">
                                    <Button onClick={this.handlePlayPause} disabled={!loaded}>{playing?<FaPause />:<FaPlay />}</Button>
                                </Tooltip>
                                <Tooltip title="Skip to Next Marker" placement="top">
                                    <Button onClick={this.handleSkipToMarker} disabled={!loaded}><FaForward /></Button>
                                </Tooltip>
                                <Tooltip title="Skip to Next Lecture" placement="top">
                                    <Button onClick={this.changeVideos} disabled={!loaded}><FaStepForward /></Button>
                                </Tooltip>
                            </ButtonGroup>
                        </Grid>
                        <Grid xs style={{textAlign:'right'}}>
                            <ButtonGroup size="large" style={{background:'#ffffff'}} variant="contained">
                                <Tooltip title={muted?"Unmute":"Mute"} placement="top">
                                    <Button style={{backgroundColor:(muted?'#e9e9e9':'#ffffff')}} onClick={this.handleToggleMuted}><FaVolumeMute /></Button>
                                </Tooltip>
                                <Tooltip title="Volume">
                                    <Button onClick={(e) => {this.setState({volumeAnchor: e.currentTarget})}} id="volume-popover" style={{backgroundColor:'#ffffff'}}>
                                        <FaVolumeDown />
                                    </Button>
                                </Tooltip>
                                    <Tooltip title={this.state.fullscreen?"Exit Fullscreen":"Enter Fullscreen"} placement="top-start">
                                        <Button style={{backgroundColor:(this.state.fullscreen?'#e9e9e9':'#ffffff')}} onClick={this.toggleFullscreen}>{this.state.fullscreen?<FaExpand />:<FaExpandArrowsAlt />}</Button>
                                    </Tooltip>
                            </ButtonGroup>
                            <Popover
                                id="volume-popover"
                                open={Boolean(this.state.volumeAnchor)}
                                anchorEl={this.state.volumeAnchor}
                                onClose={() => {this.setState({volumeAnchor: null})}}
                                anchorOrigin={{
                                    vertical:'top',
                                    horizontal:'center'
                                }}
                                transformOrigin={{
                                    vertical:'bottom',
                                    horizontal:'center'
                                }}
                            >
                                <Slider
                                    orientation="vertical"
                                    value={volume}
                                    min={0.0}
                                    max={1.0}
                                    step={0.1}
                                    style={{minHeight:100,color:'#0071ff',marginTop:'1rem'}}
                                    onChange={this.handleVolumeChange}
                                    disabled={muted}
                                />
                            </Popover>
                        </Grid>
                    </Grid>
                </Fade>
            </div>
        )
      }
}

export default Player;