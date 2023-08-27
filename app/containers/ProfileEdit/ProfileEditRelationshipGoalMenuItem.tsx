import { MaterialIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { UserRelationshipGoal, UserRelationshipGoals } from 'app/constants';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { ApiRequest } from 'app/types/api-request.type';
import { Actionsheet, Box, Heading, Text, useDisclose } from 'native-base';
import React, { useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditRelationshipGoalMenuItem: React.FC<FCProps> = ({
  onPress,
}) => {
  const currentRelationshipGoal = useAppSelector(
    state => state.app.profile.relationshipGoal,
  );

  const [isInit, setInit] = useState<boolean>(false);

  const { isOpen, onOpen, onClose } = useDisclose();

  const handleChange = (relationshipGoal: UserRelationshipGoal) => {
    onClose();
    onPress({ relationshipGoal });
  };

  const handleOpen = () => {
    setInit(true);
    onOpen();
  };

  return (
    <>
      <MenuItem
        titleTx="Looking for"
        leftIcon={<MaterialIcons name="add-to-photos" />}
        {...(currentRelationshipGoal
          ? {
              valueTx: `constants.userRelationshipGoals.${currentRelationshipGoal}`,
            }
          : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={isOpen} onClose={onClose}>
          <Actionsheet.Content>
            <Box mb={4}>
              <Heading size="sm" textAlign="center">
                {translate('Relationship goal')}
              </Heading>
            </Box>
            {Object.values(UserRelationshipGoals).map(value => {
              return (
                <Actionsheet.Item
                  key={value}
                  onPress={() => {
                    handleChange(value);
                  }}
                >
                  <Text
                    fontWeight={
                      currentRelationshipGoal === value ? 'bold' : undefined
                    }
                  >
                    {translate(`constants.userRelationshipGoals.${value}`)}
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