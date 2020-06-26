import styled from 'styled-components';

const TrackingDiv = styled.div`
  position: relative;
`;

const HoverDelIcons = styled.div`
position: relative;
top: -10px;
right: 0px;
:hover {
  color: #ed1212;
  cursor: pointer;
}`;

const deleteIconsPosition = {
  position: 'absolute',
  top: '-12px',
  right: '0px',
};

const deleteIcons = {
  width: '18px',
  height: '18px',
}

export { TrackingDiv, deleteIcons, deleteIconsPosition, HoverDelIcons };
