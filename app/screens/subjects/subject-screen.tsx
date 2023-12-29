import { useRoute } from '@react-navigation/native';
import { Header } from 'app/components';
import { SCREENS } from 'app/constants';
import { goBack } from 'app/navigators';

import { SubjectInfo } from './subject-info';

export const SubjectScreen = () => {
  const route = useRoute();
  const subject = (route.params as { subject: string }).subject;

  const handleLeftPress = () => {
    goBack(SCREENS.Home, { screen: 'Subjects' });
  };

  return (
    <>
      <Header
        leftIcon="caretLeft"
        onLeftPress={handleLeftPress}
        title={subject}
        backgroundColor="$backgroundLight100"
      />
      <SubjectInfo />
    </>
  );
};
