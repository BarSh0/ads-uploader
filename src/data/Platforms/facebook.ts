import Facebook from '../../assets/social-icons/facebook.png';
import {
  connectToFacebook,
  disconnectFromFacebook,
  signInWithFacebook,
} from '../../services/connectService/facebook.connect';

const facebookSettings = {
  name: 'facebook',
  icon: Facebook,
  url: 'https://www.facebook.com/',
  connect: connectToFacebook,
  disconnect: disconnectFromFacebook,
  signIn: () => signInWithFacebook(),
};

export default facebookSettings;
