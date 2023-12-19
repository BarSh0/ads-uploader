import { Stack } from '@mui/material';
import { useContext } from 'react';
import NewAutomationContext from '../../../../contexts/NewAutomationContext';
import StepperController from '../StepperController';

const AutomationDialogStepTwo = (setErrorMessage: any) => {
  const { newAutomation } = useContext(NewAutomationContext);

  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      {StepperController(newAutomation.platform)}
    </Stack>
  );
};

export default AutomationDialogStepTwo;
