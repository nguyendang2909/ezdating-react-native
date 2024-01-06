import { Text, View } from '@gluestack-ui/themed';
import { APP_CONFIG } from 'app/config/config.app';
import { useMessages } from 'app/hooks/useMessages';
import { TxKey } from 'app/types';
import React, { ReactElement } from 'react';
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

import { colors, spacing } from '../../theme';
import { ExtendedEdge, useSafeAreaInsetsStyle } from '../../utils/useSafeAreaInsetsStyle';
import { Icon, IconTypes } from '../Icons';

export interface HeaderProps {
  /**
   * The layout of the title relative to the action components.
   * - `center` will force the title to always be centered relative to the header. If the title or the action buttons are too long, the title will be cut off.
   * - `flex` will attempt to center the title relative to the action buttons. If the action buttons are different widths, the title will be off-center relative to the header.
   */
  titleMode?: 'center' | 'flex';
  /**
   * Optional title style override.
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Optional outer title container style override.
   */
  titleContainerStyle?: StyleProp<ViewStyle>;
  /**
   * Optional inner header wrapper style override.
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Optional outer header container style override.
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * Background color
   */
  backgroundColor?: string;
  /**
   * Title text to display if not using `tx` or nested components.
   */
  title?: string;
  /**
   * Title text which is looked up via i18n.
   */
  titleTx?: TxKey;
  // /**
  //  * Optional options to pass to i18n. Useful for interpolation
  //  * as well as explicitly setting locale or translation fallbacks.
  //  */
  // titleTxOptions?: TextProps['txOptions'];
  /**
   * Icon that should appear on the left.
   * Can be used with `onLeftPress`.
   */
  leftIcon?: IconTypes;
  /**
   * An optional tint color for the left icon
   */
  leftIconColor?: string;
  /**
   * Left action text to display if not using `leftTx`.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftText?: string;
  /**
   * Left action text text which is looked up via i18n.
   * Can be used with `onLeftPress`. Overrides `leftIcon`.
   */
  leftTx?: TxKey;
  /**
   * Left action custom ReactElement if the built in action props don't suffice.
   * Overrides `leftIcon`, `leftTx` and `leftText`.
   */
  LeftActionComponent?: ReactElement;
  // /**
  //  * Optional options to pass to i18n. Useful for interpolation
  //  * as well as explicitly setting locale or translation fallbacks.
  //  */
  // leftTxOptions?: TextProps['txOptions'];
  /**
   * What happens when you press the left icon or text action.
   */
  onLeftPress?: TouchableOpacityProps['onPress'];
  /**
   * Icon that should appear on the right.
   * Can be used with `onRightPress`.
   */
  rightIcon?: IconTypes;
  /**
   * An optional tint color for the right icon
   */
  rightIconColor?: string;
  /**
   * Right action text to display if not using `rightTx`.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightText?: string;
  /**
   * Right action text text which is looked up via i18n.
   * Can be used with `onRightPress`. Overrides `rightIcon`.
   */
  rightTx?: TxKey;
  /**
   * Right action custom ReactElement if the built in action props don't suffice.
   * Overrides `rightIcon`, `rightTx` and `rightText`.
   */
  RightActionComponent?: ReactElement;
  // /**
  //  * Optional options to pass to i18n. Useful for interpolation
  //  * as well as explicitly setting locale or translation fallbacks.
  //  */
  // rightTxOptions?: TextProps['txOptions'];
  /**
   * What happens when you press the right icon or text action.
   */
  onRightPress?: TouchableOpacityProps['onPress'];
  /**
   * Override the default edges for the safe area.
   */
  safeAreaEdges?: ExtendedEdge[];
}

interface HeaderActionProps {
  backgroundColor?: string;
  icon?: IconTypes;
  iconColor?: string;
  text?: string;
  tx?: TxKey;
  // txOptions?: TextProps['txOptions'];
  onPress?: TouchableOpacityProps['onPress'];
  ActionComponent?: ReactElement;
}

