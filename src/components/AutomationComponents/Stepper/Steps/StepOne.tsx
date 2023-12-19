import { Stack } from '@mui/material';
import React, { useEffect } from 'react';
import NewAutomationContext from '../../../../contexts/NewAutomationContext';
import AdAccountsFormList from '../../../FormLists/AdAccountsFormList';
import PagesFormList from '../../../FormLists/PagesFormList';
import PlatformsFormList from '../../../FormLists/PlatformsFormList';

export type AutomationDialogStepOneProps = {
  setErrorMessage: Function;
};

const AutomationDialogStepOne = ({ setErrorMessage }: AutomationDialogStepOneProps) => {
  const { newAutomation } = React.useContext(NewAutomationContext);

  useEffect(() => {
    let error = '';
    if (!newAutomation.platform) {
      error = 'Please select a platform';
    } else if (!newAutomation.adAccount) {
      error = 'Please select an ad account';
    } else if (!newAutomation.page) {
      error = 'Please select a page';
    }
    setErrorMessage(error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newAutomation]);

  return (
    <Stack flexDirection={'row'} gap={2} justifyContent={'center'}>
      <PlatformsFormList />
      <AdAccountsFormList />
      <PagesFormList />
    </Stack>
  );
};

export default AutomationDialogStepOne;
