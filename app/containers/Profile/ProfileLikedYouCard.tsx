import { translate } from 'app/i18n';
import { Center, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const ProfileLikedYouCard: React.FC = () => {
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
                color="red.500"
                size={10}
                as={<FontAwesome name="heart" />}
              />
            </View>
          </Center>
          <Center>
            <Text>{translate('Liked you')}</Text>
          </Center>
        </VStack>
      </View>
    </>
  );
};
