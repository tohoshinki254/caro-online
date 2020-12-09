import { Button, withStyles } from '@material-ui/core';

const MyButton = withStyles((theme) => ({
    root: {
      color: 'white',
      backgroundColor: 'dodgerblue',
      '&:hover': {
        backgroundColor: 'dodgerblue',
      },
    },
}))(Button);

export default MyButton;