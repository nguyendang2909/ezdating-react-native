import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetFlatList,
  ActionsheetItem,
  Box,
  Heading,
  Text,
} from '@gluestack-ui/themed';
import { useDisclose } from 'app/hooks';
import { useMessages } from 'app/hooks/useMessages';
import _ from 'lodash';
import {
  ChevronDownIcon,
  FormControl,
  Input,
  Pressable,
  Stack,
  View,
  WarningOutlineIcon,
} from 'native-base';
import React from 'react';

import countries from '../../data/countries.json';
import states from '../../data/states.json';

type FCProps = {
  error?: string;
  isRequired?: boolean;
  onChangeCountry: (value: string) => void;
  onChangeCity: (value: string | undefined) => void;
  countryValue: string;
  cityValue?: string;
};

export const SelectCountryFormControl: React.FC<FCProps> = ({
  error,
  countryValue,
  cityValue,
  onChangeCountry,
  onChangeCity,
  isRequired,
}) => {
  const { formatMessage } = useMessages();

  const { isOpen: isOpenCountry, onOpen: onOpenCountry, onClose: onCloseCountry } = useDisclose();
  const { isOpen: isOpenCity, onOpen: onOpenCity, onClose: onCloseCity } = useDisclose();

  const statesOfCountry = _.orderBy(_.get(states, countryValue, []), ['name'], ['asc']);

  const handleChangeCountry = (e: string) => {
    onChangeCountry(e);
    onCloseCountry();
    onChangeCity(undefined);
  };

  const handleOpenCountry = () => {
    onOpenCountry();
  };

  const handleOpenCity = () => {
    onOpenCity();
  };

  const handleChangeCity = (e: string) => {
    console.log(e);
    onChangeCity(e);
    onCloseCity();
  };

  return (
    <>
      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>{formatMessage('Country')}</FormControl.Label>
          <Pressable onPress={handleOpenCountry}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={formatMessage('Please select')}
              value={countryValue ? countries.find(e => e.iso2 === countryValue)?.native : ''}
              InputRightElement={<ChevronDownIcon />}
              onPressIn={handleOpenCountry}
            ></Input>
          </Pressable>
          <View pb={2}>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </View>
        </Stack>
      </FormControl>

      <FormControl {...(isRequired ? { isRequired } : {})} isInvalid={!!error}>
        <Stack>
          <FormControl.Label>{formatMessage('City')}</FormControl.Label>
          <Pressable onPress={handleOpenCity}>
            <Input
              isReadOnly
              size="lg"
              variant="underlined"
              placeholder={formatMessage('Please select')}
              value={
                statesOfCountry
                  ? statesOfCountry.find((e: { _id: string | undefined }) => e._id === cityValue)
                      ?.name
                  : ''
              }
              InputRightElement={<ChevronDownIcon />}
              onPressIn={handleOpenCity}
            ></Input>
          </Pressable>
          <View pb={2}>
            <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
              {error}
            </FormControl.ErrorMessage>
          </View>
        </Stack>
      </FormControl>

      <Actionsheet isOpen={isOpenCountry} onClose={onCloseCountry}>
        <ActionsheetBackdrop />
        <ActionsheetContent maxHeight="75%">
          <Box mb={4} mt={4}>
            <Heading size="sm" textAlign="center">
              {formatMessage('Country')}
            </Heading>
          </Box>
          <ActionsheetFlatList
            data={countries}
            keyExtractor={(e: any) => e.iso2}
            renderItem={({ index, item }: { item: any; index: number }) => {
              return (
                <ActionsheetItem
                  key={item.iso2}
                  onPress={() => {
                    handleChangeCountry(item.iso2);
                  }}
                >
                  <Text fontWeight={item._id === cityValue ? 'bold' : undefined}>{item.name}</Text>
                </ActionsheetItem>
              );
            }}
          ></ActionsheetFlatList>
          <Box mt={30}></Box>
        </ActionsheetContent>
      </Actionsheet>

      {statesOfCountry && (
        <Actionsheet isOpen={isOpenCity} onClose={onCloseCity}>
          <ActionsheetBackdrop />
          <ActionsheetContent maxHeight="75%">
            <Box mb={4} mt={4}>
              <Heading size="sm" textAlign="center">
                {formatMessage('City')}
              </Heading>
            </Box>
            <ActionsheetFlatList
              data={statesOfCountry}
              keyExtractor={(e: any) => e.iso2}
              renderItem={({ index, item }: { item: any; index: number }) => {
                return (
                  <ActionsheetItem
                    key={item._id}
                    onPress={() => {
                      handleChangeCity(item._id);
                    }}
                  >
                    <Text fontWeight={item._id === cityValue ? 'bold' : undefined}>
                      {item.name}
                    </Text>
                  </ActionsheetItem>
                );
              }}
            ></ActionsheetFlatList>
            <Box mt={30}></Box>
          </ActionsheetContent>
        </Actionsheet>
      )}
    </>
  );
};
