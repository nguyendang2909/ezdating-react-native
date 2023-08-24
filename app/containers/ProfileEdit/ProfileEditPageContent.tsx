import { translate } from 'app/i18n';
import { paddingHorizontal } from 'app/styles';
import { colors, spacing } from 'app/theme';
import { Divider, Row, Text, View } from 'native-base';
import React from 'react';

import { ProfileEditBirthdayMenuItem } from './ProfileEditBirthdayMenuItem';
import { ProfileEditGenderMenuItem } from './ProfileEditGenderMenuItem';
import { ProfileEditHeightMenuItem } from './ProfileEditHeightMenuItem';
import { ProfileEditIntroduceMenuItem } from './ProfileEditIntroductionMenuItem';
import { ProfileEditLanguagesMenuItem } from './ProfileEditLanguagesMenuItem';
import { ProfileEditNicknameMenuItem } from './ProfileEditNicknameMenuItem';
import { ProfileEditPhotos } from './ProfileEditPhotos';
import { ProfileEditRelationshipGoalMenuItem } from './ProfileEditRelationshipGoal';
import { ProfileEditRelationshipStatus } from './ProfileEditRelationshipStatus';
import { ProfileEditWeightMenuItem } from './ProfileEditWeight';

export const ProfileEditPageContent: React.FC = () => {
  return (
    <>
      <Row style={paddingHorizontal(spacing.md)}>
        <ProfileEditPhotos />
      </Row>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Profile')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditNicknameMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditBirthdayMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditGenderMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditHeightMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditWeightMenuItem />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('About me')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditIntroduceMenuItem />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Relationship')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipGoalMenuItem />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipStatus />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Languages')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditLanguagesMenuItem />
        </View>
      </View>
      <View mt={8}></View>
    </>
  );
};
