import styled from '@emotion/styled';

const GoogleSignInButtonContainer = styled.div`
  width: fit-content;
`;

export const GoogleSignInButton = () => {
  return (
    <GoogleSignInButtonContainer
      id="g_id_onload"
      className="g_id_signin"
      data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
      data-login_uri={process.env.NEXT_PUBLIC_GOOGLE_CALLBACK_URL}
    />
  );
};
