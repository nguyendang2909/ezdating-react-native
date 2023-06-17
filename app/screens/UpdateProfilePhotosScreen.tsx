import { UploadPhotoCard } from 'app/components/Form/UploadPhotoCard';
import { LoadingScreen } from 'app/components/Screen/LoadingScreen';
import { translate } from 'app/i18n';
import {
  flexDirectionRow,
  flexGrow,
  flexWrapWrap,
  padding,
  width,
} from 'app/styles';
import { spacing } from 'app/theme';
import { useFormik } from 'formik';
import { Box, Button, Heading, HStack, Text, View } from 'native-base';
import React from 'react';

type FCProps = {};

export const UpdateProfilePhotosScreen: React.FC<FCProps> = () => {
  const formik = useFormik({
    initialValues: {},
    onSubmit: values => {},
  });
  return (
    <>
      <Box flex="1" safeAreaY>
        <LoadingScreen isLoading={formik.isSubmitting} />
        <View flex="1">
          <View style={flexGrow}>
            <View px="4" py="4">
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
                      <UploadPhotoCard />
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
    </>
  );
};
