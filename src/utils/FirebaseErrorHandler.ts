import { t } from 'i18next';
import { useTranslation } from 'react-i18next';  



export default function FireBaseErrorHandler() {
  function formatFirebaseError(errorCode:string) {
    return t(`firebaseErrors.${errorCode}`, t('firebaseErrors.default'));
  }

  return {formatFirebaseError}
}