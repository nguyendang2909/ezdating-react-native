import { useNavigation } from '@react-navigation/native';
import { UploadPhotoCard } from 'app/components/Form/UploadPhotoCard';
import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { PhotoRequestPermission } from 'app/containers/Photos/PhotoRequestPermission.ios';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { AppStackScreenProps } from 'app/navigators';
import { mediaFilesApi } from 'app/services/api/media-files.api';
import { usersApi } from 'app/services/api/users.api';
import { appActions } from 'app/store/app.store';
import {
  alignItemsCenter,
  flexDirectionRow,
  flexGrow,
  flexWrapWrap,
  justifyContentCenter,
  padding,
  width,
} from 'app/styles';
import { spacing } from 'app/theme';
import { ApiRequest } from 'app/types/api-request.type';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import {
  Actionsheet,
  Box,
  Button,
  ChevronLeftIcon,
  Divider,
  Heading,
  HStack,
  IconButton,
  Text,
  useToast,
  View,
} from 'native-base';
import React, { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import { useDispatch } from 'react-redux';

type FCProps = AppStackScreenProps<'UpdateProfilePhotosScreen'>;

export const UpdateProfilePhotosScreen: React.FC<FCProps> = () => {
  const toast = useToast();
  const { navigate, goBack } = useNavigation();
  const [removePhotoIndex, setRemovePhotoIndex] = useState<
    number | string | undefined
  >(undefined);
  const dispatch = useDispatch();
  const mediaFiles = useAppSelector(state => state.app.profile?.mediaFiles);
  const profilePublicPhotosLength = mediaFiles?.length || 0;

  const formik = useFormik<FormParams.UpdateProfilePhoto>({
    initialValues: {
      photos: [],
    },
    onSubmit: async values => {
      try {
        if (values.photos.length) {
          await Promise.all(
            values.photos.map((item, index) => {
              const payload: ApiRequest.UploadPhoto = {
                file: item,
                ...(index === 0 ? { isAvatar: true } : {}),
              };

              return mediaFilesApi.uploadPhoto(payload);
            }),
          );
        }
        const userData = await usersApi.getMyProfile();

        if (userData.data) {
          dispatch(appActions.updateProfile(userData.data));
          navigate('Home', {
            screen: 'DatingSwipe',
          });
        }
      } catch (err) {
        console.log(err);
        toast.show({
          title: translate('Update w failed!', { w: translate('Photo') }),
          placement: 'top-right',
        });
      }
    },
  });

  const handleRemovePhotoCardById = async () => {
    if (removePhotoIndex !== undefined) {
      if (typeof removePhotoIndex === 'number') {
        formik.setFieldValue(
          'photos',
          formik.values.photos.filter(
            (value, index) => index !== removePhotoIndex,
          ),
        );
        handleCloseRemovePhotoCard();
      } else if (typeof removePhotoIndex === 'string') {
        try {
          formik.setSubmitting(true);
          handleCloseRemovePhotoCard();
          await mediaFilesApi.removePhoto(removePhotoIndex);
        } catch (err) {
          toast.show({
            title: translate('Remove w failed!', { w: translate('Photo') }),
            placement: 'top-right',
          });
        } finally {
          formik.setSubmitting(false);
        }
      }
    }
  };

  const handleCloseRemovePhotoCard = () => {
    setRemovePhotoIndex(undefined);
  };

  const handleClickPhotoCard = async (index: number | string) => {
    if (typeof index === 'number') {
      const photos = formik.values.photos;
      if (photos[index]) {
        setRemovePhotoIndex(index);
        return;
      }
      const photo = await ImageCropPicker.openPicker({
        width: 640,
        height: 860,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
      });
      formik.setFieldValue('photos', formik.values.photos.concat(photo));
    } else if (typeof index === 'string') {
      setRemovePhotoIndex(index);
    }
  };

  return (
    <>
      <Box flex="1" safeAreaY>
        <LoadingScreen isLoading={formik.isSubmitting} />
        <View flex="1">
          <View style={flexGrow}>
            <View px="4" py="4">
              <View>
                <IconButton size={36} onPress={goBack}>
                  <ChevronLeftIcon />
                </IconButton>
              </View>
              <Heading>{translate('Photos')}</Heading>
              <View mt="4">
                <Text>
                  {translate(
                    'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)',
                  )}
                </Text>
              </View>
            </View>

            <View p="4">
              <HStack style={[flexDirectionRow, flexWrapWrap]}>
                {mediaFiles?.map(item => {
                  return (
                    <View
                      key={item._id}
                      style={[padding(spacing.xxs), width('33%')]}
                    >
                      <UploadPhotoCard
                        key={item._id}
                        value={item.location}
                        onPress={() => {
                          if (item._id) {
                            handleClickPhotoCard(item._id);
                          }
                        }}
                      ></UploadPhotoCard>
                    </View>
                  );
                })}
                {[...Array(6 - profilePublicPhotosLength)].map(
                  (item, index) => {
                    return (
                      <View
                        key={index}
                        style={[padding(spacing.xxs), width('33%')]}
                      >
                        <UploadPhotoCard
                          value={
                            formik.values.photos[index]
                              ? formik.values.photos[index].path
                              : ''
                          }
                          onPress={() => {
                            handleClickPhotoCard(index);
                          }}
                        />
                      </View>
                    );
                  },
                )}
              </HStack>
            </View>
          </View>

          <View px="4" py="4">
            <Button
              isLoading={formik.isSubmitting}
              onPress={() => {
                formik.handleSubmit();
              }}
            >
              {translate('Complete')}
            </Button>
          </View>
        </View>
      </Box>

      <Actionsheet
        isOpen={removePhotoIndex !== undefined}
        onClose={handleCloseRemovePhotoCard}
      >
        <Actionsheet.Content>
          <View mb="8">
            <Text color="gray.500">
              {translate('Remove w', { w: translate('photo') })}
            </Text>
          </View>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item
            onPress={handleRemovePhotoCardById}
            style={[justifyContentCenter, alignItemsCenter]}
          >
            <Text color="red.500">{translate('Remove')}</Text>
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item style={[justifyContentCenter, alignItemsCenter]}>
            <Text>{translate('Cancel')}</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>

      <PhotoRequestPermission />
    </>
  );
};
