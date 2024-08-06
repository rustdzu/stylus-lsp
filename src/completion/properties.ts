import {simple_properties} from "./property/simple";
import {size} from "./property/size";
import {text} from "./property/text";
import {TProperty} from "./types";

export const properties:TProperty[] = [
    ...simple_properties,
    ...size,
    ...text,
];
