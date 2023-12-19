import { IPage } from './page.types';

type AutomationStatus = 'PENDING' | 'ACTIVE' | 'PAUSED' | 'FAILED' | 'ARCHIVED';
type AmountType = 'hours' | 'days' | 'weeks' | 'months';

type IAutomation = {
  _id: string;
  adAccountId?: string;
  platform: string;
  campaign: { id: string; name: string };
  audiences: [{ id: string; name: string }];
  dailyBudget: number;
  objective: string;
  postTypes: string[];
  page: IPage;
  user: string;
  posts?: string[];
  status?: AutomationStatus;
  lastOperation: Date;
  rules: [
    {
      id: string;
      name: string;
      adPauseTime: number;
    }
  ];
};

export type { IAutomation };
