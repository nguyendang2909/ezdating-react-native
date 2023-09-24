import { config as defaultConfig, createConfig } from '@gluestack-ui/themed';
import LinearGradient from 'react-native-linear-gradient';

export const glueStackConfig = createConfig({
  ...defaultConfig.theme,
  aliases: {
    ...defaultConfig.theme.aliases,
  },
  components: {
    LinearGradient: {
      theme: {
        props: {
          as: LinearGradient,
        },
      },
    },
    Button: {
      theme: {
        borderRadius: 100,
        variants: {
          variant: {
            solid: {
              bg: '$red500',
            },
          },
        },
      },
    },
  },
});

// Get the type of Config
type ConfigType = typeof glueStackConfig;

// Extend the internal ui config
declare module '@gluestack-ui/themed' {
  type UIConfig = ConfigType;
}
