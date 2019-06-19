import { Dimensions } from 'react-native';

// const width = Dimensions.get('window').width;
// const height = Dimensions.get('window').height;
const width = 1024;
const height = 768;

const webImageWidth = 700;
const webMinWidth = 600;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  size: {
    imagePart: webImageWidth,
    contentPart: 160
  },
  drawerWidth: 250,
  imagePartIconSectionTop: webImageWidth - 60,
  imagePartIconSection: 60,
  imagePartIconSize: 35,
  contentsPartIconSize:30,
};
