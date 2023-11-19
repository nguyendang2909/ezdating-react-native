import { useNavigation } from '@react-navigation/native';
import { useCreateMatchMutation } from 'app/api';
import { MessageIconButton } from 'app/components/Button';
import { useAppDispatch } from 'app/hooks';
import { matchActions } from 'app/store/match';
import React from 'react';

type FCProps = {
  targetUserId?: string;
  onClose?: () => void;
};

export const SendMessageButton: React.FC<FCProps> = ({ targetUserId, onClose }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [createMatch, { isLoading }] = useCreateMatchMutation();

  const handleChat = async () => {
    if (!targetUserId) {
      return;
    }
    try {
      const fetchData = await createMatch({
        targetUserId,
      }).unwrap();
      dispatch(matchActions.addMatch(fetchData));
      if (onClose) {
        onClose();
      } else {
        navigation.goBack();
      }
      navigation.navigate('Messages', {
        matchId: fetchData.data?._id,
        match: fetchData.data,
      });
    } catch (err) {}
  };

  return <MessageIconButton onPress={handleChat} isLoading={isLoading} />;
};
