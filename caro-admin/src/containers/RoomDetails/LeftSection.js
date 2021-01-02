import React from 'react';
import { makeStyles, Avatar, Typography, Button } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import MyButton from '../../components/MyButton/index';

const LeftSection = () => {
    const classes = useStyles();

    return (
        <div style={{ margin: '5%', alignItems: 'center' }}>
            <div style={{borderColor: 'dodgerblue' ,borderWidth: '2px', borderStyle: 'solid', borderRadius: '5px', padding: '2%', marginBottom: '2%'}}>
                <div className={classes.player}>
                    <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                    <div style={{ justifyContent: 'center', margin: '2%' }}>
                        <Typography className={classes.title}>thanhtien813</Typography>
                        <Typography style={{ fontSize: '0.9rem', color: 'gray' }}>5feeedb2f3c3040c1848b3ba</Typography>
                    </div>
                </div>
            </div>
            <div style={{borderColor: 'red' ,borderWidth: '2px', borderStyle: 'solid', borderRadius: '5px', padding: '2%', marginTop: '2%', marginBottom: '10%'}}>
                <div className={classes.player}>
                    <Avatar className={classes.avatar} src="https://hinhnendephd.com/wp-content/uploads/2019/10/anh-avatar-dep.jpg"/>
                    <div style={{ justifyContent: 'center', margin: '2%' }}>
                        <Typography className={classes.title}>thanhtien813</Typography>
                        <Typography style={{ fontSize: '0.9rem', color: 'gray' }}>5feeedb2f3c3040c1848b3ba</Typography>
                    </div>
                </div>
            </div>

            <Typography className={classes.title}>Matches</Typography>
            <div className={classes.matches}>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 1
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 2
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 3
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 4
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 5
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 6
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 7
                </Button>
                <Button
                    variant="outlined"
                    color="primary"
                    className={classes.game}
                    startIcon={<CheckCircle />}
                >
                    Game 8
                </Button>
            </div>

            <MyButton onClick={() => {}} style={{ width: '100%', marginTop: '5%' }} variant="contained" color="primary">
                Back
            </MyButton>
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
        height: '300px',
        overflowX: 'hidden',
        overflowY: 'auto'
    },
    game: {
        width: '100%',
        margin: '2%',
    }
});

export default LeftSection;