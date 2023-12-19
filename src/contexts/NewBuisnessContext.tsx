import React, { createContext, useState } from 'react';

type NewBuisnessForm = {
  [key: string]: any;
  adAccount: { id: string; name: string };
  page: { pageId: string; name: string; picture: string };
  campaign: any;
};

const NewBuisnessContext = createContext({} as any);

export function NewBuisnessProvider({ children }: any) {
  const [newBuisness, setNewBuisness] = useState({} as NewBuisnessForm);

  const insertValue = (key: string, value: string) => {
    setNewBuisness({ ...newBuisness, [key]: value });
  };

  const insertValues = (values: any) => {
    setNewBuisness({ ...newBuisness, ...values });
  };

  const removeValue = (key: string) => {
    const { [key]: value, ...rest } = newBuisness;
    setNewBuisness(rest as NewBuisnessForm);
    return;
  };

  React.useEffect(() => {
    console.log(newBuisness);
  }, [newBuisness]);

  return (
    <NewBuisnessContext.Provider
      value={{
        newBuisness,
        insertValue,
        insertValues,
        removeValue,
      }}
    >
      {children}
    </NewBuisnessContext.Provider>
  );
}

export default NewBuisnessContext;
