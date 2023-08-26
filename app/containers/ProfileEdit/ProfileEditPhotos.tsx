import { useActionSheet } from '@expo/react-native-action-sheet';
import { UploadPhotoCard } from 'app/components/Form/UploadPhotoCard';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { flexDirectionRow, flexWrapWrap, padding, width } from 'app/styles';
import { spacing } from 'app/theme';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { HStack, Toast, View } from 'native-base';
import React from 'react';

export const ProfileEditPhotos: React.FC = () => {
  const mediaFiles =
    useAppSelector(state => state.app.profile.mediaFiles) || [];

  const mediaFilesLength = mediaFiles.length;

  const { showActionSheetWithOptions } = useActionSheet();

  const handleClickPhotoCard = async (index: number | string) => {
    showActionSheetWithOptions(
      {
        showSeparators: true,
        options: [
          translate('Remove w', { w: translate('photo') }),
          translate('Cancel'),
        ],
        cancelButtonIndex: 1,
        useModal: true,
      },
      (selectedIndex: number) => {
        switch (selectedIndex) {
          case 1:
            console.log(1111);
            break;
        }
      },
    );
  };

  const [submitUploadPhoto] = api.useUploadPhotoMutation();

  const formik = useFormik<FormParams.UpdateProfilePhoto>({
    initialValues: {
      photos: [],
    },
    onSubmit: async values => {
      try {
        if (values.photos.length) {
          await Promise.all(
            values.photos.map(item => {
              return submitUploadPhoto({
                file: item,
              }).unwrap();
            }),
          );

          Toast.show({
            title: translate('Update w failed!', { w: translate('Photo') }),
            placement: 'top',
          });
        }
      } catch (err) {
        Toast.show({
          title: translate('Update w failed!', { w: translate('Photo') }),
          placement: 'top',
        });
      }
    },
  });

  const files = mediaFiles.concat([
    ...formik.values.photos,
    ...Array(6 - mediaFilesLength - formik.values.photos.length),
  ]);

  return (
    <>
      <HStack style={[flexDirectionRow, flexWrapWrap]}>
        {files?.map((item, index) => {
          return (
            <View
              key={item?._id || index}
              style={[padding(spacing.xxs), width('33%')]}
            >
              <UploadPhotoCard
                value={item?.location}
                onPress={() => {
                  if (item._id) {
                    handleClickPhotoCard(item._id);
                  }
                }}
              ></UploadPhotoCard>
            </View>
          );
        })}
      </HStack>
    </>
  );
};
