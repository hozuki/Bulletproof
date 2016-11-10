/**
 * Created by MIC on 2015/12/29.
 */

import IGeneralCreateParams from "./IGeneralCreateParams";

interface ICommentButtonCreateParams extends IGeneralCreateParams {

    text?: string;
    onclick: () => any;

}

export default ICommentButtonCreateParams;
