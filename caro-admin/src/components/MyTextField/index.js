import { TextField, withStyles } from '@material-ui/core';

const MyTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: 'black',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'black',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'red',
        },
        '&:hover fieldset': {
          borderColor: 'yellow',
        },
        '&.Mui-focused fieldset': {
          borderColor: 'black',
        },
      },
      "& .MuiInputBase-root.Mui-disabled": {
        color: 'black'
      }
    },
})(TextField);

export default MyTextField;