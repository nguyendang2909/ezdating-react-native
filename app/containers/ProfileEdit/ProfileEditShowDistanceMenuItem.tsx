import { MenuItemSwitch } from 'app/components/Menu/MenuItemSwitch';
import { useAppSelector } from 'app/hooks';
import { ApiRequest } from 'app/types';
import React, { useState } from 'react';

type FCProps = {
  onPress: (payload: ApiRequest.UpdateProfile) => void;
};

export const ProfileShowMyDistanceMenuItem: React.FC<FCProps> = ({ onPress }) => {
  const currentValue = useAppSelector(state => state.app.profile?.hideDistance);

  const [isEnable, setEnable] = useState<boolean | undefined>(currentValue);

  const handleToggle = (e: boolean) => {
    setEnable(e);
    onPress({ hideDistance: e });
  };

  return (
    <>
      <MenuItemSwitch titleTx="Don't show my distance" value={isEnable} onToggle={handleToggle} />
    </>
  );
};
