import { Box, Button, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import React from 'react';
import NewAutomationContext from '../../../contexts/NewAutomationContext';
import LinearWithValueLabel from '../../Common/ProggressBar';
import AutomationDialogStepOne from './Steps/StepOne';
import AutomationDialogStepThree from './Steps/StepThree';
import AutomationDialogStepTwo from './Steps/StepTwo';
import ModeSelect from './Steps/ModeSelectStep';
import styled from 'styled-components';
import SimpleCreation from './SimpleCreation';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useMutation, useQueryClient } from 'react-query';
import { handlePostRequest } from '../../../utils/api/axios';
const StyledBox = styled(Box)`
  display: grid;
  grid-template-rows: 1fr 10fr 1fr;
  align-items: center;
`;

const steps = ['Select a Profile', 'Select Mode', 'Set the properties', 'Create a new automation'];

const NewAutomationStepper = () => {
  const queryClient = useQueryClient();

  const { newAutomation } = React.useContext(NewAutomationContext);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isAdvancedMode, setIsAdvancedMode] = React.useState(false);

  const { mutate: postAutomation, isLoading } = useMutation(
    () =>
      handlePostRequest(
        `/${newAutomation.platform}/${newAutomation.adAccount.id}/${isAdvancedMode ? 'campaigns' : 'simple'}`,
        newAutomation
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('automations');
      },
    }
  );

  const isStepOptional = (step: number) => {
    return step === 4;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    if (errorMessage) {
      window.alert(errorMessage);
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleFinish = () => {
    if (Object.values(newAutomation).every((x) => x === null || x === '')) {
      window.alert(`You must fill all the fields`);
      return;
    }
    handleNext();
    postAutomation();
  };
  return (
    <StyledBox>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Stack alignItems={'center'} gap={'1rem'}>
            {!isLoading ? (
              <>
                <CheckCircleOutlineIcon sx={{ fontSize: '10rem' }} />
                <Typography sx={{ mt: 2, mb: 1 }}>All steps completed - you&apos;re finished</Typography>
              </>
            ) : (
              <LinearWithValueLabel />
            )}
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant="contained" onClick={handleReset}>
              Reset
            </Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {activeStep === 0 && <AutomationDialogStepOne setErrorMessage={setErrorMessage} />}
          {activeStep === 1 && <ModeSelect setIsAdvancedMode={setIsAdvancedMode} isAdvancedMode={isAdvancedMode} />}
          {activeStep === 2 && isAdvancedMode && <AutomationDialogStepTwo setErrorMessage={setErrorMessage} />}
          {activeStep === 2 && !isAdvancedMode && <SimpleCreation />}
          {activeStep === 3 && <AutomationDialogStepThree setErrorMessage={setErrorMessage} />}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button variant="contained" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {isStepOptional(activeStep) && (
              <Button variant="contained" onClick={handleSkip} sx={{ mr: 1 }}>
                Skip
              </Button>
            )}
            <Button variant="contained" onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </StyledBox>
  );
};

export default NewAutomationStepper;
