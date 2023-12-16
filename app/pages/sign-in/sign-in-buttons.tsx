import { View, VStack } from '@gluestack-ui/themed';
import { SignInWithPhoneNumberButton } from 'app/pages/sign-in/sign-in-with-phone-number/sign-in-with-phone-number-button';
import { SignInMethod } from 'app/types';
import { useState } from 'react';

import { SignInWithGoogleButton } from './sign-in-with-google/sign-in-with-google-button';

export const SignInButtons = () => {
  const [signInMethod, setSignInMethod] = useState<SignInMethod | null>(null);

  return (
    <>
      <VStack rowGap={16}>
        <View>
          <SignInWithPhoneNumberButton
            signInMethod={signInMethod}
            setSignInMethod={setSignInMethod}
          />
        </View>
        {/* <View>
          <SignInWithFacebookButton />
        </View> */}
        <View>
          <SignInWithGoogleButton signInMethod={signInMethod} setSignInMethod={setSignInMethod} />
        </View>
      </VStack>
    </>
  );
};
