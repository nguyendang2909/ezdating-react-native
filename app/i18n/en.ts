const en = {
  appName: 'EZ Dating',
  common: {
    ok: 'OK!',
    cancel: 'Cancel',
    back: 'Back',
  },
  constants: {
    userGenders: {
      1: 'Male',
      2: 'Female',
    },
    userRelationshipStatuses: {
      1: 'Single',
      2: 'Have boy/girl friend',
      3: 'Married',
      4: 'Divorced without children',
      5: 'Divorced with children',
      6: 'Single mom/dad',
    },
    userRelationshipGoals: {
      1: 'Boy/Girl friend',
      2: 'Make friends',
      3: 'Sex partner',
      4: 'Get married',
      5: 'One-Night stand',
    },
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
  'Add languages': 'Add languages',
  'About me': 'About me',
  Account: 'Account',
  'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)':
    'Add picture profile (Please choose photos that clearly shows your face, up to 6 photos)',
  // b
  Birthday: 'Birthday',
  birthday: 'birthday',
  // c
  Cancel: 'Cancel',
  cancel: 'cancel',
  cm: 'cm',
  Complete: 'Complete',
  complete: 'complete',
  Continue: 'Continue',
  continue: 'continue',
  'Control your profile': 'Control your profile',
  // d
  'desire relation': 'desire relation',
  'Do not share verification code to protect your account':
    'Do not share verification code to protect your account',
  "Don't show my age": "Don't show my age",
  "Don't show my distance": "Don't show my distance",
  // e
  'Edit profile': 'Edit profile',
  'Enter your code': 'Enter your code',
  'Enter your phone number': 'Enter your phone number',
  'Enter your first name': 'Enter your first name',
  'Enter your last name': 'Enter your last name',
  'Error, please try again!': 'Error, please try again!',
  // f
  Fail: 'Fail',
  fail: 'fail',
  Female: 'Female',
  female: 'female',
  'First name': 'First name',
  'Free coins': 'Free coins',
  Friend: 'Friend',
  Friends: 'Friends',
  friend: 'friend',
  friends: 'friends',
  // g
  Gender: 'Gender',
  gender: 'gender',
  // h
  Height: 'Height',
  height: 'height',
  // i
  'I am looking for': 'I am looking for',
  Introduce: 'Introduce',
  introduce: 'introduce',
  Invite: 'Invite',
  // j
  'Job title': 'Job title',
  'job title': 'job title',
  // k
  kg: 'kg',
  // l
  Language: 'Language',
  language: 'language',
  Languages: 'Languages',
  languages: 'languages',
  'Last name': 'Last name',
  LGBT: 'LGBT',
  'Liked you': 'Liked you',
  'Looking for': 'Looking for',
  Logout: 'Logout',
  Lover: 'Lover',
  lover: 'lover',
  // m
  Male: 'Male',
  male: 'male',
  marriage: 'marriage',
  Marriage: 'Marriage',
  Messages: 'Messages',
  'My w is': 'My {{w}} is',
  // n
  Nearby: 'Nearby',
  Next: 'Next',
  Nickname: 'Nickname',
  nickname: 'nickname',
  'Nickname is required!': 'Nickname is required!',
  Notes: 'Notes',
  // o
  'One-night stand': 'One-Night stand',
  'Open Settings': 'Open settings',
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
  'Please enter a valid phone number!': 'Please enter a valid phone number!',
  'Please enter your w': 'Please enter your {{w}}',
  'Please enter your w!': 'Please enter your {{w}}!',
  'Please input the phone number to sign in':
    'Please input the phone number to sign in',
  'Please input the OTP code to sign in':
    'Please input the OTP code to sign in',
  'Please select': 'Please select',
  Profile: 'Profile',
  profile: 'profile',
  // r
  Relationship: 'Relationship',
  'Relationship goal': 'Relationship goal',
  'Relationship status': 'Relationship status',
  Remove: 'Remove',
  remove: 'remove',
  'Remove w': 'Remove {{w}}',
  'Remove w failed!': 'Remove {{w}} failed!',
  Resend: 'Resend',
  'Retype password': 'Retype password',
  'Sign in with w': 'Sign in with {{w}}',
  'Sign in': 'Sign in',
  'Your profile': 'Your profile',
  EZDating: 'EZDating',
  // s
  Save: 'Save',
  Settings: 'Settings',
  Success: 'Success',
  success: 'success',
  // u
  'Unable to connect': 'Unable to connect',
  'Update w failed!': 'Update {{w}} failed!',
  'Update w successfully': 'Update {{w}} successfully',
  'Upload w': 'Upload {{w}}',
  // v
  'Verify your w': 'Verify your {{w}}',
  Visitors: 'Visitors',
  // w
  'w is required!': '{{w}} is required!',
  Weight: 'Weight',
  weight: 'weight',
  'What is your w?': 'What is your {{w}}?',
  'What are you looking for here?': 'What are you looking for here?',
  'Wrong verification code, try again!': 'Wrong verification code, try again!',
};

export default en;
export type Translations = typeof en;
