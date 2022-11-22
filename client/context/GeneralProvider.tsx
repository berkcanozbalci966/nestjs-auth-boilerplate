import { createContext, ReactNode, useState, useEffect } from "react";
import { useRouter } from "next/router";

type Provider = {
  children: ReactNode;
};

type GeneralContextType = {
  setSelectedCategory: (state: number) => void;

  language: string;
  selectedCategory: number;
};

const initialValue = {
  language: "tr",
};

const GeneralContext = createContext<GeneralContextType>({
  ...initialValue,
} as GeneralContextType);

export const GeneralContextProvider: React.FC<Provider> = ({ children }) => {
  const [firstRender, setFirstRender] = useState(true);
  const router = useRouter();
  const [language, setLanguage] = useState(router.locale as string);
  const [selectedCategory, setSelectedCategory] = useState(0);

  useEffect(() => {
    setLanguage(router?.locale as string);
  }, [router?.locale]);

  return (
    <GeneralContext.Provider
      value={{
        language,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
