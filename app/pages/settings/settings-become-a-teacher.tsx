import { Button, ButtonText, Heading, Pressable, Text, View } from '@gluestack-ui/themed';
import { useUpdateProfileMutation } from 'app/api';
import { AppIcon } from 'app/components';
import { SUBJECTS } from 'app/constants/teacher.constants';
import { useAppSelector, useDisclose, useMessages } from 'app/hooks';
import { Actionsheet } from 'native-base';
import React from 'react';

export const SettingsBecomeTeacher: React.FC = () => {
  const { formatMessage } = useMessages();
  const currentTeachingSubject = useAppSelector(e => e.app.profile.teachingSubject);
  const { isOpen, onOpen, onClose } = useDisclose();
  const [updateMutation] = useUpdateProfileMutation();
  const onPress = () => {
    onOpen();
  };

  const handleChange = async (value: string) => {
    try {
      await updateMutation({ teachingSubject: value }).unwrap();
    } catch (err) {
    } finally {
      onClose();
    }
  };

  return (
    <>
      <Pressable onPress={onPress}>
        {({ pressed }: { pressed: boolean }) => {
          return (
            <View
              borderWidth={1}
              borderRadius={8}
              borderColor="$amber500"
              bg={pressed ? '$amber600' : '$amber500'}
            >
              <View p={16}>
                <View>
                  <View justifyContent="space-between" flexDirection="row" alignItems="center">
                    <View flexDirection="row" alignItems="center">
                      <AppIcon />
                      <Text color="$white" bold>
                        Become the teacher
                      </Text>
                    </View>

                    {!currentTeachingSubject && (
                      <View>
                        <Button bgColor="$amber700" onPress={onPress}>
                          <ButtonText>Choose</ButtonText>
                        </Button>
                      </View>
                    )}
                  </View>
                  <View>
                    <Text color="$white">
                      {currentTeachingSubject
                        ? `You are teaching "${currentTeachingSubject}"`
                        : 'Help people improve their skills'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}
      </Pressable>

      <Actionsheet isOpen={isOpen} onClose={onClose}>
        <Actionsheet.Content>
          <View mb={4}>
            <Heading size="sm" textAlign="center">
              Teaching subject
            </Heading>
          </View>
          {SUBJECTS.map(value => {
            return (
              <Actionsheet.Item
                key={value}
                onPress={() => {
                  handleChange(value);
                }}
              >
                <Text fontWeight={currentTeachingSubject === value ? 'bold' : undefined}>
                  {value}
                </Text>
              </Actionsheet.Item>
            );
          })}
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
