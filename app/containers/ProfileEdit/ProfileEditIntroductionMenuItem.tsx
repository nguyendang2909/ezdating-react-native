import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import { Input, View } from 'native-base';
import React, { useEffect, useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileEditIntroduceMenuItem: React.FC<FCProps> = ({
  onPress,
}) => {
  const introduceState =
    useAppSelector(state => state.app.profile.introduce) || '';
  const [introduce, setIntroduce] = useState<string>(introduceState);

  useEffect(() => {
    if (introduceState !== introduce) {
      const timeout = setTimeout(() => {
        onPress({ introduce: introduceState });
      }, 2000);
      return () => clearTimeout(timeout);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }, [introduce]);

  return (
    <>
      <View px={4} py={2}>
        <View>
          <Input
            maxLength={500}
            variant="unstyled"
            value={introduce}
            onChangeText={setIntroduce}
          />
        </View>
      </View>
    </>
  );
};
