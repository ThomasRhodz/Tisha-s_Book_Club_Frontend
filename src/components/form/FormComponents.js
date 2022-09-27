import { styled } from "@mui/material/styles";
import { TextField } from "@mui/material";

export const SearchField = styled(TextField)(() => ({
  backgroundColor:'white',
  width:250,
  '& label.Mui-focused': {
    color: 'transparent',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'transparent',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
},
}));
