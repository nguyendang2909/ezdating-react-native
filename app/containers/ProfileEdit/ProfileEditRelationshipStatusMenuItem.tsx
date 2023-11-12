import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { RELATIONSHIP_STATUSES } from 'app/constants';
import { RELATIONSHIP_STATUS_MESSAGES } from 'app/constants/constants';
import { useAppSelector, useMessages } from 'app/hooks';
import { ApiRequest, RelationshipStatus } from 'app/types';
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditRelationshipStatusMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const { formatMessage } = useMessages();

  const currentValue = useAppSelector(state => state.app.profile?.relationshipStatus);

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (relationshipStatus: RelationshipStatus) => {
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
        {...(currentValue ? { valueTx: RELATIONSHIP_STATUS_MESSAGES[currentValue] } : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Relationship status')}
              </Heading>
            </Box>
            {Object.values(RELATIONSHIP_STATUSES).map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text fontWeight={currentValue === value ? 'bold' : undefined}>
                    {formatMessage(RELATIONSHIP_STATUS_MESSAGES[value])}
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
