import { useActionSheet } from '@expo/react-native-action-sheet';
import { useAppSelector } from 'app/hooks';
import { translate } from 'app/i18n';
import { mediaFilesApi } from 'app/services/api/media-files.api';
import { usersApi } from 'app/services/api/users.api';
import { appActions } from 'app/store/app.store';
import { flexDirectionRow, flexWrapWrap, padding, width } from 'app/styles';
import { spacing } from 'app/theme';
import _ from 'lodash';
import { HStack, View } from 'native-base';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { useDispatch } from 'react-redux';

import { ProfileEditMediaFileCard } from './MediaFileCard';

export const ProfileEditPhotos: React.FC = () => {
  const dispatch = useDispatch();

  // const [submitRemovePhoto] = api.useRemovePhotoMutation();

  const mediaFiles =
    useAppSelector(state => state.app.profile?.mediaFiles) || [];

  const [loadings, setLoadings] = useState<boolean[]>([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const mediaFilesLength = mediaFiles.length;

  const { showActionSheetWithOptions } = useActionSheet();

  const handleRemoveMediaFile = async (index: number, _id: string) => {
    try {
      const newLoadings = _.cloneDeep(loadings);

      newLoadings[index] = true;

      setLoadings(newLoadings);

      await mediaFilesApi.removePhoto(_id);

      const profile = await usersApi.getMyProfile();

      if (profile.data) {
        dispatch(appActions.updateProfile(profile.data));
      }
    } catch (err) {
    } finally {
      const newLoadings = _.cloneDeep(loadings);

      newLoadings[index] = false;

      setLoadings(newLoadings);
    }
  };

  const handleUploadPhoto = async (index: number) => {
    try {
      if (Platform.OS === 'ios') {
        const permission = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

        if (permission !== RESULTS.GRANTED) {
          const requestPermission = await request(
            PERMISSIONS.IOS.PHOTO_LIBRARY,
          );

          if (
            requestPermission !== RESULTS.LIMITED &&
            requestPermission !== RESULTS.GRANTED
          ) {
            console.log('Permissions to access camera has been blocked');

            return;
          }
        }
      }

      const photo = await ImageCropPicker.openPicker({
        width: 640,
        height: 860,
        cropping: true,
        mediaType: 'photo',
        forceJpg: true,
      });

      const newLoadings = _.cloneDeep(loadings);

      newLoadings[index] = true;

      setLoadings(newLoadings);

      await mediaFilesApi.uploadPhoto({ file: photo });
    } catch (err) {
    } finally {
      const newLoadings = _.cloneDeep(loadings);

      newLoadings[index] = false;

      setLoadings(newLoadings);
    }
  };

  const handlePress = async (index: number, _id?: string) => {
    if (_id) {
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
            case 0:
              handleRemoveMediaFile(index, _id);
              break;
          }
        },
      );
    } else {
      showActionSheetWithOptions(
        {
          showSeparators: true,
          options: [
            translate('Upload w', { w: translate('photo') }),
            translate('Cancel'),
          ],
          cancelButtonIndex: 1,
          useModal: true,
        },
        (selectedIndex: number) => {
          switch (selectedIndex) {
            case 0:
              handleUploadPhoto(index);
              break;
          }
        },
      );
    }
  };

  const files = mediaFiles.concat([...Array(6 - mediaFilesLength)]);

  return (
    <>
      <HStack style={[flexDirectionRow, flexWrapWrap]}>
        {files.map((item, index) => {
          const isLoading = loadings[index];
          return (
            <View key={index} style={[padding(spacing.xxs), width('33%')]}>
              <ProfileEditMediaFileCard
                value={item?.location}
                isLoading={isLoading}
                onPress={() => {
                  if (!isLoading) {
                    handlePress(index, item?._id);
                  }
                }}
              ></ProfileEditMediaFileCard>
            </View>
          );
        })}
      </HStack>
    </>
  );
};
