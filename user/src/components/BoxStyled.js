import { Box, styled } from '@mui/material';

const BoxStyled = ({ children, style, question_id }) => {
  return (
    <BoxStyle id={question_id} sx={style}>
      {children}
    </BoxStyle>
  );
};

const BoxStyle = styled(Box)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: 'rgba(0,0,0,0.5)',
  border: '1px solid #000',
  borderRadius: '8px',
});

export default BoxStyled;
