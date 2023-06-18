import { useNavigation } from '@react-navigation/native';
import { UploadPhotoCard } from 'app/components/Form/UploadPhotoCard';
import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { translate } from 'app/i18n';
import { api } from 'app/services/api';
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
import { EUploadFileShare } from 'app/types/enums';
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
  View,
} from 'native-base';
import React, { useState } from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';

type FCProps = {};

export const UpdateProfilePhotosScreen: React.FC<FCProps> = () => {
  const { navigate, goBack } = useNavigation();
  const [removePhotoIndex, setRemovePhotoIndex] = useState<number | undefined>(
    undefined,
  );
  const [submitUploadPhoto] = api.useUploadPhotoMutation();
  const [updateProfile] = api.useUpdateProfileMutation();

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
            share: EUploadFileShare.public,
          }).unwrap();
          if (photoParts.length) {
            await Promise.all(
              photoParts.map(item =>
                submitUploadPhoto({
                  file: item,
                  share: EUploadFileShare.public,
                }).unwrap(),
              ),
            );
          }
        }
        await updateProfile({ haveBasicInfo: true });
      } catch (err) {
        console.log(err);
      }
    },
  });

  const handleRemovePhotoCardById = () => {
    if (removePhotoIndex !== undefined) {
      formik.setFieldValue(
        'photos',
        formik.values.photos.filter(
          (value, index) => index !== removePhotoIndex,
        ),
      );
      handleCloseRemovePhotoCard();
    }
  };

  const handleCloseRemovePhotoCard = () => {
    setRemovePhotoIndex(undefined);
  };

  const handleClickPhotoCard = async (index: number) => {
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
                {[...Array(6)].map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={[padding(spacing.xxs), width('33%')]}
                    >
                      <UploadPhotoCard
                        value={formik.values.photos[index]}
                        onPress={() => {
                          handleClickPhotoCard(index);
                        }}
                      />
                    </View>
                  );
                })}
              </HStack>
            </View>
          </View>

          <View px="4" py="4">
            <Button
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
    </>
  );
};
