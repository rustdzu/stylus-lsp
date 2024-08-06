import {TProperty} from "../../types";
import {bottom} from "./src/bottom";
import {box_shadow} from "./src/box_shadow";
import {box_sizing} from "./src/box_sizing";
import {clear} from "./src/clear";
import {color} from "./src/color";
import {content} from "./src/content";
import {display} from "./src/display";
import {float} from "./src/float";
import {left} from "./src/left";
import {letter_spacing} from "./src/letter_spacing";
import {line_height} from "./src/line_height";
import {margin} from "./src/margin";
import {opacity} from "./src/opacity";
import {outline} from "./src/outline";
import {padding} from "./src/padding";
import {pointer_events} from "./src/pointer_events";
import {position} from "./src/position";
import {right} from "./src/right";
import {table_layout} from "./src/table_layout";
import {top} from "./src/top";
import {transform} from "./src/transform";
import {transition} from "./src/transition";
import {user_select} from "./src/user_select";
import {vertical_align} from "./src/vertical_align";
import {visibility} from "./src/visibility";
import {white_space} from "./src/white_space";
import {z_index} from "./src/z_index";

export const simple_properties:TProperty[] = [
    bottom,
    box_shadow,
    box_sizing,
    clear,
    color,
    content,
    display,
    float,
    left,
    letter_spacing,
    line_height,
    ...margin,
    opacity,
    outline,
    ...padding,
    pointer_events,
    position,
    right,
    table_layout,
    top,
    transform,
    transition,
    user_select,
    vertical_align,
    visibility,
    white_space,
    z_index,
];
