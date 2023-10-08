import { useNavigation } from '@react-navigation/native';
import { LoadingButtonIcon } from 'app/components/Button/LoadingButtonIcon';
import { Ionicons } from 'app/components/Icon/Lib';
import {
  useAppDispatch,
  useAppSelector,
  useCreateMatchMutation,
} from 'app/hooks';
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
  const createMatchMutation = useCreateMatchMutation();

  const handleChat = async () => {
    try {
      const fetchData = await createMatchMutation.mutateAsync({
        targetUserId,
      });
      dispatch(
        matchActions.addOneMatch({ data: fetchData.data, currentUserId }),
      );

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
      isLoading={createMatchMutation.isLoading}
    >
      <Ionicons color="white" size={24} name="chatbubble-ellipses-outline" />
    </LoadingButtonIcon>
  );
};
