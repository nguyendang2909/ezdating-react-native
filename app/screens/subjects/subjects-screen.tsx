import { StatusBar } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Header } from 'app/components';

import { SubjectsWrapper } from './subject-profiles-wrapper';

export const SubjectsScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <StatusBar barStyle="default" />
      <Header
        title="Subjects"
        // rightIcon="settings"
        // onRightPress={() => {
        //   navigate.navigate(SCREENS.DATING_NEARBY_FILTER);
        // }}
      />
      <SubjectsWrapper></SubjectsWrapper>
    </>
  );
};
