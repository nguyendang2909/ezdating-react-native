import { useNavigation } from '@react-navigation/native';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { Ionicons } from 'app/components/Icon/Lib';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useCreateMatchMutation } from 'app/services/api';
import { matchActions } from 'app/store/match';
import React from 'react';

type FCProps = {
  targetUserId: string;
};

export const NearbyUserSendMessageButton: React.FC<FCProps> = ({
  targetUserId,
}) => {
  const currentUserId = useAppSelector(s => s.app.profile._id) || '';
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [createMatch, { isLoading }] = useCreateMatchMutation();

  const handleChat = async () => {
    try {
      const fetchData = await createMatch({
        targetUserId,
      }).unwrap();
      dispatch(matchActions.addMatch({ data: fetchData.data, currentUserId }));

      navigation.goBack();
      navigation.navigate('Messages', {
        matchId: fetchData.data?._id,
      });
    } catch (err) {}
  };

  return (
    <LoadingButtonIcon
      height={48}
      width={48}
      onPress={handleChat}
      isLoading={isLoading}
    >
      <Ionicons color="white" size={24} name="chatbubble-ellipses-outline" />
    </LoadingButtonIcon>
  );
};
