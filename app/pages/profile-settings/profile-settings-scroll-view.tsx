import { Divider, ScrollView, Text, View } from '@gluestack-ui/themed';
import { EditFilterGenderAuto, EditMaxDistanceAuto } from 'app/containers';
import { EditFilterAgeAuto } from 'app/containers/auto-form/edit-filter-age-auto';
import { LogoutButton } from 'app/containers/Button/LogoutButton';
import { useMessages } from 'app/hooks';

export const ProfileSettingScrollView = () => {
  const { formatMessage } = useMessages();
  return (
    <>
      <ScrollView>
        <View mt={16} mb={16}>
          <View mb={8}>
            <View px={16}>
              <Text bold={true} textTransform="uppercase" numberOfLines={1}>
                {formatMessage('Discovery settings')}
              </Text>
            </View>

            <View mt={16}>
              <View py={16} backgroundColor="$backgroundLight0">
                <EditMaxDistanceAuto />
              </View>
              <Divider />
              <View backgroundColor="$backgroundLight0">
                <EditFilterGenderAuto />
              </View>
              <Divider />
              <View py={16} backgroundColor="$backgroundLight0">
                <EditFilterAgeAuto />
              </View>
            </View>
          </View>
        </View>

        <View mt={16}>
          <View px={12}>
            <LogoutButton />
          </View>
        </View>
      </ScrollView>
    </>
  );
};
