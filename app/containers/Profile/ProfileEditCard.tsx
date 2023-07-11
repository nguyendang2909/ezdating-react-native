import { useNavigation } from '@react-navigation/native';
import { translate } from 'app/i18n';
import { Center, Icon, Pressable, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ProfileEditCard: React.FC = () => {
  const { navigate } = useNavigation();
  const onPress = () => {
    navigate('ProfileEdit');
  };

  return (
    <Pressable onPress={onPress}>
      {({ isPressed }) => {
        return (
          <View
            borderWidth="1"
            borderRadius="2xl"
            borderColor="coolGray.200"
            py="4"
            bg={isPressed ? 'coolGray.200' : undefined}
          >
            <VStack space="1">
              <Center>
                <View>
                  <Icon
                    size={10}
                    color="#DE685A"
                    as={<MaterialIcons name="account-circle" />}
                  />
                </View>
              </Center>
              <Center>
                <Text>{translate('Profile')}</Text>
              </Center>
            </VStack>
          </View>
        );
      }}
    </Pressable>
  );
};
