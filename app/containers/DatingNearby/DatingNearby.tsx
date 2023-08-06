import { useAppSelector } from 'app/hooks';
import { aspectRatio } from 'app/styles';
import { Avatar, Box, FlatList, Text } from 'native-base';
import React from 'react';
import { RefreshControl } from 'react-native';

export const DatingNearby: React.FC = () => {
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
          return (
            <Box width={'50%'}>
              <Box p={4}>
                <Box width="100%" style={aspectRatio(1)}>
                  <Avatar
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: item.avatarFile?.location }}
                  ></Avatar>
                </Box>
                <Box>
                  <Text textAlign="center">
                    {item.nickname} {item.age}
                  </Text>
                </Box>
              </Box>
            </Box>
          );
        }}
      ></FlatList>
    </>
  );
};
