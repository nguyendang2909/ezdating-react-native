import { HStack, Text, View } from '@gluestack-ui/themed';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { useUpdateProfileMutation } from 'app/api';
import { useAppSelector, useMessages } from 'app/hooks';
import { ApiRequest } from 'app/types';
import _ from 'lodash';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import Toast from 'react-native-toast-message';

export const EditFilterAgeAuto = () => {
  const { formatMessage, formatErrorMessage } = useMessages();
  const [updateProfile] = useUpdateProfileMutation();

  const filterMinAge = useAppSelector(s => s.app.profile.filterMinAge) || 18;
  const filterMaxAge = useAppSelector(state => state.app.profile?.filterMaxAge) || 99;
  const { width } = Dimensions.get('window');

  const [min, setMin] = useState<number>(filterMinAge);
  const [max, setMax] = useState<number>(filterMaxAge);

  const handleChange = (e: number[]) => {
    if (e[0] && e[1]) {
      if (e[0] !== min || e[1] !== max) {
        setMin(e[0]);
        setMax(e[1]);
        handleDebounce({ filterMinAge: e[0], filterMaxAge: e[1] });
      }
    }
  };

  const handleDebounce = useRef(
    _.debounce((e: ApiRequest.UpdateProfile) => handleSubmit(e), 3000),
  ).current;

  const handleSubmit = async (e: ApiRequest.UpdateProfile) => {
    try {
      await updateProfile(e).unwrap();
    } catch (err) {
      setMin(filterMinAge);
      setMax(filterMaxAge);
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
