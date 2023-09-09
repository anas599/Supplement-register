'use client';

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

type DataType = {
  username: string;
  userpic: string;
  content: string;
  createdAt: string;
};

interface ContextProps {
  datax: DataType[];
  setDatax: Dispatch<SetStateAction<DataType[]>>;
}

const GlobalContext = createContext<ContextProps>({
  datax: [],
  setDatax: (): DataType[] => [],
});

export const GlobalContextProvider = ({ children }: any) => {
  const [datax, setDatax] = useState<DataType[]>([]);

  return (
    <GlobalContext.Provider value={{ datax, setDatax }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
