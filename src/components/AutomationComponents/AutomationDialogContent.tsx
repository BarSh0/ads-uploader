import { Badge, Box, Stack, styled, Typography } from '@mui/material';
import { IAutomation } from '../../constants/types/automation.types';
import platforms from '../../data/Platforms';
import DeleteAutomationBtn from './DeleteAutomationBtn';
import { SmallAvatar, StyledAvatar } from './styles';

const DialogBox = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two columns, each with equal width */
  grid-template-rows: 1fr auto; /* Two rows, the first takes the remaining space, the second fits its content */
  grid-gap: 10px; /* Gap between grid items */
  height: 38rem; /* Set a fixed height for the container (adjust as needed) */
`;

const LeftBox = styled(Box)`
  grid-column: 1; /* Position the element in the first column */
  grid-row: 1 / span 2; /* Span the element from row 1 to row 2 */
`;

const RightBox = styled(Box)`
  grid-column: 2; /* Position the element in the second column */
  grid-row: 1; /* Position the element in the first row */
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const BottomBox = styled(Box)`
  grid-column: 2; /* Span the element across both columns */
  grid-row: 2; /* Position the element in the second row */
  display: flex;
  justify-content: flex-end; /* Arrange buttons with equal spacing */
  gap: 1rem;
  align-items: center; /* Center the buttons vertically */
  background: #fff;
  border-radius: 1rem;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.25);
  padding: 1rem;
`;

const AutomationDialogContent = (automation: IAutomation) => {
  return (
    <DialogBox>
      <LeftBox>
        <Stack flexDirection={'row'} alignItems={'center'} gap={3}>
          <span>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar
                  sx={{ width: 35, height: 35, background: 'none' }}
                  alt="Remy Sharp"
                  src={platforms.find((p) => p.name === automation.page.platform)?.icon}
                />
              }
            >
              <StyledAvatar variant="rounded" sx={{ width: 80, height: 80 }} src={automation.page.picture} />
            </Badge>
          </span>
          <Typography fontWeight={900} fontSize={20}>
            {automation.page.name || 'No Data'}
          </Typography>
        </Stack>
        <Typography fontWeight={900} fontSize={50} margin={30} position={'absolute'}>
          On Progress...
        </Typography>
        <Stack gap={2} padding={5}>
          <Typography>Page ID: {automation.page.pageId || 'No Data'}</Typography>
          <Typography>Campaign ID: {automation.campaign.id || 'No Data'}</Typography>
          <Typography>Daily Budget: {automation.dailyBudget || 'No Data'}</Typography>
          <Typography>Objective: {automation.objective || 'No Data'}</Typography>
          <Typography>Status: {automation.status || 'No Data'}</Typography>
        </Stack>
        {/* 
        <Typography>Pause Time: {automation.rules[0].adPauseTime || 'No Data'}</Typography>
        {automation.audiences.map((a) => (
          <Typography key={a.id}>Audience: {a.name || 'No Data'}</Typography>
        ))}
         */}
      </LeftBox>
      <RightBox>
        <Typography fontWeight={900} fontSize={16}>
          Activity
        </Typography>
        <Typography fontSize={14}>Newest</Typography>
        <Stack>
          <Typography fontSize={14}>Post</Typography>
          <Typography fontSize={14}>Post</Typography>
          <Typography fontSize={14}>Post</Typography>
        </Stack>
        <Typography fontSize={14}>Yesterday</Typography>
        <Stack>
          <Typography fontSize={14}>Post</Typography>
          <Typography fontSize={14}>Post</Typography>
          <Typography fontSize={14}>Post</Typography>
        </Stack>
      </RightBox>
      <BottomBox>
        <DeleteAutomationBtn {...automation} />
        <Typography fontWeight={900} fontSize={16}>
          Edit
        </Typography>
      </BottomBox>
    </DialogBox>
  );
};

export default AutomationDialogContent;
