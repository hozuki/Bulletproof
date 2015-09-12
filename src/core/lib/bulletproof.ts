/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="../include/bulletproof-data-interface.d.ts"/>
/// <reference path="../include/bulletproof-bilidanmaku.d.ts"/>
/// <reference path="../include/bulletproof-flash.d.ts"/>

import bulletproof_flash = require("./bulletproof-flash");
import bulletproof_data_interface = require("./bulletproof-data-interface");
import bulletproof_mic = require("./bulletproof-mic");

export module bulletproof {

    import mic = bulletproof_mic.bulletproof.mic;
    import bilidanmaku = bulletproof_data_interface.bulletproof.bilidanmaku;
    import flash = bulletproof_flash.bulletproof.flash;

    export interface IBulletproofOptions {

        // life time (ms)
        commentLifeTime:number;

    }

    export class Bulletproof extends flash.events.EventDispatcher {

        private _shouldUpdate:boolean = true;
        private _options:IBulletproofOptions;
        private _initialized:boolean = false;
        private static _instanceCreated:number = 0;
        private _enteredLoop:boolean = false;
        //private _bdg:AdvAdapter;
        private static _instance:Bulletproof = new Bulletproof();

        public constructor() {
            super();
            if (Bulletproof._instanceCreated < 3) {
                Bulletproof._instanceCreated++;
            }
        }

        public static DEFAULT_OPTIONS:IBulletproofOptions = {
            commentLifeTime: 4000
        };

        public static get instance():Bulletproof {
            return Bulletproof._instance;
        }

        public initialize():void {
            // first time: (function [class](){})()
            // second time: manual instantiation
            if (!this._initialized && Bulletproof._instanceCreated == 2) {
                this._options = Bulletproof.DEFAULT_OPTIONS;
                // TODO: Remove force type cast when bp.d.ts is fully synced with implementations.
                //this._bdg = AdvAdapter.initialize(div, video, <any>this);
                Bulletproof._instance = this;
                this._initialized = true;
            }
        }

        public enterMainLoop():void {
            if (this._initialized && !this._enteredLoop) {
                this._enteredLoop = true;
                window.requestAnimationFrame(Bulletproof.mainLoop);
            }
        }

        private static mainLoop() {
            var instance = Bulletproof.instance;
            if (instance) {
                var event = mic.util.createTestEvent(Bulletproof.RENDER_REQUESTED);
                instance._enteredLoop = true;
                instance.dispatchEvent(event);
                window.requestAnimationFrame(Bulletproof.mainLoop);
            }

        }

        public get shouldUpdate():boolean {
            return this._shouldUpdate;
        }

        public set shouldUpdate(v:boolean) {
            this._shouldUpdate = v;
        }

        public get options():IBulletproofOptions {
            return this._options;
        }

        public static get RENDER_REQUESTED():string {
            return 'renderRequested';
        }

    }

}
