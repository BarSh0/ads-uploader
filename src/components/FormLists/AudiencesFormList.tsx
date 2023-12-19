import React from 'react';
import { useContext } from 'react';
import NewAutomationContext from '../../contexts/NewAutomationContext';
import BasicList from '../Common/BasicListv2';
import BasicListItem from '../Common/BasicListItemv2';
import { Button } from '@mui/material';

const AudiencesFormList = () => {
  const { newAutomation, insertMultipleValues, removeMultipleValues } = useContext(NewAutomationContext);
  const handleSelect = (audience: any) => {
    insertMultipleValues('audience', audience);
  };
  const handleUnSelect = (audience: any) => {
    removeMultipleValues('audience', audience);
  };

  const handleCreateAudience = () => {
    const url = 'https://adsmanager.facebook.com/adsmanager/manage';
    window.open(url, '_blank');
  };

  return (
    <BasicList title="audience" label="audience" isMultySelect={true} searcher bg>
      {newAutomation.adAccount ? (
        newAutomation.adAccount.saved_audiences ? (
          newAutomation.adAccount.saved_audiences?.data.map((audience: any, index: number) => {
            return (
              <BasicListItem
                key={audience.name}
                name={audience.name}
                value={audience}
                icon={audience.icon}
                isSelected={newAutomation['audience']?.includes(audience)}
                select={handleSelect}
                unSelect={handleUnSelect}
              />
            );
          })
        ) : (
          <div
            style={{
              textTransform: 'uppercase',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              borderRadius: '0.5rem',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <h3>There is no audiences</h3>
            <Button onClick={handleCreateAudience}> Create Audience</Button>
          </div>
        )
      ) : null}
    </BasicList>
  );
};

export default AudiencesFormList;
