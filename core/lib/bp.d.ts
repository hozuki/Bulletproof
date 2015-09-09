/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="bddata.d.ts"/>
/// <reference path="flash.d.ts"/>

import bddata = require('./bddata.d');
import flash = require('./flash.d');

export declare module bulletproof {

    export interface IBulletproofOptions {

        commentLifeTime:number;

    }

    export class Bulletproof {

        public instance:Bulletproof;

        public initialize():void;

        public shouldUpdate:boolean;

        public options:IBulletproofOptions;

        public registerMotion(Motion:bddata.IMotion):void;

        public clearMotions():void;

        public stage:flash.display.Stage;

    }

}
