import React from 'react';
import { makeStyles, Avatar, Typography, Button } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';

const LeftSection = ({ matches, changeMatch, creator, player }) => {
    const classes = useStyles();

    return (
        <div style={{ margin: '5%', alignItems: 'center' }}>
            <div style={{borderColor: 'dodgerblue' ,borderWidth: '2px', borderStyle: 'solid', borderRadius: '5px', padding: '2%', marginBottom: '2%'}}>
                {creator !== undefined && 
                <div className={classes.player}>
                    <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                    <div style={{ justifyContent: 'center', margin: '2%' }}>
                        <Typography className={classes.title}>{creator.name}</Typography>
                        <Typography style={{ fontSize: '0.9rem', color: 'gray' }}>{creator._id}</Typography>
                    </div>
                </div>}
            </div>
            <div style={{borderColor: 'red' ,borderWidth: '2px', borderStyle: 'solid', borderRadius: '5px', padding: '2%', marginTop: '2%', marginBottom: '10%'}}>
                {player !== undefined && 
                <div className={classes.player}>
                    <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                    <div style={{ justifyContent: 'center', margin: '2%' }}>
                        <Typography className={classes.title}>{player.name}</Typography>
                        <Typography style={{ fontSize: '0.9rem', color: 'gray' }}>{player._id}</Typography>
                    </div>
                </div>}
            </div>

            <Typography className={classes.title}>Matches</Typography>
            <div className={classes.matches}>
                {matches.map((match) => (
                    match.result === -1 ? 
                        <Button
                            variant="outlined"
                            color="secondary"
                            className={classes.game}
                            startIcon={<CheckCircle />}
                            onClick={() => changeMatch(match)}
                        >
                            Game {match.match}
                        </Button>
                    : (match.result === 1 ?
                        <Button
                            variant="outlined"
                            color="primary"
                            className={classes.game}
                            startIcon={<CheckCircle />}
                            onClick={() => changeMatch(match)}
                        >
                            Game {match.match}
                        </Button>
                    :   <Button
                            variant="outlined"
                            color="default"
                            className={classes.game}
                            startIcon={<CheckCircle />}
                            onClick={() => changeMatch(match)}
                        >
                            Game {match.match}
                        </Button>)   
                ))}
            </div>
        </div>
    )
}

const useStyles = makeStyles({
    player: {
        display: 'flex',
        flexDirection: 'row',
    },
    avatar: {
        width: '20%',
        height: '20%'
    },
    title: {
        fontFamily: 'NerkoOne',
        fontSize: '1.7rem',
    },
    matches: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '400px',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    game: {
        width: '100%',
        margin: '2%',
    }
});

export default LeftSection;