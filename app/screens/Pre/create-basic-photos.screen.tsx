import { useActionSheet } from '@expo/react-native-action-sheet';
import { StackActions, useNavigation } from '@react-navigation/native';
import {
  api,
  useRefreshAccessTokenMutation,
  useRemovePhotoMutation,
  useUploadBasicPhotoMutation,
} from 'app/api';
import { LoadingButton } from 'app/components/Button';
import { SCREENS } from 'app/constants';
import { PhotoRequestPermission } from 'app/containers/Photos/PhotoRequestPermission.ios';
import { ProfileEditMediaFileCard } from 'app/containers/ProfileEdit/ProfileEditPhotos/MediaFileCard';
import { useAppSelector, useMessages } from 'app/hooks';
import { AppStackScreenProps } from 'app/navigators';
import { appActions } from 'app/store/app.store';
import { flexDirectionRow, flexGrow, flexWrapWrap, padding, width } from 'app/styles';
import { spacing } from 'app/theme';
import _ from 'lodash';
import { Box, ChevronLeftIcon, Heading, HStack, IconButton, Text, View } from 'native-base';
import React, { useCallback, useState } from 'react';
import { Platform } from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { check, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

type FCProps = AppStackScreenProps<'CREATE_BASIC_PHOTOS'>;

export const CreateBasicPhotosScreen: React.FC<FCProps> = () => {
  const { formatMessage } = useMessages();
  const navigation = useNavigation();
  const [updateBasicPhoto] = useUploadBasicPhotoMutation();
  const [removePhoto] = useRemovePhotoMutation();
  const refreshToken = useAppSelector(s => s.app.refreshToken);
  const [refreshAccessToken, { isLoading: isLoadingRefreshAccessToken }] =
    useRefreshAccessTokenMutation();
  const mediaFiles = useAppSelector(state => state.app.profile?.mediaFiles) || [];
  const [loadings, setLoadings] = useState<boolean[]>([false, false, false, false, false, false]);
  const mediaFilesLength = mediaFiles.length;
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();

  const handleRemoveMediaFile = async (index: number, _id: string) => {
    try {
      const newLoadings = _.cloneDeep(loadings);
      newLoadings[index] = true;
      setLoadings(newLoadings);
      await removePhoto(_id).unwrap();
    } catch (err) {
      Toast.show({
        text1: formatMessage('Remove failed, please try again.'),
      });
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
          const requestPermission = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
          if (requestPermission !== RESULTS.LIMITED && requestPermission !== RESULTS.GRANTED) {
            console.log('Permissions to access camera has been blocked');

            return;
          }
        }
      } else if (Platform.OS === 'android') {
        const permission = await check(PERMISSIONS.ANDROID.CAMERA);
        if (permission !== RESULTS.GRANTED) {
          const requestPermission = await request(PERMISSIONS.ANDROID.CAMERA);
          if (requestPermission !== RESULTS.LIMITED && requestPermission !== RESULTS.GRANTED) {
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
      await updateBasicPhoto({ file: photo }).unwrap();
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
          options: [formatMessage('Remove the photo'), formatMessage('Cancel')],
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
          options: [formatMessage('Upload the photo'), formatMessage('Cancel')],
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

  const handleGoBack = useCallback(() => {
    if (navigation.canGoBack()) {
      navigation.goBack();
      return;
    }
    navigation.navigate(SCREENS.CREATE_BASIC_PROFILE);
  }, [navigation]);

  const handlePressComplete = useCallback(async () => {
    if (!mediaFiles.length) {
      Toast.show({ text1: formatMessage('Please upload at least 1 photo') });
      return;
    }
    if (!refreshToken) {
      dispatch(appActions.logout());
      dispatch(api.util.resetApiState());
      return;
    }
    const { data } = await refreshAccessToken({ refreshToken }).unwrap();
    dispatch(appActions.updateAccessToken({ accessToken: data.accessToken }));
    navigation.dispatch(StackActions.replace(SCREENS.Home, { screen: 'DatingSwipe' }));
  }, [dispatch, formatMessage, mediaFiles.length, navigation, refreshAccessToken, refreshToken]);

  return (
    <>
      <Box flex="1" safeAreaY>
        <View flex="1">
          <View style={flexGrow}>
            <View px="4" py="4">
              <View>
                <IconButton size={36} onPress={handleGoBack}>
                  <ChevronLeftIcon />
                </IconButton>
              </View>
              <Heading>{formatMessage('Photos')}</Heading>
              <View mt="4">
                <Text>
                  {formatMessage(
                    'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)',
                  )}
                </Text>
              </View>
            </View>

            <View p="4">
              <HStack style={[flexDirectionRow, flexWrapWrap]}>
                {files.map((item, index) => {
                  const isLoading = loadings[index];
                  return (
                    <View key={index} style={[padding(spacing.xxs), width('33%')]}>
                      <ProfileEditMediaFileCard
                        value={item?.key}
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
            </View>
          </View>

          <View px="4" py="4">
            <LoadingButton
              disabled={!mediaFiles.length}
              onPress={handlePressComplete}
              isLoading={isLoadingRefreshAccessToken}
            >
              {formatMessage('Complete')}
            </LoadingButton>
          </View>
        </View>
      </Box>

      {/* <Actionsheet isOpen={removePhotoIndex !== undefined} onClose={handleCloseRemovePhotoCard}>
        <Actionsheet.Content>
          <View mb="8">
            <Text color="gray.500">{formatMessage('Remove photo')}</Text>
          </View>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item
            onPress={handleRemovePhotoCardById}
            style={[justifyContentCenter, alignItemsCenter]}
          >
            <Text color="red.500">{formatMessage('Remove')}</Text>
          </Actionsheet.Item>
          <Divider borderColor="gray.300" />
          <Actionsheet.Item style={[justifyContentCenter, alignItemsCenter]}>
            <Text>{formatMessage('Cancel')}</Text>
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet> */}

      <PhotoRequestPermission />
    </>
  );
};
