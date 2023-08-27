// import { useActionSheet } from '@expo/react-native-action-sheet';
// import { useAppSelector } from 'app/hooks';
// import { translate } from 'app/i18n';
// import { api } from 'app/services/api';
// import { profileNotificationsService } from 'app/services/notifications/profile-notifications.service';
// import { padding, width } from 'app/styles';
// import { spacing } from 'app/theme';
// import { View } from 'native-base';
// import React from 'react';

// import { ProfileEditMediaFileCard } from './MediaFileCard';

// export const MediaFileUploadedCards: React.FC = () => {
//   const mediaFiles =
//     useAppSelector(state => state.app.profile.mediaFiles) || [];

//   const { showActionSheetWithOptions } = useActionSheet();

//   const [submitRemovePhoto] = api.useRemovePhotoMutation();

//   const handleRemovePhoto = async (_id: string) => {
//     try {
//       await submitRemovePhoto(_id).unwrap();

//       profileNotificationsService.success();
//     } catch (err) {
//       console.log(err);
//       profileNotificationsService.fail();
//     }
//   };

//   const handlePress = async (_id: string) => {
//     console.log(333);
//     showActionSheetWithOptions(
//       {
//         showSeparators: true,
//         options: [
//           translate('Remove w', { w: translate('photo') }),
//           translate('Cancel'),
//         ],
//         cancelButtonIndex: 1,
//         useModal: true,
//       },
//       (selectedIndex: number) => {
//         switch (selectedIndex) {
//           case 0:
//             handleRemovePhoto(_id);

//             break;
//         }
//       },
//     );
//   };

//   return (
//     <>
//       {mediaFiles?.map(item => {
//         return (
//           <View key={item._id} style={[padding(spacing.xxs), width('33%')]}>
//             <ProfileEditMediaFileCard
//               value={item?.location}
//               onPress={() => {
//                 handlePress(item._id);
//               }}
//             ></ProfileEditMediaFileCard>
//           </View>
//         );
//       })}
//     </>
//   );
// };
