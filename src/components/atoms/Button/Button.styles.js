import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledButton = styled(Button)(({ theme, variant }) => {
  const mainColor = theme.palette[variant]?.main;
  const contrastText = mainColor ? theme.palette.getContrastText(mainColor) : '#fff';

  return {
    backgroundColor: mainColor,
    color: contrastText,
    '&:hover': {
      backgroundColor: theme.palette[variant]?.dark,
    },
  };
});

export default StyledButton;
