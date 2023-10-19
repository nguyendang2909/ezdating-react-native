import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  Box,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { MaterialCommunityIcons } from 'app/components/Icon/Lib';
import { MenuItem } from 'app/components/Menu/MenuItem';
import { UserGender, UserGenderMessages, UserGenders } from 'app/constants';
import { useMessages } from 'app/hooks';
import React, { useState } from 'react';

type FCProps = {
  value?: UserGender;
  onChange: (gender: UserGender) => void;
};

export const EditFilterGenderMenuItem: React.FC<FCProps> = ({ value, onChange }) => {
  const { formatMessage } = useMessages();

  const [isInit, setInit] = useState<boolean>(false);
  const [showActionsheet, setShowActionsheet] = React.useState(false);
  const handleClose = () => setShowActionsheet(!showActionsheet);

  const handleChange = (gender: UserGender) => {
    handleClose();
    onChange(gender);
  };

  const handleOpen = () => {
    setInit(true);
    handleClose();
  };

  return (
    <>
      <MenuItem
        titleTx="Gender"
        leftIcon={<MaterialCommunityIcons name="gender-male-female" />}
        {...(value ? { valueTx: UserGenderMessages[value] } : {})}
        onPress={handleOpen}
      />

      {isInit && (
        <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
          <ActionsheetContent>
            <Box mb={16}>
              <Heading size="sm" textAlign="center">
                {formatMessage('Show me')}
              </Heading>
            </Box>
            {Object.values(UserGenders).map(e => {
              return (
                <ActionsheetItem
                  key={e}
                  onPress={() => {
                    console.log(11, e);
                    handleChange(e);
                  }}
                >
                  <Text fontWeight={e === value ? 'bold' : undefined}>
                    {formatMessage(UserGenderMessages[e])}
                  </Text>
                </ActionsheetItem>
              );
            })}
          </ActionsheetContent>
        </Actionsheet>
      )}
    </>
  );
};
