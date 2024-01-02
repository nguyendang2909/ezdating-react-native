import { Button, ButtonIcon, ButtonText, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from 'app/components/Icon/Lib';
import { SCREENS } from 'app/constants';
import { useMessages } from 'app/hooks';
import React, { FC } from 'react';
import Toast from 'react-native-toast-message';

type FCProps = {
  setLoading: (e: boolean) => void;
};

export const SignInWithPhoneNumberButton: FC<FCProps> = ({ setLoading }) => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();

  const handlePress = () => {
    try {
      setLoading(true);
      navigate(SCREENS.SignInWithPhoneNumber);
    } catch (err) {
      Toast.show({ text1: formatMessage('Oops, something went wrong. Please try again.') });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button onPress={handlePress}>
        <View mr={8}>
          {/*
          @ts-ignore */}
          <ButtonIcon mr={8} as={FontAwesome} name="mobile-phone"></ButtonIcon>
        </View>
        <ButtonText>{formatMessage('Sign in with phone number')}</ButtonText>
      </Button>
    </>
  );
};
