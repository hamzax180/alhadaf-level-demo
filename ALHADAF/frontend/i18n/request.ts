import { getRequestConfig } from 'next-intl/server';
import { getMessages } from '../app/[locale]/messages';

export default getRequestConfig(async ({ locale }) => {
    const messages = await getMessages(locale);
    return {
        messages
    };
});
