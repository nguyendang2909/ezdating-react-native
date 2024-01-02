import { Center, Icon, Pressable, Text, View, VStack } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from 'app/components';
import { useMessages } from 'app/hooks';
import React from 'react';

export const ProfileEditCard: React.FC = () => {
  const { formatMessage } = useMessages();

  const { navigate } = useNavigation();
  const onPress = () => {
    navigate('ProfileEdit');
  };

  return (
    <Pressable onPress={onPress}>
      {({ pressed }: { pressed: boolean }) => {
        return (
          <View
            borderWidth={1}
            borderRadius={8}
            borderColor="$coolGray200"
            py={16}
            bg={pressed ? '$coolGray200' : undefined}
          >
            <VStack space="sm">
              <Center>
                <View>
                  <Icon
                    sx={{
                      fontSize: 30,
                      height: 30,
                      width: 30,
                    }}
                    as={MaterialIcons}
                    // @ts-ignore
                    name="account-circle"
                    color="#DE685A"
                  />
                </View>
              </Center>
              <Center>
                <Text>{formatMessage('Profile')}</Text>
              </Center>
            </VStack>
          </View>
        );
      }}
    </Pressable>
  );
};
