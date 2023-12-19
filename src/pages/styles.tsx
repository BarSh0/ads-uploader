import { Avatar, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Container } from '@mui/system';

const StyledSocialAvatar = styled(Avatar)`
  border-radius: 0.7rem;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  :hover {
    transform: scale(1.1);
  }
`;

const FilterBar = styled(Box)`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1fr;
  border-radius: 0.5rem;
  padding: 0.5rem;
  gap: 1rem;
  align-items: center;
  z-index: 4;
`;

const StyledContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export { FilterBar, StyledContainer, StyledSocialAvatar };
