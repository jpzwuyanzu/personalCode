/// <reference types="react" />
import type { PanelSharedProps } from '../../interface';
export type DecadePanelProps<DateType> = PanelSharedProps<DateType>;
export declare const DECADE_UNIT_DIFF = 10;
export declare const DECADE_DISTANCE_COUNT: number;
declare function DecadePanel<DateType>(props: DecadePanelProps<DateType>): JSX.Element;
export default DecadePanel;
