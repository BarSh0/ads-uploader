import { Badge, Box, LinearProgress, Stack, Typography } from '@mui/material';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { IAutomation } from '../../constants/types/automation.types';
import platforms from '../../data/Platforms';
import { automationService } from '../../services/automation.service';
import colors from '../../style/colors';
import { timeUtils } from '../../utils/time.utils';
import Dialog from '../Common/Dialog';
import AutomationDialogContent from './AutomationDialogContent';
import { SmallAvatar, StyledAvatar, StyledCard } from './styles';

const AutomationCard = (automation: IAutomation) => {
  const isActive = automation.status === 'ACTIVE';
  const isFailed = automation.status === 'FAILED';
  const backgroundColor = isFailed ? colors.red : isActive ? colors.green : '#fff';
  const fontColor = isFailed ? colors.red : isActive ? colors.green : '#000';
  const [open, setOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const changeStatus = useMutation(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      return automationService.handleToggleStatusNew(automation._id, automation.platform, !event.target.checked);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('automations');
      },
    }
  );

  const handleOpen = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.tagName !== 'INPUT') setOpen(true);
  };

  return (
    <>
      <StyledCard
        sx={{ outlineColor: backgroundColor, outlineWidth: '2px', outlineStyle: 'solid' }}
        onClick={(e) => handleOpen(e)}
      >
        {changeStatus.isLoading && (
          <Box sx={{ width: '9rem', position: 'absolute' }}>
            <LinearProgress />
          </Box>
        )}
        <Stack gap={5} marginTop={'1rem'}>
          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography color={fontColor} fontWeight={600}>
              {automation.status}
            </Typography>
            <Switch checked={isActive} onChange={(e) => changeStatus.mutateAsync(e)} color="success" />
          </Stack>
          <Stack gap={1}>
            <span>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <SmallAvatar
                    alt="Remy Sharp"
                    sx={{ background: 'none' }}
                    src={platforms.find((p) => p.name === automation.page.platform)?.icon}
                  />
                }
              >
                <StyledAvatar variant="rounded" sx={{ width: 50, height: 50 }} src={automation.page.picture} />
              </Badge>
            </span>
            <span>
              <Typography
                fontWeight={900}
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: '10rem',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {automation.page.name}
              </Typography>
              <Typography
                fontSize={16}
                fontWeight={600}
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: '10rem',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {automation.campaign.name}
              </Typography>
            </span>
            <Typography fontSize={12}>Last Event: {timeUtils.getTimeElapsed(automation.lastOperation)}</Typography>
          </Stack>
        </Stack>
      </StyledCard>
      <Dialog open={open} setOpen={setOpen} unShowButtons={true}>
        <AutomationDialogContent {...automation} />
      </Dialog>
    </>
  );
};

export default AutomationCard;
