
import { useSelector } from 'react-redux';

import { localizationSelector } from '../redux/LocalizationRedux';
import { turkish } from '../localization/Turkish';
import { english } from '../localization/English';

export function useLocalization() {
  const language = useSelector(localizationSelector);

  switch (language) {
    case 'eng':
      return english;
    default:
      return turkish;
  }
}
