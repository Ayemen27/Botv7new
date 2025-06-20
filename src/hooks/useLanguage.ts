import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const useLanguage = () => {
  const { i18n, t } = useTranslation();
  
  const changeLanguage = (lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang);
  };
  
  const isRTL = i18n.language === 'ar';
  
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);
  
  return {
    language: i18n.language as 'ar' | 'en',
    changeLanguage,
    isRTL,
    t
  };
};