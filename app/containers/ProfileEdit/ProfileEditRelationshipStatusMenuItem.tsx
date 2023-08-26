import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import {
  UserRelationshipStatus,
  UserRelationshipStatuses,
} from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { ApiRequest } from 'app/types/api-request.type';
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditRelationshipStatusMenuItem: React.FC<FCProps> = ({
  onPress,
}) => {
  const currentValue = useAppSelector(
    state => state.app.profile.relationshipStatus,
  );

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (relationshipStatus: UserRelationshipStatus) => {
    onClose();
    onPress({ relationshipStatus });
  };
  return (
    <>
      <MenuItem
        titleTx="Relationship status"
        leftIcon={<MaterialIcons name="person" />}
        {...(currentValue
          ? { valueTx: `constants.userRelationshipStatuses.${currentValue}` }
          : {})}
        onPress={onOpen}
      />

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <Box mb={4}>
            <Heading size="sm" textAlign="center">
              {translate('Relationship goal')}
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
                <Text fontWeight={currentValue === value ? 'bold' : undefined}>
                  {translate(`constants.userRelationshipStatuses.${value}`)}
                </Text>
              </Actionsheet.Item>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
