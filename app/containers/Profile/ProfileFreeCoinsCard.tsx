import { Center, Icon, Text, View, VStack } from '@gluestack-ui/themed';
import { useMessages } from 'app/hooks';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const ProfileFreeCoinsCard: React.FC = () => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View borderWidth={1} borderRadius={8} borderColor="$coolGray200" py={16}>
        <VStack space="sm">
          <Center>
            <View>
              <Icon
                sx={{
                  fontSize: 30,
                  height: 30,
                  width: 30,
                }}
                color="#e9ad03"
                as={FontAwesome5}
                // @ts-ignore
                name="coins"
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
