import { useAppSelector } from 'app/hooks';
import { api } from 'app/services/api';
import { Input, Text, useToast, View } from 'native-base';
import React, { useEffect, useState } from 'react';

const maxLength = 500;

export const ProfileEditIntroduceMenuItem: React.FC = () => {
  const toast = useToast();
  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const introduceState =
    useAppSelector(state => state.app.profile.introduce) || '';
  const [introduce, setIntroduce] = useState<string>(introduceState);

  useEffect(() => {
    if (introduce !== introduceState) {
      const timeout = setTimeout(() => {
        handleChange();
      }, 1000);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [introduce]);

  const handleChange = async () => {
    try {
      await submitUpdateProfile({ introduce }).unwrap();

      toast.show({
        title: 'Update introduce successfully!',
        placement: 'top-right',
      });
    } catch (err) {
      toast.show({
        title: 'Update introduce failed. Please try again!',
        id: 'updateIntroduction',
        placement: 'top-right',
      });
    }
  };

  return (
    <>
      <View px={4} py={4}>
        <View>
          <Input
            maxLength={maxLength}
            variant="unstyled"
            value={introduce}
            onChangeText={setIntroduce}
          />
        </View>
        <View>
          <Text textAlign="right">{500 - introduce.length}</Text>
        </View>
      </View>
    </>
  );
};
