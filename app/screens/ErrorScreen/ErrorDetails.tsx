import { Button, Text } from '@gluestack-ui/themed';
import React, { ErrorInfo } from 'react';
import { ScrollView, TextStyle, View, ViewStyle } from 'react-native';

import { Icon, Screen } from '../../components';
import { colors, spacing } from '../../theme';

export interface ErrorDetailsProps {
  error: Error;
  errorInfo: ErrorInfo;
  onReset(): void;
}

export function ErrorDetails(props: ErrorDetailsProps) {
  return (
    <Screen
      preset="fixed"
      safeAreaEdges={['top', 'bottom']}
      contentContainerStyle={$contentContainer}
    >
      <View style={$topSection}>
        <Icon icon="ladybug" size={64} />
        <Text style={$heading}>Error</Text>
        <Text>Error sub</Text>
      </View>

      <ScrollView style={$errorSection} contentContainerStyle={$errorSectionContentContainer}>
        <Text style={$errorContent} fontWeight="bold">
          {`props.error`.trim()}
        </Text>
        <Text selectable style={$errorBacktrace}>
          {`${props.errorInfo.componentStack}`.trim()}
        </Text>
      </ScrollView>

      <Button style={$resetButton} onPress={props.onReset}>
        <Text>Reset</Text>
      </Button>
    </Screen>
  );
}

const $contentContainer: ViewStyle = {
  alignItems: 'center',
  paddingHorizontal: spacing.lg,
  paddingTop: spacing.xl,
  flex: 1,
};

const $topSection: ViewStyle = {
  flex: 1,
  alignItems: 'center',
};

const $heading: TextStyle = {
  color: colors.error,
  marginBottom: spacing.md,
};

const $errorSection: ViewStyle = {
  flex: 2,
  backgroundColor: colors.separator,
  marginVertical: spacing.md,
  borderRadius: 6,
};

const $errorSectionContentContainer: ViewStyle = {
  padding: spacing.md,
};

const $errorContent: TextStyle = {
  color: colors.error,
};

const $errorBacktrace: TextStyle = {
  marginTop: spacing.md,
  color: colors.textDim,
};

const $resetButton: ViewStyle = {
  backgroundColor: colors.error,
  paddingHorizontal: spacing.xxl,
};
