import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  size: {
    imagePart: width,
    contentPart: 160
  },
  drawerWidth: 250,
  imagePartIconSectionTop: width - 60,
  imagePartIconSection: 60,
  imagePartIconSize: 35,
  contentsPartIconSize:30,
};
