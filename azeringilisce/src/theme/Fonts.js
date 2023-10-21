import { units } from './Units';

const type = {
  regular: 'Quicksand-Regular',
  bold: 'Quicksand-Bold'
};

const size = punto => units.height / (720 / punto);

export default {
  type,
  size
};
