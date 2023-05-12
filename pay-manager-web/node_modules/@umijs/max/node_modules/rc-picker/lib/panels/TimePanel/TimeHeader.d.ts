/// <reference types="react" />
import type { Locale } from '../../interface';
import type { GenerateConfig } from '../../generate';
export type TimeHeaderProps<DateType> = {
    prefixCls: string;
    value?: DateType | null;
    locale: Locale;
    generateConfig: GenerateConfig<DateType>;
    format: string;
};
declare function TimeHeader<DateType>(props: TimeHeaderProps<DateType>): JSX.Element;
export default TimeHeader;
