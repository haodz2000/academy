import { GoogleSignInButton } from '@client/components/google/GoogleSignInButton';
import { useRenderGoogleSignIn } from '@client/components/google/hook';
import { useAppSelector } from '@client/stores';

export function Index() {
  const user = useAppSelector((state) => state.user.user);
  useRenderGoogleSignIn();
  return (
    <div>
      <div className="wrapper">
        {!user && <GoogleSignInButton />}
        Hello
      </div>
    </div>
  );
}

export default Index;
