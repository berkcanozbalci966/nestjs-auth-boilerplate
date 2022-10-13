import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
const LanguageSwitcher = () => {
  const dropdown = useRef<HTMLDivElement>(null);

  const { push, asPath, pathname, locale } = useRouter();

  console.log(pathname, locale);

  function switchLocale(localeString: string) {
    if (localeString != locale) {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }

      return push({ pathname }, asPath, { locale: localeString });
    }
  }

  return (
    <div className="dropdown dropdown-end w-17" ref={dropdown}>
      <label tabIndex={0} className="btn btn-link">
        {
          <img
            src={
              locale == "tr"
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png"
                : "https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
            }
            alt=""
            width={30}
          />
        }
      </label>
      <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100">
        <li onClick={() => switchLocale("tr")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png"
            alt=""
            width={80}
          />
        </li>
        <li onClick={() => switchLocale("en-US")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
            alt=""
            width={80}
          />
        </li>
      </ul>
    </div>
  );
};

export default LanguageSwitcher;
