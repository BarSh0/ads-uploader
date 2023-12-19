import BoltIcon from '@mui/icons-material/Bolt';
import BrightnessLowIcon from '@mui/icons-material/BrightnessLow';
import { Typography } from '@mui/material';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/system';

const StyledCard = styled(Card)`
  width: 10rem;
  height: 12rem;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
  cursor: pointer;
  background: #f0f3f4;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: scale(1.1);
    background: #7bd6b0;
  }
`;

type ModeSelectProps = {
  setIsAdvancedMode: Function;
  isAdvancedMode: boolean;
};

const ModeSelect = ({ setIsAdvancedMode, isAdvancedMode }: ModeSelectProps) => {
  return (
    <Stack gap={10}>
      <Typography variant="h6" component="div" textAlign={'center'}>
        Mode: {isAdvancedMode ? 'Advanced' : 'Simple'}
      </Typography>
      <Stack flexDirection={'row'} gap={5} justifyContent={'center'}>
        <StyledCard onClick={() => setIsAdvancedMode(false)}>
          <BoltIcon fontSize="large" />
          <Typography variant="h4" component="div">
            Simple
          </Typography>
          <Typography textAlign={'center'} variant="body2" component="div">
            Choose excisting campaign and add it to your automation
          </Typography>
        </StyledCard>
        <StyledCard onClick={() => setIsAdvancedMode(true)}>
          <BrightnessLowIcon fontSize="large" />
          <Typography variant="h4" component="div">
            Advanced
          </Typography>
          <Typography textAlign={'center'} variant="body2" component="div">
            Fill all the details and create your own automation
          </Typography>
        </StyledCard>
      </Stack>
    </Stack>
  );
};

export default ModeSelect;
