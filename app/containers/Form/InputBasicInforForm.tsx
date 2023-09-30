import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { useTranslate } from 'app/hooks/useFormatMessage';
import { api } from 'app/services/api';
import { usersApi } from 'app/services/api/users.api';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { Button, Spinner, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const InputBasicInforForm: FC = () => {
  const t = useTranslate();

  const { data: profileData } = api.useGetMyProfileQuery();
  const profile = profileData?.data;
  const formik = useFormik<FormParams.BasicInfo>({
    initialValues: {
      nickname: profile?.nickname || '',
      gender: profile?.gender,
      birthday: profile?.birthday,
      relationshipGoal: undefined,
      introduce: '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      nickname: Yup.string().required(t('Please enter your nickname')),
      gender: Yup.string().required(t('Please enter your gender')),
      birthday: Yup.string().required(t('Please enter your birthday')),
      // relationshipGoal: Yup.string().required(
      //   t('Please choose your w!', { w: t('desire relation') }),
      // ),
      introduce: Yup.string().max(500).optional(),
    }),
    onSubmit: async values => {
      try {
        const result = await usersApi.updateProfile(values);
      } catch (err) {}
    },
  });

  return (
    <>
      <View
        position="absolute"
        left="0"
        right="0"
        top="0"
        bottom="0"
        backgroundColor="red.100"
        zIndex={2}
      >
        <Spinner />
      </View>
      <View flex="1" px="4">
        <View mb="4">
          <FormControlInput
            label={t('Nickname')}
            value={formik.values.nickname}
            onChange={formik.handleChange('nickname')}
            placeholder={t('Please enter your nickname')}
            error={formik.errors.nickname}
          />
        </View>

        <View mb="4">
          <SelectGenderFormControl
            value={formik.values.gender}
            onChange={formik.handleChange('gender')}
            error={formik.errors.gender}
          />
        </View>

        <View mb="4">
          <BirthDayFormControl
            value={formik.values.birthday}
            onChange={formik.handleChange('birthday')}
            error={formik.errors.birthday}
          />
        </View>

        <View mb="4">
          <FormControlInput
            label={t('Introduce')}
            value={formik.values.introduce}
            onChange={formik.handleChange('introduce')}
            placeholder={t('Please enter your introduce')}
            error={formik.errors.nickname}
            maxLength={500}
          />
        </View>
      </View>

      <View px="4" py="4">
        <Button
          onPress={() => {
            formik.handleSubmit();
          }}
        >
          {t('Continue')}
        </Button>
      </View>
    </>
  );
};
