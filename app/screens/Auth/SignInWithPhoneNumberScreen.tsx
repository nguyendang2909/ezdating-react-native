import { Box, Heading, Text, View } from '@gluestack-ui/themed';
import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { BackIconButton } from 'app/containers/IconButton/BackIconButton';
import { useMessages } from 'app/hooks';
import { textAlignCenter } from 'app/styles';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';

import { AppStackScreenProps } from '../../navigators';

type FCProps = AppStackScreenProps<'SignInWithPhoneNumber'>;

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { formatMessage } = useMessages();
  return (
    <>
      <SafeAreaView></SafeAreaView>

      <Box flex={1}>
        <View px={24} py={24}>
          <View>
            <BackIconButton></BackIconButton>
          </View>
          <Heading size="2xl">{formatMessage('What is your phone number?')}</Heading>
          <Text>{formatMessage('Please input the phone number to sign in')}</Text>
        </View>

        <View mt={24} flexGrow={1}>
          <View px={24}>
            <SignInWithPhoneNumberForm />
          </View>
        </View>

        <View>
          <Text style={textAlignCenter}>{formatMessage('AppName')}</Text>
        </View>
      </Box>

      <SafeAreaView></SafeAreaView>
    </>
  );
};
