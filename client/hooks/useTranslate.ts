import trJson from "../i18/tr/tr";
import enJson from "../i18/en/en-US";

type TranslateObject<T> = {
  [Property in keyof T]: TranslateObject<T[Property]>;
};

type NestedKeyOrCurrentKey<T> = keyof T extends {} ? T[keyof T] : keyof T;

type TranslateObjectWithModule<T> = keyof T extends {}
  ? NestedKeyOrCurrentKey<TranslateObject<T>>
  : TranslateObject<T>;

export const useTranslate = (module?: keyof TranslateObject<typeof trJson>) => {
  const currentLang = JSON.parse(localStorage.getItem("lng") as string);
  1;
  const tr = module
    ? (trJson[module] as TranslateObjectWithModule<typeof trJson>)
    : (trJson as TranslateObject<typeof trJson>);

  const en = module
    ? (enJson[module] as TranslateObjectWithModule<typeof enJson>)
    : (enJson as TranslateObject<typeof enJson>);

  return (
    word: string
    // word: keyof typeof trJson extends {}
    //   ? keyof NestedKeyOrCurrentKey<TranslateObject<typeof trJson>>
    //   : keyof TranslateObject<typeof trJson> & string
  ) => {
    try {
      return (
        (currentLang == "tr"
          ? (tr as TranslateObjectWithModule<typeof tr>)[word]
          : (en as TranslateObjectWithModule<typeof tr>)[word]) || word
      );
    } catch (error) {
      return word;
    }
  };
};
