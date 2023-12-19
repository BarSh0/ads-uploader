/* eslint-disable @typescript-eslint/no-unused-vars */
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ReorderIcon from '@mui/icons-material/Reorder';
import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useContext, useState } from 'react';
import { AutomationCard, AutomationListItem, NewAutomationButton } from '../components/AutomationComponents';
import SearchBar from '../components/SearchBar';
import { IAutomation } from '../constants/types/automation.types';
import AutomationsContext from '../contexts/AutomationsContext';
import { NewAutomationProvider } from '../contexts/NewAutomationContext';
import platforms from '../data/Platforms';
import { FilterBar, StyledSocialAvatar } from './styles';

const AutomationsPage = () => {
  // const { automationsArray } = useContext(AutomationsContext);
  const automationsArray = [] as IAutomation[]; // TODO: replace with the above line when automationsArray is ready
  const [selectedPlatform, setSelectedPlatform] = useState<string[]>([]);
  const [filterList, setFilterList] = useState<string[]>([]);
  const [displayOption, setDisplayOption] = useState<'list' | 'cards'>('cards');
  const [searchData, setSearchData] = useState<string[]>([]);

  const handleClick = (platformName: string) => {
    const updatedSelectedPlatform = selectedPlatform.includes(platformName)
      ? selectedPlatform.filter((platform) => platform !== platformName)
      : [...selectedPlatform, platformName];

    setSelectedPlatform(updatedSelectedPlatform);

    const filteredPlatformNames =
      updatedSelectedPlatform.length === 0
        ? automationsArray.map((automation: IAutomation) => automation.page.name)
        : automationsArray
            .filter((automation: IAutomation) => updatedSelectedPlatform.includes(automation.page.platform))
            .map((automation: IAutomation) => automation.page.name);

    setSearchData(filteredPlatformNames);
  };

  const filteredAutomations = automationsArray.filter((automation: IAutomation) => {
    const isNameIncluded = filterList.includes(automation.page.name);
    const isPlatformSelected = selectedPlatform.length === 0 || selectedPlatform.includes(automation.page.platform);
    return isNameIncluded || (!filterList.length && isPlatformSelected);
  });

  const renderAutomations = () => {
    if (displayOption === 'list') {
      return filteredAutomations.map((automation: IAutomation) => (
        <AutomationListItem key={automation._id} {...automation} />
      ));
    } else if (displayOption === 'cards') {
      return filteredAutomations.map((automation: IAutomation) => (
        <AutomationCard key={automation._id} {...automation} />
      ));
    }
    return null;
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment === null) return;
    setDisplayOption(newAlignment as 'list' | 'cards');
  };

  return (
    <NewAutomationProvider>
      <FilterBar>
        <SearchBar
          searchData={automationsArray.map((automation: IAutomation) => automation.page?.name || 'No Name')}
          setter={setFilterList}
        />
        <Stack direction={'row'} gap={{ xs: 0.5, sm: 1, md: 2 }} justifyContent={'center'}>
          {platforms.map((platform, index) => (
            <StyledSocialAvatar
              key={platform.name + index}
              variant="rounded"
              src={platform.icon}
              alt={platform.name}
              sx={{
                width: { xs: 30, sm: 45, md: 50 },
                height: { xs: 30, sm: 45, md: 50 },
                opacity: selectedPlatform.includes(platform.name) || selectedPlatform.length === 0 ? 1 : 0.5,
              }}
              onClick={() => handleClick(platform.name)}
            />
          ))}
        </Stack>
        <ToggleButtonGroup
          value={displayOption}
          exclusive
          onChange={handleChange}
          aria-label="display options"
          sx={{ alignItems: 'center', justifyContent: 'flex-end' }}
        >
          <ToggleButton value="list">
            <ReorderIcon />
          </ToggleButton>
          <ToggleButton value="cards">
            <DashboardCustomizeIcon />
          </ToggleButton>
        </ToggleButtonGroup>
      </FilterBar>
      <AutomationsStack flexDirection={displayOption === 'list' ? 'column' : 'row'}>
        <NewAutomationButton diplayOpt={displayOption} />
        {renderAutomations()}
      </AutomationsStack>
    </NewAutomationProvider>
  );
};

const AutomationsStack = styled(Stack)`
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: flex-start;
  box-shadow: inset 0 5px 10px -10px black;
  background: linear-gradient(180deg, #130ead10 50%, rgba(0, 0, 0, 0) 100%);
  padding: 1rem;
  margin-top: 10px;
  height: 70vh;
  overflow: auto;
  border-radius: 0.5rem;
`;

export default AutomationsPage;
