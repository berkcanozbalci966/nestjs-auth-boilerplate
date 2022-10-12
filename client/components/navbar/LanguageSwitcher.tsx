import { useEffect, useRef } from "react";
const LanguageSwitcher = () => {
  const dropdown = useRef(null);
  useEffect(() => {
    console.log(dropdown);
  }, [dropdown]);

  return (
    <div className="ml-2">
      <h1>Test</h1>
    </div>
  );
};

export default LanguageSwitcher;
