import { Button, ButtonText, Text, View } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { SearchImage } from 'app/components';
import { LoadingButton } from 'app/components/Button';
import { SCREENS } from 'app/constants';
import { useMessages } from 'app/hooks';
import React from 'react';

type FCProps = {
  refresh: () => void;
  isRefreshing: boolean;
};

export const DatingNearbyNoCard: React.FC<FCProps> = ({ refresh, isRefreshing }) => {
  const { formatMessage } = useMessages();

  const navigation = useNavigation();

  const handleChangeFilter = () => {
    navigation.navigate(SCREENS.DATING_NEARBY_FILTER);
  };

  const handleReload = () => {
    refresh();
  };

  return (
    <>
      <View flex={1} justifyContent="center">
        <View>
          <View px={16} alignItems="center">
            <SearchImage />
          </View>
          <View px={16} mt={24}>
            <Text textAlign="center">
              {formatMessage('No users found around you. Try changing the filter and reload.')}
            </Text>
          </View>
          <View px={16} mt={24}>
            <View rowGap={16}>
              <Button bgColor="$primary500" onPress={handleChangeFilter}>
                <ButtonText>{formatMessage('Change your filter')}</ButtonText>
              </Button>
              <LoadingButton isLoading={isRefreshing} onPress={handleReload}>
                {formatMessage('Reload')}
              </LoadingButton>
            </View>
          </View>
        </View>
      </View>
    </>
  );
};
