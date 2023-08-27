import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { profileNotificationsService } from 'app/services/notifications/profile-notifications.service';
import { paddingHorizontal } from 'app/styles';
import { colors, spacing } from 'app/theme';
import { ApiRequest } from 'app/types/api-request.type';
import { Divider, Row, Text, View } from 'native-base';
import React from 'react';

import { ProfileEditBirthdayMenuItem } from './ProfileEditBirthdayMenuItem';
import { ProfileEditGenderMenuItem } from './ProfileEditGenderMenuItem';
import { ProfileEditHeightMenuItem } from './ProfileEditHeightMenuItem';
import { ProfileEditIntroduceMenuItem } from './ProfileEditIntroductionMenuItem';
import { ProfileEditLanguagesMenuItem } from './ProfileEditLanguagesMenuItem';
import { ProfileEditNicknameMenuItem } from './ProfileEditNicknameMenuItem';
import { ProfileEditPhotos } from './ProfileEditPhotos/ProfileEditMedifaFiles';
import { ProfileEditRelationshipGoalMenuItem } from './ProfileEditRelationshipGoalMenuItem';
import { ProfileEditRelationshipStatusMenuItem } from './ProfileEditRelationshipStatusMenuItem';
import { ProfileShowAgeMenuItem } from './ProfileEditShowAgeMenuItem';
import { ProfileShowMyDistanceMenuItem } from './ProfileEditShowDistanceMenuItem';
import { ProfileEditWeightMenuItem } from './ProfileEditWeight';

export const ProfileEditPageContent: React.FC = () => {
  const [submitUpdateProfile] = api.useUpdateProfileMutation();

  const handleEditProfile = async (payload: ApiRequest.UpdateProfile) => {
    try {
      await submitUpdateProfile(payload).unwrap();

      profileNotificationsService.success();
    } catch (err) {
      profileNotificationsService.fail();
    }
  };
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
          <ProfileEditBirthdayMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditGenderMenuItem onPress={handleEditProfile} />
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
          <ProfileEditIntroduceMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Relationship')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipGoalMenuItem onPress={handleEditProfile} />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipStatusMenuItem onPress={handleEditProfile} />
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

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Job title')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditIntroduceMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Control your profile')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileShowAgeMenuItem onPress={handleEditProfile} />
        </View>
        <View backgroundColor={colors.background}>
          <ProfileShowMyDistanceMenuItem onPress={handleEditProfile} />
        </View>
      </View>

      <View mt={100}></View>
    </>
  );
};
