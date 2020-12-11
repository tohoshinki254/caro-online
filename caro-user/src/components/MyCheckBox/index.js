import React from 'react';
import { Checkbox, withStyles } from '@material-ui/core';


const MyCheckBox = withStyles({
  root: {
    color: '#2f78f7',
    '&$checked': {
      color: '#2f78f7',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

export default MyCheckBox;