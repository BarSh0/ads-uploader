import { FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../../config/firebase';

export const connectToInstagram = async () => {
  const provider = new FacebookAuthProvider().addScope('instagram_basic');
  const result = await signInWithPopup(auth, provider);
  const credential = FacebookAuthProvider.credentialFromResult(result);
  const token = credential?.accessToken;
  return { token };
};

export const disconnectFromInstagram = async () => {
  await auth.signOut();
};
