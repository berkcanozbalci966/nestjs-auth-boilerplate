import { createContext, ReactNode, useState, useEffect } from "react";

type Provider = {
  children: ReactNode;
};

type GeneralContextType = {
  setFirstRender: (state: boolean) => void;
  generalState: {
    firstRender: boolean;
  };
  language: string;
};

const initialValue = {
  generalState: {
    firstRender: true,
  },
  language: "tr",
};

const GeneralContext = createContext<GeneralContextType>({
  ...initialValue,
} as GeneralContextType);

export const GeneralContextProvider: React.FC<Provider> = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);
  const [language, setLanguage] = useState("tr");

  return (
    <GeneralContext.Provider
      value={{ generalState: { firstRender }, setFirstRender, language }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
