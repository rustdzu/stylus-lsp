import {TProperty} from "../../types";
import {background as background_prop} from "./src/background";
import {background_clip} from "./src/background_clip";
import {background_color} from "./src/background_color";
import {background_image} from "./src/background_image";
import {background_position} from "./src/background_position";
import {background_repeat} from "./src/background_repeat";
import {background_size} from "./src/background_size";

export const background:TProperty[] = [
    background_prop,
    background_clip,
    background_color,
    background_image,
    background_position,
    background_repeat,
    background_size,
];
