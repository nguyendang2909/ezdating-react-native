import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { HeaderSaveModal } from 'app/components/Header/HeaderSaveModal';
import { useAppSelector } from 'app/hooks';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { usersApi } from 'app/services/api/users.api';
import { profileNotificationsService } from 'app/services/notifications/profile-notifications.service';
import { useFormik } from 'formik';
import { Box, Text, View } from 'native-base';
import React from 'react';
import * as Yup from 'yup';

export const EditInfoHeightScreen = () => {
  const t = useTranslate();

  const { goBack } = useNavigation();

  const currentHeight = useAppSelector(state => state.app.profile?.height);

  const formik = useFormik<{ height: number }>({
    enableReinitialize: true,
    initialValues: {
      height: currentHeight || 165,
    },
    validationSchema: Yup.object().shape({
      height: Yup.string().required(t('Please enter your height')),
    }),

    onSubmit: async values => {
      try {
        await usersApi.updateProfile(values);

        profileNotificationsService.success();

        goBack();
      } catch (err) {
        profileNotificationsService.fail();
      }
    },
  });

  return (
    <Box flex="1" safeAreaY>
      <HeaderSaveModal
        titleTx="Height"
        onSave={() => formik.handleSubmit()}
        isLoading={formik.isSubmitting}
      />

      <View mt={4} mb={4} px={4}>
        <Text color="gray.500">{`${t('My height is')} (${t('cm')}):`}</Text>
      </View>

      <View mt={4} mb={4} px={4}>
        <Picker
          selectedValue={formik.values.height}
          onValueChange={itemValue => formik.setFieldValue('height', itemValue)}
        >
          {Array.from({ length: 100 }, (value, index) => {
            const heightValue = index + 100;
            return (
              <Picker.Item label={heightValue.toString()} value={heightValue} />
            );
          })}
        </Picker>
      </View>
    </Box>
  );
};
