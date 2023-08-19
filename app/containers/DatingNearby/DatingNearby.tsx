import { useNavigation } from '@react-navigation/native';
import { useAppSelector } from 'app/hooks';
import { aspectRatio } from 'app/styles';
import { Avatar, Box, FlatList, Pressable, Text } from 'native-base';
import React from 'react';
import { RefreshControl } from 'react-native';

export const DatingNearby: React.FC = () => {
  const navigator = useNavigation();
  const users = useAppSelector(state => state.user.nearby.data);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          ></RefreshControl>
        }
        numColumns={2}
        data={users}
        renderItem={({ item }) => {
          const handlePressCard = () => {
            navigator.navigate('ProfileNearby', {
              userId: item._id,
            });
          };
          return (
            <Box width={'50%'}>
              <Box p={4}>
                <Pressable onPress={handlePressCard}>
                  <Box width="100%" style={aspectRatio(1)}>
                    <Avatar
                      width="100%"
                      height="100%"
                      source={{
                        uri: item.mediaFiles?.length
                          ? item.mediaFiles[0].location
                          : '',
                      }}
                    ></Avatar>
                  </Box>
                  <Box>
                    <Text textAlign="center">
                      {item.nickname} {item.age}
                    </Text>
                  </Box>
                </Pressable>
              </Box>
            </Box>
          );
        }}
      ></FlatList>
    </>
  );
};
