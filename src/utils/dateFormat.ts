import { format } from 'date-fns';
import { enUS } from 'date-fns/locale';

export const formatDateToString = (dateString: string): string => {
    const date = new Date(dateString);
    return format(date, "MMMM do, yyyy", { locale: enUS });
};
