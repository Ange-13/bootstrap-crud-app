import React, { useState } from 'react';
import i18n from 'i18next';
import PublicIcon from '@mui/icons-material/Public';


const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const changeLanguage = (lang: string | undefined) => {
    i18n.changeLanguage(lang);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', float: 'right', margin: '2px', width:'40px'}}>
     
       <PublicIcon onClick={toggleDropdown} style={{fontSize:'40px'}}></PublicIcon>
    
      {isOpen && (
        <div style={{ position: 'absolute', right: 0, backgroundColor: 'none', border: 'none', zIndex: 1,display:'flex', flexWrap:'wrap'}}>
          <button style={{ border: 'none', cursor: 'pointer', background: 'none', display: 'block' }} onClick={() => changeLanguage('en')}>
            <span >
              <img src="https://flagcdn.com/24x18/us.png" alt="English" style={{marginRight:'5px'}}/>
             
            </span>
          </button>
          <button style={{ border: 'none', cursor: 'pointer', background: 'none', display: 'block', marginRight:'3px'}} onClick={() => changeLanguage('mk')}>
            <span>
              <img src="https://flagcdn.com/24x18/mk.png" alt="MK" style={{marginRight:'5px'}} />
              
            </span>
          </button>
          <button style={{ border: 'none', cursor: 'pointer', background: 'none', display: 'block' }} onClick={() => changeLanguage('de')}>
            <span>
              <img src="https://flagcdn.com/24x18/de.png" alt="DE" style={{marginRight:'5px'}} />
             
            </span>
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageDropdown;