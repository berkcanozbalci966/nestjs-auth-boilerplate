import { Dropdown } from "flowbite-react";
import { useEffect, useRef } from "react";
const LanguageSwitcher = () => {
  const dropdown = useRef(null);
  useEffect(() => {
    console.log(dropdown);
  }, [dropdown]);

  return (
    <div className="ml-2">
      <Dropdown
        arrowIcon={false}
        inline={true}
        size="sm"
        label={
          <img
            src={
              true
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png"
                : "https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
            }
            alt=""
            width={30}
            className="mx-auto"
          />
        }
        ref={dropdown}
      >
        <Dropdown.Item>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/4/42/Flag_of_the_United_Kingdom.png"
            }
            alt=""
            width={30}
            className="mx-auto"
          />
        </Dropdown.Item>
        <Dropdown.Item>
          <img
            src={
              "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Flag_of_Turkey.svg/800px-Flag_of_Turkey.svg.png"
            }
            alt=""
            width={30}
            className="mx-auto"
          />
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default LanguageSwitcher;
