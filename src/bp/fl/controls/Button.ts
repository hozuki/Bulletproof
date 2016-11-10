/**
 * Created by MIC on 2016-11-10.
 */

import DisplayObjectContainer from "../../../../lib/glantern/src/gl/flash/display/DisplayObjectContainer";
import Stage from "../../../../lib/glantern/src/gl/flash/display/Stage";
import UIComponent from "../core/UIComponent";

export default class Button extends UIComponent {

    constructor(root: Stage, parent: DisplayObjectContainer) {
        super(root, parent);
    }

}
