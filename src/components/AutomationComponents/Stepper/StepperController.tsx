import React from 'react';
import TwitterStep from '../../Common/TwitterStep';
import FacebookStep from '../../Common/FacebookStep';

const StepperController = (platform: any) => {
  switch (platform) {
    case 'facebook':
      return <FacebookStep />;
    case 'twitter':
      return <TwitterStep />;
    case 'instagram':
      return <InstagramStepper />;
    // Add more cases for other platforms
    default:
      return null; // Default case, return null or some default content
  }
};

const InstagramStepper = () => {
  return <div>Instagram Stepper</div>;
};

export default StepperController;
