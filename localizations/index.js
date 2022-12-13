import * as Localization from 'expo-localization';
import {I18n} from 'i18n-js';
import {en} from './en';
import {he} from './he';
import {useAppSelector} from "../src/ducks/useful-hooks";

export const i18n = new I18n({he,en});

//render translation text with data
export const rText = (text, data)=>{
    const language = useAppSelector((state) => state.user.language);
    i18n.enableFallback = true;
    i18n.locale=language?language:'en';
    i18n.defaultLocale = 'en';
    return i18n.t(text,data);
}


