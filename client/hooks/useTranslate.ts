import { useContext } from "react";
import GeneralContext from "../context/GeneralProvider";
import tr from "../i18/tr/tr";
import en from "../i18/en/en-US";

const useTranslate = (module: string) => {
  const { language } = useContext(GeneralContext);
  const trModule = (tr as any)[module];
  const enModule = (en as any)[module];

  return (word: string) => {
    try {
      return (
        (language == "tr" ? trModule[word] : (enModule as any)[word]) || word
      );
    } catch (error) {
      return word;
    }
  };
};

export default useTranslate;
