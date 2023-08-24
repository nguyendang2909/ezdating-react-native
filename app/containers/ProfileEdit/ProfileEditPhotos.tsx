import { UploadPhotoCard } from 'app/components/Form/UploadPhotoCard';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
import { flexDirectionRow, flexWrapWrap, padding, width } from 'app/styles';
import { spacing } from 'app/theme';
import { ApiRequest } from 'app/types/api-request.type';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { HStack, useToast, View } from 'native-base';
import React from 'react';

export const ProfileEditPhotos: React.FC = () => {
  const toast = useToast();
  const mediaFiles =
    useAppSelector(state => state.app.profile.mediaFiles) || [];
  const mediaFilesLength = mediaFiles.length;

  const handleClickPhotoCard = async (index: number | string) => {};

  const [submitUploadPhoto] = api.useUploadPhotoMutation();

  const formik = useFormik<FormParams.UpdateProfilePhoto>({
    initialValues: {
      photos: [],
    },
    onSubmit: async values => {
      try {
        if (values.photos.length) {
          const [firstPhoto, ...photoParts] = values.photos;
          await submitUploadPhoto({
            file: firstPhoto,
          }).unwrap();
          if (photoParts.length) {
            await Promise.all(
              photoParts.map((item, index) => {
                const payload: ApiRequest.UploadPhoto = {
                  file: item,
                  ...(index === 0 ? { isAvatar: true } : {}),
                };

                return submitUploadPhoto(payload).unwrap();
              }),
            );
          }
        }
      } catch (err) {
        toast.show({
          title: translate('Update w failed!', { w: translate('Photo') }),
          placement: 'top-right',
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
              key={item._id || index}
              style={[padding(spacing.xxs), width('33%')]}
            >
              <UploadPhotoCard
                value={item?.location}
                onPress={() => {
                  if (item._id) {
                    handleClickPhotoCard(id);
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
