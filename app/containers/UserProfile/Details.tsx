import { Text, View } from '@gluestack-ui/themed';
import { DetailRow } from 'app/components';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from 'app/components/Icon/Lib';
import { useMessages } from 'app/hooks';
import { Entity } from 'app/types';
import React from 'react';

export const UserProfileDetails: React.FC<{ profile: Entity.Profile }> = ({ profile }) => {
  const { formatMessage } = useMessages();

  return (
    <>
      <View mb={8}>
        <Text bold>{formatMessage('Details')}</Text>
      </View>

      {!!profile.learningTarget && (
        <View>
          <DetailRow
            leftIcon={{ icon: FontAwesome, name: 'search' }}
            title="Learning target"
            value={profile.learningTarget}
          />
        </View>
      )}

      {!!profile.teachingSubject && (
        <View mt={8}>
          <DetailRow
            leftIcon={{ icon: MaterialIcons, name: 'book' }}
            title="Teaching subject"
            value={profile.teachingSubject}
          />
        </View>
      )}

      {/* {!!profile.relationshipStatus && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'cards-playing-heart-multiple',
            }}
            titleTx="Relationship status"
            valueTx={RELATIONSHIP_STATUS_MESSAGES[profile.relationshipStatus]}
          />
        </View>
      )} */}

      {/* {!!profile.relationshipGoal && (
        <View>
          <DetailRow
            leftIcon={{ icon: FontAwesome, name: 'search' }}
            titleTx="Looking for"
            valueTx={RELATIONSHIP_GOAL_MESSAGES[profile.relationshipGoal]}
          />
        </View>
      )}

      {!!profile.relationshipStatus && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'cards-playing-heart-multiple',
            }}
            titleTx="Relationship status"
            valueTx={RELATIONSHIP_STATUS_MESSAGES[profile.relationshipStatus]}
          />
        </View>
      )} */}

      {!!profile.height && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'human-male-height',
            }}
            titleTx="Height"
            value={`${profile.height} cm`}
          />
        </View>
      )}

      {!!profile.weight && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              name: 'weight',
              icon: MaterialCommunityIcons,
            }}
            titleTx="Weight"
            value={`${profile.weight} kg`}
          />
        </View>
      )}

      {!!profile.jobTitle && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialIcons,
              name: 'work',
            }}
            titleTx="Job title"
            value={profile.jobTitle}
          />
        </View>
      )}

      {!!profile.educationLevel && (
        <View mt={8}>
          <DetailRow
            leftIcon={{
              icon: MaterialCommunityIcons,
              name: 'school',
            }}
            titleTx="Education level"
            value={profile.educationLevel.toString()}
          />
        </View>
      )}
    </>
  );
};
