import { useGetMyProfileQuery, useUpdateProfileMutation } from 'app/api';
import { BirthDayFormControl } from 'app/components/Form/BirthDayFormControl';
import { FormControlInput } from 'app/components/Form/FormControlInput';
import { SelectGenderFormControl } from 'app/components/Form/SelectGenderForm';
import { useMessages } from 'app/hooks';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { Button, Spinner, View } from 'native-base';
import React, { FC } from 'react';
import * as Yup from 'yup';

export const InputBasicInforForm: FC = () => {
  const { formatMessage } = useMessages();

  const [updateProfile] = useUpdateProfileMutation();

  const { data: profileData } = useGetMyProfileQuery();
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
      nickname: Yup.string().required(formatMessage('Please enter your nickname')),
      gender: Yup.string().required(formatMessage('Please enter your gender')),
      birthday: Yup.string().required(formatMessage('Please enter your birthday')),
      // relationshipGoal: Yup.string().required(
      //   t('Please choose your w!', { w: t('desire relation') }),
      // ),
      introduce: Yup.string().max(500).optional(),
    }),
    onSubmit: async values => {
      try {
        await updateProfile(values).unwrap();
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
            label={formatMessage('Nickname')}
            value={formik.values.nickname}
            onChange={formik.handleChange('nickname')}
            placeholder={formatMessage('Please enter your nickname')}
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
            label={formatMessage('Introduce')}
            value={formik.values.introduce}
            onChange={formik.handleChange('introduce')}
            placeholder={formatMessage('Please enter your introduce')}
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
          {formatMessage('Continue')}
        </Button>
      </View>
    </>
  );
};
