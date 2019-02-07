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
  imagePartIconSectionTop: width - 70,
  imagePartIconSection: 70,
  imagePartIconSize: 50,
  contentsPartIconSize:35,
};
