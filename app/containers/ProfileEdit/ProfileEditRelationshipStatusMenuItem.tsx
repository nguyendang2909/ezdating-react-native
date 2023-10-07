import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import {
  UserRelationshipStatus,
  UserRelationshipStatuses,
  UserRelationshipStatusMessages,
} from 'app/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditRelationshipStatusMenuItem: React.FC<FCProps> = ({
  onPress,
}) => {
  const { formatMessage } = useMessages();

  const currentValue = useAppSelector(
    state => state.app.profile?.relationshipStatus,
  );

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (relationshipStatus: UserRelationshipStatus) => {
    onClose();
    onPress({ relationshipStatus });
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        titleTx="Relationship status"
        leftIcon={<MaterialIcons name="person" />}
        {...(currentValue
          ? { valueTx: UserRelationshipStatusMessages[currentValue] }
          : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Relationship goal')}
              </Heading>
            </Box>
            {Object.values(UserRelationshipStatuses).map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text
                    fontWeight={currentValue === value ? 'bold' : undefined}
                  >
                    {formatMessage(UserRelationshipStatusMessages[value])}
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
