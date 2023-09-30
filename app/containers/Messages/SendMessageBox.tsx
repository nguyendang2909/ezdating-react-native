import { RouteProp, useRoute } from '@react-navigation/native';
import { AppStackParamList } from 'app/navigators';
import { socketStoreActions } from 'app/store/socket.store';
import { FormParams } from 'app/types/form-params.type';
import { useFormik } from 'formik';
import { Box, Button, HStack, Input, Text } from 'native-base';
import React from 'react';
import { useDispatch } from 'react-redux';
import { v4 as uuidV4 } from 'uuid';

export const SendMessageBox: React.FC = () => {
  const dispatch = useDispatch();
  const route = useRoute<RouteProp<AppStackParamList, 'Messages'>>();

  const { conversation } = route.params;

  const matchId = conversation?._id;

  const formik = useFormik<FormParams.SendMessage>({
    initialValues: {
      text: '',
    },
    onSubmit: values => {
      if (!values.text) {
        return;
      }

      formik.setFieldValue('text', '');

      dispatch(
        socketStoreActions.sendMessage({
          ...values,
          uuid: uuidV4(),
          matchId,
        }),
      );
    },
  });

  if (!matchId) {
    return <></>;
  }

  return (
    <>
      <Box>
        <Box pt={3} pb={3} px={2}>
          <HStack space={2} alignItems="center">
            <Box flex={1}>
              <Input
                value={formik.values.text}
                size="lg"
                variant="rounded"
                placeholder={'Aa'}
                onChangeText={formik.handleChange('text')}
                maxLength={500}
              ></Input>
            </Box>
            <Button variant="link" onPress={() => formik.handleSubmit()}>
              <Text>Send</Text>
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
};
