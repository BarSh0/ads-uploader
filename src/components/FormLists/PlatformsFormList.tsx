import { isEqual } from 'lodash';
import { useContext } from 'react';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import platforms from '../../data/Platforms';
import useAuth, { IUser } from '../../hooks/useAuth';
import BasicListItem from '../Common/BasicListItemv2';
import BasicList from '../Common/BasicListv2';

const PlatformsFormList = () => {
  const { newAutomation, insertValue, removeValue } = useContext(NewAutomationContext);
  const { user } = useAuth();

  return (
    <BasicList title="platforms" label="platform" bg>
      {platforms.map((platform, index) => {
        const platformName = platform.name as keyof IUser['platforms'];
        const isConnect = user?.platforms[platformName] ? user?.platforms[platformName].isConnect : false;
        return (
          <BasicListItem
            key={platform.name}
            name={platform.name}
            icon={platform.icon}
            isDisabled={!isConnect}
            isSelected={isEqual(newAutomation['platform'], platform.name)}
            select={() => insertValue('platform', platform.name)}
            unSelect={() => removeValue('platform', platform.name)}
          />
        );
      })}
    </BasicList>
  );
};

export default PlatformsFormList;
