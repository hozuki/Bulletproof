/**
 * Created by MIC on 2016-11-10.
 */

import BiliCommentObject from "./BiliCommentObject";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";

const $parser = new DOMParser();

abstract class BiliXmlParser {

    static parse(text: string): BiliCommentObject[] {
        var parsed = $parser.parseFromString(text, "text/xml");
        var infoRoot = parsed.childNodes[0];
        var infoNodeCount = infoRoot.childNodes.length;
        var danmakuList: BiliCommentObject[] = [];
        for (var i = 0; i < infoNodeCount; ++i) {
            var node = infoRoot.childNodes[i];
            switch (node.nodeName) {
                case "d":
                    var obj = BiliXmlParser.__parseNode(node);
                    if (CommonUtil.ptr(obj)) {
                        danmakuList.push(obj);
                    }
                    break;
                default:
                    break;
            }
        }
        danmakuList.sort((a, b) => {
            return a.bornTime - b.bornTime;
        });
        return danmakuList;
    }

    private static __parseNode(node: Node): BiliCommentObject {
        var propAttr = node.attributes.getNamedItem("p");
        if (!propAttr) {
            return null;
        }
        var propStr = propAttr.value;
        var props = propStr.split(",");
        var comment: BiliCommentObject = Object.create(null);
        comment.bornTime = parseFloat(props[0]);
        comment.mode = parseInt(props[1]);
        comment.color = parseInt(props[2]);
        comment.date = parseInt(props[3]);
        comment.pool = parseInt(props[4]);
        comment.u5 = parseFloat(props[5]);
        comment.u6 = parseFloat(props[6]);
        comment.text = node.textContent;
        return comment;
    }

}

export default BiliXmlParser;
