/**
 * Created by MIC on 2015/10/1.
 */

declare module libtess {

    var gluEnum:{
        GLU_TESS_BEGIN:number;
        GLU_TESS_VERTEX:number;
        GLU_TESS_END:number;
        GLU_TESS_ERROR:number;
        GLU_TESS_EDGE_FLAG:number;
        GLU_TESS_COMBINE:number;
        GLU_TESS_BEGIN_DATA:number;
        GLU_TESS_VERTEX_DATA:number;
        GLU_TESS_END_DATA:number;
        GLU_TESS_ERROR_DATA:number;
        GLU_TESS_EDGE_FLAG_DATA:number;
        GLU_TESS_COMBINE_DATA:number;
        GLU_TESS_MESH:number;
        GLU_TESS_TOLERANCE:number;
        GLU_TESS_WINDING_RULE:number;
        GLU_TESS_BOUNDARY_ONLY:number;
        GLU_INVALID_ENUM:number;
        GLU_INVALID_VALUE:number;
    };

    var windingRule:{
        GLU_TESS_WINDING_ODD:number;
        GLU_TESS_WINDING_NONZERO:number;
        GLU_TESS_WINDING_POSITIVE:number;
        GLU_TESS_WINDING_NEGATIVE:number;
        GLU_TESS_WINDING_ABS_GEQ_TWO:number;
    };

    var primitiveType:{
        GL_LINE_LOOP:number;
        GL_TRIANGLES:number;
        GL_TRIANGLE_STRIP:number;
        GL_TRIANGLE_FAN:number;
    };

    export class GluTesselator {

        public constructor();

        public gluDeleteTess():void;

        public gluTessProperty(which:number, value:number):void;

        public gluGetTessProperty(which:number):number;

        public gluTessNormal(x:number, y:number, z:number):void;

        public gluTessCallback(which:number, fn:Function):void;

        public gluTessVertex(coords:Array<number>, data:Array<number>):void;

        public gluTessBeginPolygon(data:Array<Array<number>>):void;

        public gluTessBeginContour():void;

        public gluTessEndContour():void;

        public gluTessEndPolygon():void;

    }

}

declare module "libtess" {

    export = libtess;

}
