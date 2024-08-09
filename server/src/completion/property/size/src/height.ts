import {TProperty} from "../../../types";
import {self_size} from "../self_size";

export const height:TProperty = [
    "height",
    [
        "auto",
        ...self_size,
    ],
];
