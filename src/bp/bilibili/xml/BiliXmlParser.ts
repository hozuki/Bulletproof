/**
 * Created by MIC on 2016-11-10.
 */
import BiliCommentObject from "./BiliCommentObject";
import CommonUtil from "../../../../lib/glantern/src/gl/mic/CommonUtil";

const $parser = new DOMParser();

abstract class BiliXmlParser {

    static parse(text: string): BiliCommentObject[] {
        const parsed = $parser.parseFromString(text, "text/xml");
        const infoRoot = parsed.childNodes[0];
        const infoNodeCount = infoRoot.childNodes.length;
        const danmakuList: BiliCommentObject[] = [];
        for (let i = 0; i < infoNodeCount; ++i) {
            const node = infoRoot.childNodes[i];
            switch (node.nodeName) {
                case "d":
                    const obj = BiliXmlParser.__parseNode(node);
                    if (obj) {
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
        const propAttr = node.attributes.getNamedItem("p");
        if (!propAttr) {
            return null;
        }
        const propStr = propAttr.value;
        const props = propStr.split(",");
        const mode = parseInt(props[1]);
        if (mode !== 8) {
            return null;
        }
        const comment: BiliCommentObject = Object.create(null);
        comment.bornTime = parseFloat(props[0]);
        comment.mode = parseInt(props[1]);
        comment.color = parseInt(props[2]);
        comment.date = parseInt(props[3]);
        comment.pool = parseInt(props[4]);
        comment.senderCrc = props[5];
        comment.id = parseInt(props[6]);
        comment.text = node.textContent;
        return comment;
    }

}

export default BiliXmlParser;
