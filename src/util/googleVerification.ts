import { OAuth2Client } from "google-auth-library";
import { GOOGLE_CLIENT_ID } from "../config/constants";
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const googleVerification = async (token: string) => {
  let payload = null;
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
    if (payload?.email_verified)
      return { email: payload.email, username: payload.name, error: false };
    else return { error: true };
  } catch (_) {
    return { error: true };
  }
};

export default googleVerification;
