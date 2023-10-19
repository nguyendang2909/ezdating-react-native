import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { Input, Text, View } from 'native-base';
import React, { useEffect, useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditJobTitleMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const currentValue = useAppSelector(state => state.app.profile?.introduce) || '';

  const [value, setValue] = useState<string>(currentValue);

  useEffect(() => {
    if (value !== currentValue) {
      const timeout = setTimeout(() => {
        onPress({ jobTitle: value });
      }, 1000);
      return () => clearTimeout(timeout);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [value]);

  return (
    <>
      <View px={4} py={4}>
        <View>
          <Input maxLength={100} variant="unstyled" value={value} onChangeText={setValue} />
        </View>
        <View>
          <Text textAlign="right">{100 - value.length}</Text>
        </View>
      </View>
    </>
  );
};
