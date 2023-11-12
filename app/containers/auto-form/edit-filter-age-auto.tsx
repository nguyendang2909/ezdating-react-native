import { HStack, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useUpdateMyProfileFilterMutation } from 'app/api';
import { useAppSelector, useMessages } from 'app/hooks';
import { ApiRequest } from 'app/types';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

export const EditFilterAgeAuto = () => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [updateProfileFilter] = useUpdateMyProfileFilterMutation();

  const minAge = useAppSelector(s => s.app.profileFilter.minAge) || 18;
  const maxAge = useAppSelector(state => state.app.profileFilter.maxAge) || 99;
  const { width } = Dimensions.get('window');

  const [min, setMin] = useState<number>(minAge);
  const [max, setMax] = useState<number>(maxAge);

  const handleChange = (e: number[]) => {
    if (e[0] && e[1]) {
      if (e[0] !== min || e[1] !== max) {
        setMin(e[0]);
        setMax(e[1]);
        handleDebounce({ minAge: e[0], maxAge: e[1] });
      }
    }
  };

  const handleDebounce = useRef(
    _.debounce((e: ApiRequest.UpdateProfileFilter) => handleSubmit(e), 3000),
  ).current;

  const handleSubmit = async (e: ApiRequest.UpdateProfileFilter) => {
    try {
      await updateProfileFilter(e).unwrap();
    } catch (err) {
      Toast.show({
        text1: formatErrorMessage(err),
        type: 'error',
      });
    }
  };

  return (
    <>
      <View mx={16}>
        <HStack justifyContent="space-between">
          <Text>{formatMessage('Age preference')}</Text>
          <Text>
            {min} - {max}
          </Text>
        </HStack>
      </View>
      <View mx={16} alignItems="center">
        <MultiSlider
          values={[min, max]}
          sliderLength={width - 48}
          onValuesChange={handleChange}
          min={18}
          max={100}
          step={1}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={40}
          // customMarker={CustomMarker}
          // customLabel={CustomLabel}
        />
      </View>
    </>
  );
};
