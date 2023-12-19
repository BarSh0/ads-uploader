import facebookSettings from './facebook';
import instagramSettings from './instagram';
import linkedinSettings from './linkedin';
import tiktokSettings from './tiktok';
import twitterSettings from './twitter';

export type platformSettings = {
  name: string;
  icon: string;
  url: string;
  isConnected?: boolean;
  connect?: () => any;
  disconnect?: () => any;
};

const platforms = [facebookSettings, linkedinSettings, twitterSettings, instagramSettings, tiktokSettings];

export default platforms;
