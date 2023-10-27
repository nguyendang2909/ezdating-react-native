import { Box, Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useNavigation } from '@react-navigation/native';
import { useRefreshNearbyProfilesQuery, useUpdateProfileMutation } from 'app/api';
import { HeaderSaveDone } from 'app/components/Header/HeaderSaveDone';
import { useAppSelector, useMessages } from 'app/hooks';
import { EditFilterGenderMenuItem } from 'app/pages/EditMatchFilter/EditFilterGenderMenuItem';
import { colors } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { HStack } from 'native-base';
import React from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

import { AppStackScreenProps } from '../../navigators';

export const EditMatchFilterScreen: React.FC<AppStackScreenProps<'EditMatchFilter'>> = () => {
  const [updateProfile] = useUpdateProfileMutation();
  const { refetch } = useRefreshNearbyProfilesQuery();
  const { formatMessage } = useMessages();
  const navigation = useNavigation();
  const { width } = Dimensions.get('window');

  const filterMaxDistance = useAppSelector(state => state.app.profile?.filterMaxDistance) || 1;
  const filterMinAge = useAppSelector(state => state.app.profile?.filterMinAge) || 18;
  const filterMaxAge = useAppSelector(state => state.app.profile?.filterMaxAge) || 99;
  const filterGender = useAppSelector(state => state.app.profile?.filterGender);

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
        await updateProfile(values).unwrap();
      } catch (err) {
        Toast.show({
          type: 'error',
          text1: formatMessage('Update failed, please try again.'),
        });
      }
      refetch();
      navigation.navigate('Home', {
        screen: 'DatingNearby',
      });
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
                  <Text>{formatMessage('Distance preference')}</Text>
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
                  <Text>{formatMessage('Age preference')}</Text>
                  <Text>
                    {formik.values.filterMinAge} - {formik.values.filterMaxAge}
                  </Text>
                </HStack>
              </View>

              <View px={16} w="$full" justifyContent="center" alignItems="center">
                <MultiSlider
                  values={[formik.values.filterMinAge, formik.values.filterMaxAge]}
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
