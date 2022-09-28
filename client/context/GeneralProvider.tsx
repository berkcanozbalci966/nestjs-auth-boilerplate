import { createContext, ReactNode, useState, useEffect } from "react";

type Provider = {
  children: ReactNode;
};

type GeneralContextType = {
  setFirstRender: (state: boolean) => void;
  generalState: {
    firstRender: boolean;
  };
};

const initialValue = {
  firstRender: true,
};

const GeneralContext = createContext<GeneralContextType>({
  generalState: initialValue,
} as GeneralContextType);

export const GeneralContextProvider: React.FC<Provider> = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);

  return (
    <GeneralContext.Provider
      value={{ generalState: { firstRender }, setFirstRender }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
