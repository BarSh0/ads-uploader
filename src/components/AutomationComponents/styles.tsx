import { Avatar, Card, Dialog, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)`
  border-radius: 1rem;
  display: flex;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 0rem 1.5rem 1.5rem 1.5rem;
  width: 9.2rem;
  height: 13rem;
  cursor: pointer;
  user-select: none;
`;

const ListItem = styled(Card)`
  display: flex;
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 0.5rem 1rem;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledAvatar = styled(Avatar)`
  border-radius: 0.5rem;
  box-shadow:
    rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
`;

const SmallAvatar = styled(Avatar)`
  width: 25px;
  height: 25px;
  background: #fff;
`;

const NewAutomationCard = styled(Stack)`
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  background: #fff;
  width: 9.2rem;
  height: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  user-select: none;
`;
const NewAutomationListItem = styled(Card)`
  display: flex;
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 0.5rem 1rem;
  flex-direction: row;
  gap: 1rem;
  height: 3rem;
  cursor: pointer;
  user-select: none;
  align-items: center;
`;

const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 1rem;
    min-width: 400px;
    /* min-height: 630px; */
  }
`;

const StackList = styled(Stack)`
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 0.5rem;
  border-radius: 1rem;
  overflow: overlay;
  border: 0.3rem solid #ffffff;
  height: 20rem;
  width: 15rem;
  justify-content: flex-start;
  gap: 0.5rem;
`;

export {
  StyledCard,
  StyledAvatar,
  SmallAvatar,
  NewAutomationCard,
  ListItem,
  NewAutomationListItem,
  StyledDialog,
  StackList,
};