export function Header(props: HeaderProps) {
  const {
    backgroundColor = colors.background,
    LeftActionComponent,
    leftIcon,
    leftIconColor,
    leftText,
    leftTx,
    // leftTxOptions,
    onLeftPress,
    onRightPress,
    RightActionComponent,
    rightIcon,
    rightIconColor,
    rightText,
    rightTx,
    // rightTxOptions,
    safeAreaEdges = ['top'],
    title,
    titleMode = 'center',
    titleTx,
    // titleTxOptions,
    titleContainerStyle: $titleContainerStyleOverride,
    style: $styleOverride,
    titleStyle: $titleStyleOverride,
    containerStyle: $containerStyleOverride,
  } = props;

  const { formatMessage } = useMessages();

  const $containerInsets = useSafeAreaInsetsStyle(safeAreaEdges);

  const titleContent = titleTx ? formatMessage(titleTx) : title;

  return (
    <View
      w="$full"
      {...(backgroundColor ? { backgroundColor } : {})}
      style={[$containerInsets, $containerStyleOverride]}
    >
      <View
        height={APP_CONFIG.SIZE.TOP_BAR.HEIGHT}
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        style={$styleOverride}
      >
        <HeaderAction
          tx={leftTx}
          text={leftText}
          icon={leftIcon}
          iconColor={leftIconColor}
          onPress={onLeftPress}
          // txOptions={leftTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={LeftActionComponent}
        />

        {!!titleContent && (
          <View
            style={[
              titleMode === 'center' && $titleWrapperCenter,
              titleMode === 'flex' && $titleWrapperFlex,
              $titleContainerStyleOverride,
            ]}
            pointerEvents="none"
          >
            <Text fontWeight="$medium" size="md" style={[$title, $titleStyleOverride]}>
              {titleContent}
            </Text>
          </View>
        )}

        <HeaderAction
          tx={rightTx}
          text={rightText}
          icon={rightIcon}
          iconColor={rightIconColor}
          onPress={onRightPress}
          // txOptions={rightTxOptions}
          backgroundColor={backgroundColor}
          ActionComponent={RightActionComponent}
        />
      </View>
    </View>
  );
}

function HeaderAction(props: HeaderActionProps) {
  const {
    backgroundColor,
    icon,
    text,
    tx,
    // txOptions,
    onPress,
    ActionComponent,
    iconColor,
  } = props;

  const { formatMessage } = useMessages();

  const content = tx ? formatMessage(tx) : text;

  if (ActionComponent) return ActionComponent;

  if (content) {
    return (
      <TouchableOpacity
        style={[$actionTextContainer, { backgroundColor }]}
        onPress={onPress}
        disabled={!onPress}
        activeOpacity={0.8}
      >
        <Text fontWeight="$medium" size="md" style={$actionText}>
          {content}
        </Text>
      </TouchableOpacity>
    );
  }

  if (icon) {
    return (
      <Icon
        size={24}
        icon={icon}
        color={iconColor}
        onPress={onPress}
        containerStyle={[$actionIconContainer, { backgroundColor }]}
        // style={isRTL ? { transform: [{ rotate: '180deg' }] } : {}}
      />
    );
  }

  return <View style={[$actionFillerContainer, { backgroundColor }]} />;
}

const $title: TextStyle = {
  textAlign: 'center',
};

const $actionTextContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
};

const $actionText: TextStyle = {
  color: colors.tint,
};

const $actionIconContainer: ViewStyle = {
  flexGrow: 0,
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  paddingHorizontal: spacing.md,
  zIndex: 2,
};

const $actionFillerContainer: ViewStyle = {
  width: 16,
};

const $titleWrapperCenter: ViewStyle = {
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  width: '100%',
  position: 'absolute',
  paddingHorizontal: spacing.xxl,
  zIndex: 1,
};

const $titleWrapperFlex: ViewStyle = {
  justifyContent: 'center',
  flexGrow: 1,
};
