import React, { useState } from 'react';
import Store from './StoreContext';

export const StoreProvider = ({ children }) => {;
  const [data, setData] = useState({});

  const handleSetData = (data) => {
    setData((prev) => ({ ...prev, ...data }));
  };
  const resetData = () => {
    setData({});
  };

  return (
    <Store.Provider value={{ data, handleSetData, resetData }}>
      {children}
    </Store.Provider>
  );
};
