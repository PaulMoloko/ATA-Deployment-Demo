import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const ButtonRoot = styled(MuiButton)(({ theme, size }) => ({
  
  margin:"5px",
  borderRadius: "12px",
  backgroundColor: "rgb(159, 205, 231)",
    color: "black",
    "&:hover":{
      boxShadow:"0 0 10px rgb(159, 205, 231), 0 0 40px rgb(159, 205, 231), 0 0 80px rgb(159, 205, 231)",
      backgroundColor:"white", 
      opacity:4},
  fontWeight: theme.typography.fontWeightMedium,
  fontFamily: theme.typography.h1.fontFamily,
  padding: theme.spacing(2, 4),
  position: "center",
  fontSize: theme.typography.pxToRem(14),
  boxShadow: 'none',
  '&:active, &:focus': {
    boxShadow: 'none',
  },
  ...(size === 'small' && {
    padding: theme.spacing(1, 3),
    fontSize: theme.typography.pxToRem(13),
    
  }),
  ...(size === 'large' && {
    padding: theme.spacing(2, 5),
    fontSize: theme.typography.pxToRem(16),
  }),
}));

// See https://mui.com/guides/typescript/#usage-of-component-prop for why the types uses `C`.
function Button(props) {
  return <ButtonRoot {...props} />;
}

export default Button;
