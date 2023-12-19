import Twitter from '../../assets/social-icons/twitter.png';
import {
  connectToTwitter,
  disconnectFromTwitter,
  signInWithTwitter,
} from '../../services/connectService/twitter.connect';

const twitterSettings = {
  name: 'twitter',
  icon: Twitter,
  url: 'https://www.twitter.com/',
  connect: connectToTwitter,
  disconnect: disconnectFromTwitter,
  signIn: () => signInWithTwitter(),
};

export default twitterSettings;
