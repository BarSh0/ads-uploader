import { Badge, Stack, Switch, Typography } from '@mui/material';
import React from 'react';
import NewAutomationContext from '../../../../contexts/NewAutomationContext';
import platforms from '../../../../data/Platforms';
import { SmallAvatar, StyledAvatar, StyledCard } from '../../styles';

const AutomationDialogStepThree = (setErrorMessage: any) => {
  const { newAutomation } = React.useContext(NewAutomationContext);
  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      <StyledCard>
        <Stack gap={5} marginTop={'1rem'}>
          <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'space-between'}>
            <Typography fontWeight={600}>{'Off'}</Typography>
            <Switch checked={false} color="success" />
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
                    src={platforms.find((p) => p.name === newAutomation.platform)?.icon}
                  />
                }
              >
                <StyledAvatar variant="rounded" sx={{ width: 50, height: 50 }} src={newAutomation.page.picture} />
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
                {newAutomation.page.name}
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
                {newAutomation.name || 'Campaign Name'}
              </Typography>
            </span>
          </Stack>
        </Stack>
      </StyledCard>
    </Stack>
  );
};

export default AutomationDialogStepThree;
