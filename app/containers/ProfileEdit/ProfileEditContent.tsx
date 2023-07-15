import { translate } from 'app/i18n';
import { paddingHorizontal } from 'app/styles';
import { colors, spacing } from 'app/theme';
import { Divider, Row, Text, View } from 'native-base';
import React from 'react';

import { ProfileEditGender } from './ProfileEditGender';
import { ProfileEditHeight } from './ProfileEditHeight';
import { ProfileEditIntroduce } from './ProfileEditIntroduction';
import { ProfileEditLookingFor } from './ProfileEditLookingFor';
import { ProfileEditNickname } from './ProfileEditNickname';
import { ProfileEditPhotos } from './ProfileEditPhotos';
import { ProfileEditRelationshipStatus } from './ProfileEditRelationshipStatus';
import { ProfileEditWeight } from './ProfileEditWeight';

export const ProfileEditContent: React.FC = () => {
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
          <ProfileEditNickname />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditGender />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditHeight />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditWeight />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('About me')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditIntroduce />
        </View>
      </View>

      <View mt={4}>
        <View mx={4} mb={2}>
          <Text bold={true} textTransform="uppercase">
            {translate('Relationship')}
          </Text>
        </View>
        <View backgroundColor={colors.background}>
          <ProfileEditLookingFor />
        </View>
        <Divider />
        <View backgroundColor={colors.background}>
          <ProfileEditRelationshipStatus />
        </View>
      </View>
      <View mt={8}></View>
    </>
  );
};
