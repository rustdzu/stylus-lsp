import {TProperty} from "../../../types";
import {self_size} from "../self_size";

export const width:TProperty = [
    "width",
    [
        "auto",
        ...self_size,
    ],
];
