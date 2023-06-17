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
  // a
  'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)':
    'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)',
  // b
  Birthday: 'Birthday',
  birthday: 'birthday',
  // c
  Continue: 'Continue',
  continue: 'continue',
  Complete: 'Complete',
  complete: 'complete',
  // d
  'desire relation': 'desire relation',
  'Do not share verification code to protect your account':
    'Do not share verification code to protect your account',
  // e
  'Enter your phone number': 'Enter your phone number',
  'Enter your first name': 'Enter your first name',
  'Enter your last name': 'Enter your last name',
  'Error, please try again!': 'Error, please try again!',
  // f
  Female: 'Female',
  female: 'female',
  'First name': 'First name',
  Friend: 'Friend',
  Friends: 'Friends',
  friend: 'friend',
  friends: 'friends',
  // g
  Gender: 'Gender',
  gender: 'gender',
  // i
  'Input OTP': 'Input OTP',
  Introduce: 'Introduce',
  introduce: 'introduce',
  // l
  'Last name': 'Last name',
  LGBT: 'LGBT',
  Lover: 'Lover',
  lover: 'lover',
  // m
  Male: 'Male',
  male: 'male',
  marriage: 'marriage',
  Marriage: 'Marriage',
  Messages: 'Messages',
  // n
  Next: 'Next',
  Nickname: 'Nickname',
  nickname: 'nickname',
  'Nickname is required!': 'Nickname is required!',
  Notes: 'Notes',
  // o
  'One-night stand': 'One-Night stand',
  // p
  Partner: 'Partner',
  partner: 'partner',
  Password: 'Password',
  'Phone number': 'Phone number',
  'phone number': 'phone number',
  'Phone number is not valid!': 'Phone number is not valid!',
  Photo: 'Photo',
  photo: 'photo',
  Photos: 'Photos',
  photos: 'photos',
  'Please choose your w!': 'Please choose your {{w}}!',
  'Please enter your w': 'Please enter your {{w}}',
  'Please enter your w!': 'Please enter your {{w}}!',
  'Please input the phone number to sign in':
    'Please input the phone number to sign in',
  'Please input the OTP code to sign in':
    'Please input the OTP code to sign in',
  'Please select': 'Please select',
  Profile: 'Profile',
  'Retype password': 'Retype password',
  'Sign in with phone number': 'Sign in with phone number',
  'Sign in': 'Sign in',
  'Your profile': 'Your profile',
  EZDating: 'EZDating',
  // w
  'w is required!': '{{w}} is required!',
  'What is your w?': 'What is your {{w}}?',
  'What are you looking for here?': 'What are you looking for here?',
  'Wrong verification code, try again!': 'Wrong verification code, try again!',
};

export default en;
export type Translations = typeof en;
