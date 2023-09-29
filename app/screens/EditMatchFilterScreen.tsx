import { Box, Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';
import { HeaderSaveDone } from 'app/components/Header/HeaderSaveDone';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { EditFilterGenderMenuItem } from 'app/pages/EditMatchFilter/EditFilterGenderMenuItem';
import { nearbyUsersApi } from 'app/services/api/nearby-users.api';
import { usersApi } from 'app/services/api/users.api';
import { notificationsService } from 'app/services/notifications/notifications.service';
import { appActions } from 'app/store/app.store';
import { nearbyUserActions } from 'app/store/nearby-user.store';
import { colors } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { HStack } from 'native-base';
import React from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { useDispatch } from 'react-redux';

import { AppStackScreenProps } from '../navigators';

type FCProps = AppStackScreenProps<'SignInWithOtpPhoneNumber'>;

export const EditMatchFilterScreen: React.FC<FCProps> = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { width } = Dimensions.get('window');

  const filterMaxDistance =
    useAppSelector(state => state.app.profile?.filterMaxDistance) || 1;
  const filterMinAge =
    useAppSelector(state => state.app.profile?.filterMinAge) || 18;
  const filterMaxAge =
    useAppSelector(state => state.app.profile?.filterMaxAge) || 99;
  const filterGender = useAppSelector(state => state.app.profile?.filterGender);

  const isNearbyUsersRefreshingTop = useAppSelector(
    s => s.nearbyUser.isRefreshingTop || false,
  );

  const formik = useFormik<FormParams.UpdateMatchFilter>({
    initialValues: {
      filterMinAge,
      filterMaxAge,
      filterGender,
      filterMaxDistance,
    },
    enableReinitialize: true,
    onSubmit: async values => {
      try {
        await usersApi.updateProfile(values);

        notificationsService.success('profile');

        const profile = await usersApi.getMyProfile();

        if (profile.data) {
          dispatch(appActions.updateProfile(profile.data));
        }
      } catch (err) {
        notificationsService.fail('profile');
      }

      navigation.navigate('Home', {
        screen: 'DatingNearby',
      });

      if (!isNearbyUsersRefreshingTop) {
        dispatch(nearbyUserActions.setRefreshingTop(true));
        try {
          const nearbyUsersData = await nearbyUsersApi.getMany();

          dispatch(nearbyUserActions.addManyFirst(nearbyUsersData.data || []));
        } catch (err) {}

        dispatch(nearbyUserActions.setRefreshingTop(false));
      }
    },
  });

  const handleChangeFilterMaxDistance = (e: number[]) => {
    if (e[0] && e[0] !== formik.values.filterMinAge) {
      formik.setFieldValue('filterMaxDistance', e[0]);
    }
  };

  const handleChangeAges = (e: number[]) => {
    if (e[0] && e[0] !== formik.values.filterMinAge) {
      formik.setFieldValue('filterMinAge', e[0]);
    }

    if (e[1] && e[1] !== formik.values.filterMaxAge) {
      formik.setFieldValue('filterMaxAge', e[1]);
    }
  };

  return (
    <>
      <HeaderSaveDone
        titleTx="Filter settings"
        onSave={formik.handleSubmit}
        isLoading={formik.isSubmitting}
      />

      <Box flex={1} backgroundColor="$backgroundLight100">
        <ScrollView flex={1} pt={2} pb={4}>
          <View mt={16} backgroundColor={colors.background}>
            <View py={16}>
              <View mx={16}>
                <HStack justifyContent="space-between">
                  <Text>{translate('Distance preference')}</Text>
                  <Text>{formik.values.filterMaxDistance} km</Text>
                </HStack>
              </View>

              <View mx={16} alignItems="center">
                <MultiSlider
                  values={[formik.values.filterMaxDistance]}
                  sliderLength={width - 48}
                  onValuesChange={handleChangeFilterMaxDistance}
                  min={0}
                  max={100}
                  step={1}
                  allowOverlap={false}
                  snapped
                  minMarkerOverlapDistance={40}
                  // customMarker={CustomMarker}
                  // customLabel={CustomLabel}
                />
              </View>
            </View>

            <Divider />

            <View>
              <EditFilterGenderMenuItem
                value={formik.values.filterGender}
                onChange={gender => {
                  formik.setFieldValue('filterGender', gender);
                }}
              />
            </View>

            <Divider />

            <View py={16}>
              <View mx={16}>
                <HStack justifyContent="space-between">
                  <Text>{translate('Age preference')}</Text>
                  <Text>
                    {formik.values.filterMinAge} - {formik.values.filterMaxAge}
                  </Text>
                </HStack>
              </View>

              <View
                px={16}
                w="$full"
                justifyContent="center"
                alignItems="center"
              >
                <MultiSlider
                  values={[
                    formik.values.filterMinAge,
                    formik.values.filterMaxAge,
                  ]}
                  sliderLength={width - 48}
                  onValuesChange={handleChangeAges}
                  min={18}
                  max={100}
                  step={1}
                  allowOverlap={false}
                  snapped
                  minMarkerOverlapDistance={40}
                  // customMarker={CustomMarker}
                  // customLabel={CustomLabel}
                />
              </View>
            </View>

            {/* <View backgroundColor={colors.background}>
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
            </View> */}
          </View>

          {/* <View mt={4}>
            <View mx={4} mb={2}>
              <Text bold={true} textTransform="uppercase">
                {translate('About me')}
              </Text>
            </View>
            <View backgroundColor={colors.background}>
              <ProfileEditIntroduceMenuItem onPress={handleEditProfile} />
            </View>
          </View> */}

          {/* <View mt={4}>
            <View mx={4} mb={2}>
              <Text bold={true} textTransform="uppercase">
                {translate('Relationship')}
              </Text>
            </View>
            <View backgroundColor={colors.background}>
              <ProfileEditRelationshipGoalMenuItem
                onPress={handleEditProfile}
              />
            </View>
            <Divider />
            <View backgroundColor={colors.background}>
              <ProfileEditRelationshipStatusMenuItem
                onPress={handleEditProfile}
              />
            </View>
          </View> */}

          {/* <View mt={4}>
            <View mx={4} mb={2}>
              <Text bold={true} textTransform="uppercase">
                {translate('Languages')}
              </Text>
            </View>
            <View backgroundColor={colors.background}>
              <ProfileEditLanguagesMenuItem />
            </View>
          </View> */}

          {/* <View mt={4}>
            <View mx={4} mb={2}>
              <Text bold={true} textTransform="uppercase">
                {translate('Job title')}
              </Text>
            </View>
            <View backgroundColor={colors.background}>
              <ProfileEditIntroduceMenuItem onPress={handleEditProfile} />
            </View>
          </View> */}

          {/* <View mt={4}>
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
          </View> */}

          <View mt={100}></View>
        </ScrollView>
      </Box>
      <SafeAreaView />
    </>
  );
};
