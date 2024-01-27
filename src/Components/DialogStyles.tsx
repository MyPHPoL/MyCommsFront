import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  dialogPaper: {
    backgroundColor: '#2a3a54',
    color: '#ffffff',
    borderRadius: '15px'
  },
  title: {
    backgroundColor: '#152238',
    fontWeight: 600,
  },
  whiteText: {
    color: '#ffffff',
  },
  styleButton: {
    color: '#ffffff',
    backgroundColor: '#123456',
    fontWeight: 600,
    '&:hover': {
      color: '#000000',
      backgroundColor: '#EAB308',
    },
  },
  inputLabel: {
    "&.Mui-focused": {
      color: '#ffffff' // replace with your desired color
    },
    "&.MuiInputLabel-root": {
      color: '#ffffff' // replace with your desired color
    }
  },
  inputField: {
    '& input': {
      color: '#ffffff',
    },
    '& label.Mui-focused': {
      color: '#ffffff',
    },
    '& .MuiInput-underline:before': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#ffffff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#ffffff',
      },
      '&:hover fieldset': {
        borderColor: '#ffffff',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#ffffff',
      },
    },
    color: '#ffffff', // replace with your desired color
  },
});