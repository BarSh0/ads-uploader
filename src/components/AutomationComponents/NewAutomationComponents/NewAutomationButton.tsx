import { Typography } from '@mui/material';
import { useState } from 'react';
import Dialog from '../../Common/Dialog';
import NewAutomationStepper from '../Stepper/NewAutomationStepper';
import { NewAutomationCard, NewAutomationListItem } from '../styles';

const NewAutomationButton = ({ diplayOpt }: any) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  if (diplayOpt === 'list')
    return (
      <>
        <NewAutomationListItem onClick={handleClickOpen}>
          <Typography fontWeight={600} fontSize={'2rem'}>
            +
          </Typography>
          <Typography fontWeight={600}>New Automation</Typography>
        </NewAutomationListItem>
        <Dialog
          open={open}
          setOpen={setOpen}
          unShowButtons={true}
          title={'New Automation'}
          description={'please select the option above'}
        >
          <NewAutomationStepper />
        </Dialog>
      </>
    );

  if (diplayOpt === 'cards')
    return (
      <>
        <NewAutomationCard onClick={handleClickOpen} justifyContent={'space-between'}>
          <Typography fontWeight={600} fontSize={'3rem'}>
            +
          </Typography>
          <Typography fontWeight={600} fontSize={'1.5rem'}>
            New Automation
          </Typography>
        </NewAutomationCard>
        <Dialog
          open={open}
          setOpen={setOpen}
          unShowButtons={true}
          title={'New Automation'}
          description={'please select the option above'}
        >
          <NewAutomationStepper />
        </Dialog>
      </>
    );

  return null;
};
export default NewAutomationButton;
