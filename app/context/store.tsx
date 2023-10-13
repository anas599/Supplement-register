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
  selectedProducts: any[];
  setSelectedProducts: Dispatch<SetStateAction<any[]>>;
}
const GlobalContext = createContext<ContextProps>({
  datax: [],
  setDatax: (): DataType[] => [],
  selectedProducts: [],
  setSelectedProducts: (): any[] => [],
});
export const GlobalContextProvider = ({ children }: any) => {
  const [datax, setDatax] = useState<DataType[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<any[]>([]);

  return (
    <GlobalContext.Provider
      value={{ datax, setDatax, selectedProducts, setSelectedProducts }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
export const useGlobalContext = () => useContext(GlobalContext);
