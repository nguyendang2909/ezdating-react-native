import { Text, View } from '@gluestack-ui/themed';
import { DetailRow } from 'app/components';
import {
  UserRelationshipGoalMessages,
  UserRelationshipStatusMessages,
} from 'app/constants';
import { useMessages } from 'app/hooks';
import { Entity } from 'app/types';
import React from 'react';

export const NearbyUserDetails: React.FC<{ user: Entity.User }> = ({
  user,
}) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View mb={8}>
        <Text bold>{formatMessage('Details')}</Text>
      </View>

      {!!user.relationshipGoal && (
        <View>
          <DetailRow
            titleTx="Looking for"
            valueTx={UserRelationshipGoalMessages[user.relationshipGoal]}
          />
        </View>
      )}

      {!!user.relationshipStatus && (
        <View mt={8}>
          <DetailRow
            titleTx="Relationship status"
            valueTx={UserRelationshipStatusMessages[user.relationshipStatus]}
          />
        </View>
      )}

      {!!user.height && (
        <View mt={8}>
          <DetailRow titleTx="Height" value={`${user.height} cm`} />
        </View>
      )}

      {!!user.weight && (
        <View mt={8}>
          <DetailRow titleTx="Weight" value={`${user.weight} kg`} />
        </View>
      )}

      {!!user.educationLevel && (
        <View mt={8}>
          <DetailRow
            titleTx="Education level"
            value={user.educationLevel.toString()}
          />
        </View>
      )}
    </>
  );
};
