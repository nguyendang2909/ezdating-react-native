import { useMessages } from 'app/hooks';
import { Center, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ProfileFreeCoinsCard: React.FC = () => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View
        borderWidth="1"
        borderRadius="2xl"
        borderColor="coolGray.200"
        py="4"
      >
        <VStack space="1">
          <Center>
            <View>
              <Icon
                size={10}
                color="#e9ad03"
                as={<FontAwesome5 name="coins" />}
              />
            </View>
          </Center>
          <Center>
            <Text>{formatMessage('Free coins')}</Text>
          </Center>
        </VStack>
      </View>
    </>
  );
};
