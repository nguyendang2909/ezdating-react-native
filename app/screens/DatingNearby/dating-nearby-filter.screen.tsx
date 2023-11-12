import { Box, Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';
import { useGetNewestNearbyProfilesMutation, useUpdateMyProfileFilterMutation } from 'app/api';
import { HeaderSaveDone } from 'app/components/Header/HeaderSaveDone';
import { useAppSelector, useGeolocation, useMessages } from 'app/hooks';
import { EditFilterGenderMenuItem } from 'app/pages/EditMatchFilter/EditFilterGenderMenuItem';
import { colors } from 'app/theme';
import { ApiRequest, FormParams } from 'app/types';
import { useFormik } from 'formik';
import { HStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

import { AppStackScreenProps } from '../../navigators';

export const DatingNearbyFilterScreen: React.FC<
  AppStackScreenProps<'dating_nearby_filter'>
> = () => {
  const [updateMyProfileFilter] = useUpdateMyProfileFilterMutation();
  const { formatMessage, formatErrorMessage } = useMessages();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');
  const { longitude, latitude } = useGeolocation();
  const [getNewestNearbyProfiles] = useGetNewestNearbyProfilesMutation();

  const maxDistance = useAppSelector(state => state.app.profileFilter.maxDistance) || 50;
  const minAge = useAppSelector(state => state.app.profileFilter.minAge) || 18;
  const maxAge = useAppSelector(state => state.app.profileFilter.maxAge) || 99;
  const gender = useAppSelector(state => state.app.profileFilter.gender);

  const formik = useFormik<FormParams.UpdateProfileFilter>({
    initialValues: {
      minAge,
      maxAge,
      gender,
      maxDistance,
    },
    enableReinitialize: true,
    onSubmit: async values => {
      handleUpdateMyProfileFilter(values);
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        navigation.navigate('Home', {
          screen: 'DatingNearby',
        });
      }
    },
  });

  const handleUpdateMyProfileFilter = async (body: ApiRequest.UpdateProfileFilter) => {
    try {
      await updateMyProfileFilter(body).unwrap();
      if (longitude && latitude) {
        getNewestNearbyProfiles({ longitude, latitude });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: formatErrorMessage(error),
      });
    }
  };

  const handleChangeFilterMaxDistance = (e: number[]) => {
    if (e[0] && e[0] !== formik.values.minAge) {
      formik.setFieldValue('maxDistance', e[0]);
    }
  };

  const handleChangeAges = (e: number[]) => {
    if (e[0] && e[0] !== formik.values.minAge) {
      formik.setFieldValue('minAge', e[0]);
    }

    if (e[1] && e[1] !== formik.values.maxAge) {
      formik.setFieldValue('maxAge', e[1]);
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
                  <Text>{formatMessage('Distance preference')}</Text>
                  <Text>{formik.values.maxDistance} km</Text>
                </HStack>
              </View>

              <View mx={16} alignItems="center">
                <MultiSlider
                  values={[formik.values.maxDistance]}
                  sliderLength={width - 48}
                  onValuesChange={handleChangeFilterMaxDistance}
                  min={0}
                  max={100}
                  step={1}
                  allowOverlap={false}
                  snapped
                  minMarkerOverlapDistance={40}
                />
              </View>
            </View>

            <Divider />

            <View>
              <EditFilterGenderMenuItem
                value={formik.values.gender}
                onChange={gender => {
                  formik.setFieldValue('filterGender', gender);
                }}
              />
            </View>

            <Divider />

            <View py={16}>
              <View mx={16}>
                <HStack justifyContent="space-between">
                  <Text>{formatMessage('Age preference')}</Text>
                  <Text>
                    {formik.values.minAge} - {formik.values.maxAge}
                  </Text>
                </HStack>
              </View>

              <View px={16} w="$full" justifyContent="center" alignItems="center">
                <MultiSlider
                  values={[formik.values.minAge, formik.values.maxAge]}
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
          </View>

          <View mt={100}></View>
        </ScrollView>
      </Box>
      {/* <SafeAreaView /> */}
    </>
  );
};
