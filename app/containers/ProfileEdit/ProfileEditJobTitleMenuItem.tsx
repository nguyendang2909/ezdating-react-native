import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import _ from 'lodash';
import { Input, Text, View } from 'native-base';
import React, { useRef, useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditJobTitleMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const currentValue = useAppSelector(state => state.app.profile?.jobTitle) || '';
  const [value, setValue] = useState<string>(currentValue);

  const handleDebounce = useRef(
    _.debounce((e: ApiRequest.UpdateProfile) => onPress(e), 3000),
  ).current;

  const handleChange = (e: string) => {
    setValue(e);
    handleDebounce({ jobTitle: e });
  };

  return (
    <>
      <View px={4} py={4}>
        <View>
          <Input
            maxLength={100}
            variant="unstyled"
            defaultValue={currentValue}
            onChangeText={handleChange}
          />
        </View>
        <View>
          <Text textAlign="right">{100 - value.length}</Text>
        </View>
      </View>
    </>
  );
};
