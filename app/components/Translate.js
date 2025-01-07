'use client'
import { I18n } from 'i18n-js';
import * as english from '@/locales/en'
import * as arabic from '@/locales/ar'

const Translate = (words, lang) => {

    const i18n = new I18n({
        en: { ...english },
        ar: { ...arabic },
    });

    // const storedLang = window?.localStorage?.getItem("language");
    let localLang = navigator.language || navigator.userLanguage;
    const code = localLang.split('-')[0];

    // i18n.locale = lang == null ? code : lang;
    i18n.locale = lang || code;

    const translation = i18n.t(words.toLowerCase())
    if (translation.includes('missing')) {
        return words;
    }
    return translation
}

export default Translate