import { MenuItemSwitch } from 'app/components/Menu/MenuItemSwitch';
import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types/api-request.type';
import React, { useEffect, useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileShowMyDistanceMenuItem: React.FC<FCProps> = ({
  onPress,
}) => {
  const currentValue = useAppSelector(state => state.app.profile.hideDistance);

  const [isEnable, setEnable] = useState<boolean | undefined>(currentValue);

  useEffect(() => {
    if (isEnable !== currentValue) {
      onPress({ hideDistance: isEnable });
    }
  }, [isEnable]);

  return (
    <>
      <MenuItemSwitch
        titleTx="Don't show my distance"
        value={isEnable}
        onToggle={setEnable}
      />
    </>
  );
};
