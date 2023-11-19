import { useNavigation } from '@react-navigation/native';
import { useCreateMatchMutation, useGetMatchByTargetUserIdMutation } from 'app/api';
import { MessageIconButton } from 'app/components/Button';
import { useAppDispatch } from 'app/hooks';
import { matchActions } from 'app/store/match';
import React from 'react';

type FCProps = {
  targetUserId?: string;
  onClose: () => void;
};

export const SendMessageButton: React.FC<FCProps> = ({ targetUserId, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [createMatch, { isLoading: isCreateMatchLoading }] = useCreateMatchMutation();
  const [getMatchByTargetUserId, { isLoading: isGetMatchLoading }] =
    useGetMatchByTargetUserIdMutation();

  const isLoading = isCreateMatchLoading || isGetMatchLoading;

  const handleGetMatch = async (targetUserId: string) => {
    try {
      const matchData = await getMatchByTargetUserId(targetUserId).unwrap();
      onClose();
      navigation.navigate('Messages', {
        matchId: matchData.data?._id,
        match: matchData.data,
      });
    } catch (err) {}
  };

  const handleChat = async () => {
    if (!targetUserId) {
      return;
    }
    try {
      const fetchData = await createMatch({
        targetUserId,
      }).unwrap();
      dispatch(matchActions.addMatch(fetchData));
      onClose();
      navigation.navigate('Messages', {
        matchId: fetchData.data?._id,
        match: fetchData.data,
      });
    } catch (error) {
      if (error.status === 409) {
        return await handleGetMatch(targetUserId);
      }
    }
  };

  return <MessageIconButton onPress={handleChat} isLoading={isLoading} />;
};
