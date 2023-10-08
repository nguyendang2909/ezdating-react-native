import { config as defaultConfig, createConfig } from '@gluestack-ui/themed';

export const glueStackConfig = createConfig({
  ...defaultConfig.theme,
  aliases: {
    ...defaultConfig.theme.aliases,
  },
  // components: {
  //   LinearGradient: {
  //     theme: {
  //       props: {
  //         as: LinearGradient,
  //       },
  //     },
  //   },
  //   Button: {
  //     theme: {
  //       borderRadius: 100,
  //       variants: {
  //         variant: {
  //           solid: {
  //             bg: '$red500',
  //           },
  //         },
  //       },
  //     },
  //   },
  // },
  // plugins: [new AnimationResolver(MotionAnimationDriver)],
});

type Config = typeof glueStackConfig; // Assuming `config` is defined elsewhere

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IConfig {}

export type { UIComponents, UIConfig } from '@gluestack-ui/themed';

declare module '@gluestack-ui/themed' {
  interface UIConfig extends Omit<Config, keyof IConfig>, IConfig {}
}
