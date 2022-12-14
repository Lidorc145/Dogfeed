import {I18n, } from 'i18n-js';
import {en} from './en';
import {he} from './he';
import {useAppSelector} from "../src/ducks/useful-hooks";

export const i18n = new I18n({he,en});

//render translation text with data
export const rText = (text, data)=>{
    try {
        const language = useAppSelector((state) => state.user.language);
        i18n.enableFallback = true;
        i18n.defaultLocale = 'en';
        i18n.locale=language?language:'he';
        return i18n.t(text, data);
    }
    catch (e){
        return "~";
    }
}


