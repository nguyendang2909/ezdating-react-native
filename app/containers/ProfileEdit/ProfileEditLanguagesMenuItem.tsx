import { FontAwesome } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { useAppSelector } from 'app/hooks';
import React from 'react';

const getLanguages = (languages: string[]): string => {
  let text = '';
  const languagesLength = languages.length;

  for (let i = 0; i < languagesLength; i += 1) {
    const language = languages[i];
    if (language[i + 1]) {
      text += `, ${language}`;
    } else {
      text += language;
    }
  }

  return text;
};

export const ProfileEditLanguagesMenuItem: React.FC = () => {
  const languages = useAppSelector(state => state.app.profile?.languages);
  return (
    <>
      <MenuItem
        title={languages ? getLanguages(languages) : undefined}
        titleTx="Add languages"
        leftIcon={<FontAwesome name="language" />}
      />
    </>
  );
};
