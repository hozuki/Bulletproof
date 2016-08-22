/**
 * Created by MIC on 2015/12/29.
 */

import {IGeneralCreateParams} from "./IGeneralCreateParams";

export interface ICommentButtonCreateParams extends IGeneralCreateParams {

    text?: string;
    onclick: () => any;

}
