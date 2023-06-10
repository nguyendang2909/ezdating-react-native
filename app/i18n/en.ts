const en = {
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back',
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: 'Your app, almost ready for launch!',
    exciting: '(ohh, this is exciting!)',
  },
  errorScreen: {
    title: 'Something went wrong!',
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: 'RESET APP',
  },
  emptyStateComponent: {
    generic: {
      heading: 'So empty... so sad',
      content:
        'No data found yet. Try clicking the button to refresh or reload the app.',
      button: "Let's try this again",
    },
  },
  'Do not share verification code to protect your account':
    'Do not share verification code to protect your account',
  'Enter your phone number': 'Enter your phone number',
  'Enter your first name': 'Enter your first name',
  'Enter your last name': 'Enter your last name',
  'Error, please try again!': 'Error, please try again!',
  'First name': 'First name',
  'Input OTP': 'Input OTP',
  'Last name': 'Last name',
  Messages: 'Messages',
  Next: 'Next',
  Notes: 'Notes',
  Password: 'Password',
  'Phone number': 'Phone number',
  'phone number': 'phone number',
  'Phone number is not valid!': 'Phone number is not valid!',
  'Please input the phone number to sign in':
    'Please input the phone number to sign in',
  'Please input the OTP code to sign in':
    'Please input the OTP code to sign in',
  Profile: 'Profile',
  'Retype password': 'Retype password',
  'Sign in with phone number': 'Sign in with phone number',
  'Sign in': 'Sign in',
  EZDating: 'EZDating',
  'What is your w?': 'What is your {{w}}?',
  'Wrong verification code, try again!': 'Wrong verification code, try again!',
};

export default en;
export type Translations = typeof en;
