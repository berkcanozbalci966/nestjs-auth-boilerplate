import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";

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
  const router = useRouter();
  const [language, setLanguage] = useState(router.locale as string);

  useEffect(() => {
    setLanguage(router?.locale as string);
  }, [router?.locale]);

  return (
    <GeneralContext.Provider
      value={{ generalState: { firstRender }, setFirstRender, language }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
