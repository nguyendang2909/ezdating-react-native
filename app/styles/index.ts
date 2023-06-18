import { ColorValue, FlexStyle, TextStyle, ViewStyle } from 'react-native';

export const alignItemsCenter: ViewStyle = { alignItems: 'center' };

export const alignSelfStretch: { alignSelf: FlexStyle['alignSelf'] } = {
  alignSelf: 'stretch',
};

export const aspectRatio = (value: number): ViewStyle => ({
  aspectRatio: value,
});

export const backgroundColor = (value: string): ViewStyle => ({
  backgroundColor: value,
});

export const borderColor = (value: ColorValue): ViewStyle => ({
  borderColor: value,
});

export const borderRadius = (value: number) => ({
  borderRadius: value,
});

export const borderTopColor = (value: ColorValue): ViewStyle => ({
  borderTopColor: value,
});

export const borderWitdh = (value: number): ViewStyle => ({
  borderWidth: value,
});

export const flex = (value: number) => ({
  flex: value,
});

export const flexDirectionRow: ViewStyle = {
  flexDirection: 'row',
};

export const flexGrow: ViewStyle = { flexGrow: 1 };

export const flexWrapWrap: ViewStyle = { flexWrap: 'wrap' };

export const fontSize = (value: number): TextStyle => ({
  fontSize: value,
});

export const height = (value: number): ViewStyle => ({
  height: value,
});

export const heightFull: ViewStyle = { height: '100%' };

export const justifyContentCenter: {
  justifyContent: FlexStyle['justifyContent'];
} = { justifyContent: 'center' };

export const justifyContentSpaceEvenly: ViewStyle = {
  justifyContent: 'space-evenly',
};

export const lineHeight = (value: number): TextStyle => ({
  lineHeight: value,
});

export const marginHorizontal = (spacing: number): ViewStyle => ({
  marginHorizontal: spacing,
});

export const marginVertical = (spacing: number): ViewStyle => ({
  marginVertical: spacing,
});

export const marginBottom = (spacing: number): ViewStyle => ({
  marginBottom: spacing,
});

export const marginTop = (value: number): ViewStyle => ({
  marginTop: value,
});

export const marginBot = (value: number): ViewStyle => ({
  marginBottom: value,
});

export const maxHeight = (value: number): ViewStyle => ({
  maxHeight: value,
});

export const minHeight = (value: number): ViewStyle => ({
  minHeight: value,
});

export const opacity = (value: number) => ({ opacity: value });

export const padding = (value: number): ViewStyle => ({ padding: value });

export const paddingBottom = (spacing: number): ViewStyle => ({
  paddingBottom: spacing,
});

export const paddingHorizontal = (spacing: number): ViewStyle => ({
  paddingHorizontal: spacing,
});

export const paddingTop = (spacing: number): ViewStyle => ({
  paddingTop: spacing,
});

export const paddingVertical = (spacing: number): ViewStyle => ({
  paddingVertical: spacing,
});

export const posititionAbsolute: ViewStyle = {
  position: 'absolute',
};

export const textAlignCenter: TextStyle = {
  textAlign: 'center',
};

export const width = (value: string | number): ViewStyle => ({
  width: value,
});

export const widthFull: ViewStyle = {
  width: '100%',
};

export const zIndex = (value: number): ViewStyle => ({
  zIndex: value,
});
