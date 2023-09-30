import { useTranslate } from 'app/hooks/useFormatMessage';
import { Center, Icon, Text, View, VStack } from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export const ProfileVisitorsCard: React.FC = () => {
  const t = useTranslate();
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
                color="#2e536f"
                as={<MaterialIcons name="remove-red-eye" />}
              />
            </View>
          </Center>
          <Center>
            <Text>{t('Liked you')}</Text>
          </Center>
        </VStack>
      </View>
    </>
  );
};
