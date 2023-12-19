import Instagram from '../../assets/social-icons/instagram.png';
import { connectToInstagram, disconnectFromInstagram } from '../../services/connectService/instagram.connect';

const instagramSettings = {
  name: 'instagram',
  icon: Instagram,
  url: 'https://www.instagram.com/',
  isConnected: false,
  connect: connectToInstagram,
  disconnect: disconnectFromInstagram,
};

export default instagramSettings;
