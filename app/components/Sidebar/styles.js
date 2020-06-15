import styled from 'styled-components';


const FooterNavbarDiv = styled.div`
  position: relative;
`;

const spanStyle = {
  cursor: 'pointer',
  background: '#eee5e5',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  display: 'block',
  textAlign: 'center',
  lineHeight: '20px',
  position: 'absolute',
  top: '22px',
  right: '95px',
}

const expandSpanStyle = {
  ...spanStyle,
  right: '6px',
}



export {
  FooterNavbarDiv,
  spanStyle,
  expandSpanStyle
}
