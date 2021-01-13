import { Switch, withStyles } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

const MySwitch = withStyles({
    switchBase: {
        color: blue[300],
        '&$checked': {
            color: blue[500],
        },
        '&$checked + $track': {
            backgroundColor: blue[500],
        },
    },
    checked: {},
    track: {},
})(Switch);

export default MySwitch;