import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <header style={{float: "right", margin: "2px"}}>
        <button style={{border: "none", cursor: "pointer", background: "none"}} onClick={() => i18n.changeLanguage("en")}>
          <span>
            <img src="https://flagcdn.com/24x18/us.png" alt="EN" />
          </span>
        </button>
        <button style={{border: "none", cursor: "pointer", background: "none"}} onClick={() => i18n.changeLanguage("mk")}>
          <span>
            <img src="https://flagcdn.com/24x18/mk.png" alt="MK" />
          </span>
        </button>
          <button style={{border: "none", cursor: "pointer", background: "none"}} onClick={() => i18n.changeLanguage("de")}>
          <span>
            <img src="https://flagcdn.com/24x18/de.png" alt="DE" />
          </span>
        </button>
      </header>
  );
};

export default LanguageSwitcher;