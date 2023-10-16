import { Text, View } from '@gluestack-ui/themed';
import { DetailRow } from 'app/components';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from 'app/components/Icon/Lib';
import { UserRelationshipGoalMessages, UserRelationshipStatusMessages } from 'app/constants';
import { useMessages } from 'app/hooks';
import { Entity } from 'app/types';
import React from 'react';

export const UserProfileDetails: React.FC<{ user: Entity.User }> = ({ user }) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View mb={8}>
        <Text bold>{formatMessage('Details')}</Text>
      </View>

      {!!user.relationshipGoal && (
        <View>
          <DetailRow
            leftIcon={{ icon: FontAwesome, name: 'search' }}
            titleTx="Looking for"
            valueTx={UserRelationshipGoalMessages[user.relationshipGoal]}
          />
        </View>
      )}

      {!!user.relationshipStatus && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'cards-playing-heart-multiple',
            }}
            titleTx="Relationship status"
            valueTx={UserRelationshipStatusMessages[user.relationshipStatus]}
          />
        </View>
      )}

      {!!user.height && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'human-male-height',
            }}
            titleTx="Height"
            value={`${user.height} cm`}
          />
        </View>
      )}

      {!!user.weight && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              name: 'weight',
              icon: MaterialCommunityIcons,
            }}
            titleTx="Weight"
            value={`${user.weight} kg`}
          />
        </View>
      )}

      {!!user.jobTitle && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialIcons,
              name: 'work',
            }}
            titleTx="Job title"
            value={user.jobTitle}
          />
        </View>
      )}

      {!!user.educationLevel && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'school',
            }}
            titleTx="Education level"
            value={user.educationLevel.toString()}
          />
        </View>
      )}
    </>
  );
};
