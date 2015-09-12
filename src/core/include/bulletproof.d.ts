/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="bulletproof-data-interface.d.ts"/>
/// <reference path="bulletproof-flash.d.ts"/>

import bulletproof_flash = require("bulletproof-flash.d");
import bulletproof_data_interface = require("bulletproof-data-interface.d");

export declare module bulletproof {

    import flash = bulletproof_flash.bulletproof.flash;
    import bilidanmaku = bulletproof_data_interface.bulletproof.bilidanmaku;

    export interface IBulletproofOptions {

        commentLifeTime:number;

    }

    export class Bulletproof {
        constructor();

        static instance:Bulletproof;
        shouldUpdate:boolean;
        options:IBulletproofOptions;
        stage:flash.display.Stage;
        module:any;

        initialize():void;

        enterMainLoop():void;

        registerMotion(Motion:bilidanmaku.IMotion):void;

        clearMotions():void;

        static DEFAULT_OPTIONS:IBulletproofOptions;
    }

}
