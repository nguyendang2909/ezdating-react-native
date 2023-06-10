import { useNavigation } from '@react-navigation/native';
import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { translate } from 'app/i18n';
import {
  flexGrow,
  heightFull,
  marginTop,
  paddingHorizontal,
  paddingVertical,
  textAlignCenter,
} from 'app/styles';
import { Box, Heading, Text, View } from 'native-base';
import React, { FC } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { AppStackScreenProps } from '../navigators';
import { spacing } from '../theme';

interface FCProps extends AppStackScreenProps<'SignInWithPhoneNumber'> {}

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { goBack } = useNavigation();

  return (
    <>
      <Box safeAreaTop />
      <Box safeAreaBottom style={heightFull}>
        <View>
          <AntDesign name="back"></AntDesign>
        </View>
        <View
          style={[paddingHorizontal(spacing.lg), paddingVertical(spacing.lg)]}
        >
          <Heading size="2xl">
            {translate('What is your w?', { w: translate('phone number') })}
          </Heading>
          <Text>{translate('Please input the phone number to sign in')}</Text>
        </View>

        <View style={[marginTop(spacing.lg), flexGrow]}>
          <View style={paddingHorizontal(spacing.lg)}>
            <SignInWithPhoneNumberForm />
          </View>
        </View>
        <View>
          <Text style={textAlignCenter}>{translate('EZDating')}</Text>
        </View>
      </Box>
    </>
  );
};
