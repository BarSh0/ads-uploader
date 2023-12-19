import { IAutomation } from './automation.types';
import { IPage } from './page.types';

type IAdAccount = {
  adAccountId: string;
  platform: string;
  name: string;
  picture?: string;
  accessToken: string;
  pages: IPage[];
  automations: IAutomation[];
};

export const adAccounts = [
  {
    name: 'test',
    picture: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    adAccountId: '123',
    platform: 'Facebook',
    pages: [
      {
        name: 'test',
        picture: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        pageId: '123',
        platform: 'Facebook',
      },
      {
        name: 'test2',
        picture: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
        pageId: '123',
        platform: 'Facebook',
      },
    ],
    automations: [],
    accessToken: '123',
  },
];

export type { IAdAccount };
