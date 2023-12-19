import { createContext } from 'react';
import { MutationFunction, useMutation, useQuery, useQueryClient } from 'react-query';
import { automationService } from '../services/automation.service';
import { handleGetRequest } from '../utils/api/axios';

const AutomationsContext = createContext({} as any);

export function AutomationsProvider({ children }: any) {
  const queryClient = useQueryClient();
  const {
    data: automationsArray,
    error,
    isLoading,
  } = useQuery('automations', () => handleGetRequest('/automations'), {
    refetchOnWindowFocus: false,
  });

  const handleStatusChange: MutationFunction<void, [string, string, boolean]> = async (variables) => {
    const [automationId, platform, checked] = variables;
    await automationService.handleToggleStatusNew(automationId, platform, !checked);
  };

  const changeStatus = useMutation<void, unknown, [string, string, boolean]>(handleStatusChange, {
    onSuccess: () => {
      queryClient.invalidateQueries('automations');
    },
  });

  const value = {
    changeStatus,
    automationsArray,
  };

  if (error) console.log(error);

  return <AutomationsContext.Provider value={value}>{!isLoading && children}</AutomationsContext.Provider>;
}

export default AutomationsContext;
