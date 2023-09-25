import { Box, Heading, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { SignInWithPhoneNumberForm } from 'app/containers/Form/SignInWithPhoneNumberForm';
import { translate } from 'app/i18n';
import { textAlignCenter } from 'app/styles';
import { IconButton } from 'native-base';
import React, { FC } from 'react';
import { SafeAreaView } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { AppStackScreenProps } from '../navigators';

type FCProps = AppStackScreenProps<'SignInWithPhoneNumber'>;

export const SignInWithPhoneNumberScreen: FC<FCProps> = _props => {
  const { goBack } = useNavigation();

  return (
    <>
      <SafeAreaView></SafeAreaView>

      <Box flex={1}>
        <View px={24} py={24}>
          <View>
            <IconButton
              borderRadius="full"
              size={36}
              onPress={goBack}
              icon={<MaterialIcons name="chevron-left" size={36} />}
            ></IconButton>
          </View>
          <Heading size="2xl">
            {translate('What is your w?', { w: translate('phone number') })}
          </Heading>
          <Text>{translate('Please input the phone number to sign in')}</Text>
        </View>

        <View mt={24} flexGrow={1}>
          <View px={24}>
            <SignInWithPhoneNumberForm />
          </View>
        </View>

        <View>
          <Text style={textAlignCenter}>{translate('EZDating')}</Text>
        </View>
      </Box>

      <SafeAreaView></SafeAreaView>
    </>
  );
};
