import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Badge, Stack, Typography } from '@mui/material';
import Dialog from '../Common/Dialog';
import IconButton from '@mui/material/IconButton';
import Switch from '@mui/material/Switch';
import * as React from 'react';
import { IAutomation } from '../../constants/types/automation.types';
import platforms from '../../data/Platforms';
import { ListItem, SmallAvatar, StyledAvatar } from './styles';
import colors from '../../style/colors';
import { useMutation, useQueryClient } from 'react-query';
import { automationService } from '../../services/automation.service';
import AutomationDialogContent from './AutomationDialogContent';
import { timeUtils } from '../../utils/time.utils';

const AutomationListItem = (automation: IAutomation) => {
  const isActive = automation.status === 'ACTIVE';
  const isFailed = automation.status === 'FAILED';
  const backgroundColor = isFailed ? colors.red : isActive ? colors.green : '';
  const fontColor = isActive ? '#fff' : '#000';
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
      <ListItem sx={{ background: backgroundColor }} onClick={(e) => handleOpen(e)}>
        <Stack flexDirection={'row'} alignItems="center" gap={1}>
          <Typography color={fontColor} fontWeight={600}>
            Off
          </Typography>
          <Switch checked={isActive} onChange={(e) => changeStatus.mutateAsync(e)} />
          <span>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              badgeContent={
                <SmallAvatar alt="Remy Sharp" src={platforms.find((p) => p.name === automation.page.platform)?.icon} />
              }
            >
              <StyledAvatar variant="rounded" sx={{ width: 50, height: 50 }} src={automation.page.picture} />
            </Badge>
          </span>
          <Typography color={fontColor} fontWeight={900}>
            {automation.page.name}
          </Typography>
          <Typography color={fontColor} fontSize={12}>
            Last Event: {timeUtils.getTimeElapsed(automation.lastOperation)}
          </Typography>
        </Stack>
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      </ListItem>
      <Dialog open={open} setOpen={setOpen} unShowButtons={true}>
        <AutomationDialogContent {...automation} />
      </Dialog>
    </>
  );
};
export default AutomationListItem;
