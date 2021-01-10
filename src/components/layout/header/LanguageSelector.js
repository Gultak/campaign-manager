import React, { useContext } from 'react';
import { Dropdown, Flag } from "semantic-ui-react";
import { languages } from "../../../lang/languages";
import { LanguageContext } from '../../../constants/contexts';

export function LanguageSelector() {
  const language = useContext(LanguageContext);

  return (
    <Dropdown trigger={<Flag name={languages.items[language.language].flag} className='header-flag' />} icon={null} pointing='top right'>
      <Dropdown.Menu>
        {Object.keys(languages.items).map(lang =>
          <Dropdown.Item key={lang} active={lang === language.language} disabled={languages.items[lang].disabled} onClick={() => language.switchLanguage(lang)}>
            <Flag name={languages.items[lang].flag} />{languages.items[lang].name[language.language]}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>);
}
