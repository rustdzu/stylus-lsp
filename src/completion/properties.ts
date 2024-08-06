import {background} from "./property/background";
import {border} from "./property/border";
import {simple_properties} from "./property/simple";
import {size} from "./property/size";
import {text} from "./property/text";
import {TProperty} from "./types";

export const properties:TProperty[] = [
    ...background,
    ...border,
    ...simple_properties,
    ...size,
    ...text,
];
