import { translate } from 'app/i18n';
import { Center, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ProfileAccountCard: React.FC = () => {
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
                color="#DE685A"
                as={<MaterialIcons name="account-circle" />}
              />
            </View>
          </Center>
          <Center>
            <Text>{translate('Account')}</Text>
          </Center>
        </VStack>
      </View>
    </>
  );
};
