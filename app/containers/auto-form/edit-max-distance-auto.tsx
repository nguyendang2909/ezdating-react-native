import { HStack, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useUpdateMyProfileFilterMutation } from 'app/api';
import { useAppSelector, useMessages } from 'app/hooks';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

export const EditMaxDistanceAuto = () => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const { width } = Dimensions.get('window');
  const [updateMyProfileFilter] = useUpdateMyProfileFilterMutation();
  const filterMaxDistance = useAppSelector(s => s.app.profileFilter.maxDistance) || 50;
  const [maxDistance, setMaxDistance] = useState<number>(filterMaxDistance);

  const handleSubmit = async (e: number) => {
    try {
      await updateMyProfileFilter({ maxDistance: e }).unwrap();
    } catch (err) {
      setMaxDistance(filterMaxDistance);
      Toast.show({
        text1: formatErrorMessage(err),
        type: 'error',
      });
    }
  };

  const handleDebounce = useRef(_.debounce(e => handleSubmit(e), 3000)).current;

  const handleChange = async (e: number[]) => {
    if (e[0] && e[0] !== maxDistance) {
      setMaxDistance(e[0]);
      handleDebounce(e[0]);
    }
  };

  return (
    <>
      <View>
        <View mx={16}>
          <HStack justifyContent="space-between">
            <Text numberOfLines={1}>{formatMessage('Distance preference')}</Text>
            <Text textAlign="right" numberOfLines={1} flexGrow={1}>{`${maxDistance} km`}</Text>
          </HStack>
        </View>

        <View mx={16} alignItems="center">
          <MultiSlider
            values={[filterMaxDistance]}
            sliderLength={width - 48}
            onValuesChange={handleChange}
            min={0}
            max={100}
            step={1}
            allowOverlap={false}
            snapped
            minMarkerOverlapDistance={40}
          />
        </View>
      </View>
    </>
  );
};
