import { Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StackListItem = styled(Stack)`
  gap: 0.5rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: #ffffff;
  user-select: none;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const DisableStackListItem = styled(Stack)`
  gap: 0.5rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  padding: 0.5rem;
  background-color: #ffffff;
  opacity: 0.5;
  user-select: none;
  align-items: center;
`;

const BasicListLabel = styled('h3')`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  border-radius: 0.5rem;
  margin: 0;
  padding: 0.5rem;
  background-color: #ffffff;
  user-select: none;
  text-transform: uppercase;
  text-align: center;
`;

export { StackListItem, BasicListLabel, DisableStackListItem };
