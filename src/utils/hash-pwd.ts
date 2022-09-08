import * as crypto from 'crypto';

const salt =
  'V!%mNujoqY5ode2HYT4Y@sN!S$TtCUw4j99HMk6bft2C!hafNDzDCzwWp%rbWNbPCTFUVRHo%mcAjXjPWov9%3Rsh*#!%CDDnV&TXzHvoHS8pAN*^gjmtDWmxbncro43';

export const hashPwd = (p: string): string => {
  const hmac = crypto.createHmac('sha512', salt);
  hmac.update(p);
  return hmac.digest('hex');
};
