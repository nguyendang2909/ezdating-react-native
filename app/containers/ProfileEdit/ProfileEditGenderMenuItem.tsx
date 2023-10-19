import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { UserGender, UserGenderMessages, UserGenders } from 'app/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditGenderMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const { formatMessage } = useMessages();
  const currentValue = useAppSelector(state => state.app.profile?.gender);

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (gender: UserGender) => {
    onClose();
    onPress({ gender });
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(currentValue ? { valueTx: UserGenderMessages[currentValue] } : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Gender')}
              </Heading>
            </Box>
            {Object.values(UserGenders).map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text fontWeight={currentValue === value ? 'bold' : undefined}>
                    {formatMessage(UserGenderMessages[value])}
                  </Text>
                </Actionsheet.Item>
              );
            })}
          </Actionsheet.Content>
        </Actionsheet>
      )}
    </>
  );
};
