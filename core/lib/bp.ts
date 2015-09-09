/**
 * Created by MIC on 2015/9/10.
 */

/// <reference path="bddata.d.ts"/>
/// <reference path="flash.ts"/>

import bddata = require('./bddata.d');
import flash = require('./flash');
import bd = require('./bd');

export module bulletproof {

    export interface IBulletproofOptions {

        // life time (ms)
        commentLifeTime:number;

    }

    export class Bulletproof {

        private _shouldUpdate:boolean = true;
        private _objectMotions:Array<bddata.IMotion> = [];
        private _stage:flash.display.Stage;
        private _options:IBulletproofOptions;
        private _initialized:boolean = false;
        private static _instanceCreated:number = 0;
        private _enteredLoop:boolean = false;
        private _bdg:bd.AdvAdapter;
        private static _instance:Bulletproof = new Bulletproof();

        public constructor() {
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

        public initialize(div:HTMLDivElement, video:HTMLVideoElement):void {
            // first time: (function [class](){})()
            // second time: manual instantiation
            if (!this._initialized && Bulletproof._instanceCreated == 2) {
                this._options = Bulletproof.DEFAULT_OPTIONS;
                this._stage = new flash.display.Stage(div);
                // TODO: Remove force type cast when bp.d.ts is fully synced with implementations.
                this._bdg = bd.AdvAdapter.initialize(div, video, <any>this);
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
                instance._enteredLoop = true;
                instance._stage.raiseEnterFrame();
                instance.calculateMotionGroups();
                instance._stage._bp_draw();
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

        public registerMotion(motion:bddata.IMotion):void {
            if (this._objectMotions.indexOf(motion) < 0) {
                this._objectMotions.push(motion);
            }
        }

        public clearMotions():void {
            while (this._objectMotions.length > 0) {
                this._objectMotions.pop();
            }
        }

        public get stage():flash.display.Stage {
            return this._stage;
        }

        private calculateMotionGroups():void {
            var propertyNames = ['x', 'y', 'alpha', 'rotationZ', 'rotationY'];
            var motionCount = this._objectMotions.length;
            var now = this._bdg.getTimer();
            var relativeTime:number;
            var motion:bddata.IMotion;
            var motionAnimation:bddata.IMotionPropertyAnimation;
            var value:number;
            for (var i = 0; i < motionCount; i++) {
                motion = this._objectMotions[i];
                if (motion.createdTime <= now && now <= motion.createdTime + motion.maximumLifeTime) {
                    for (var j = 0; j < 5; j++) {
                        motionAnimation = motion[propertyNames[j]];
                        if (motionAnimation) {
                            relativeTime = now - motion.createdTime;
                            if (motionAnimation.startDelay) {
                                relativeTime -= motionAnimation.startDelay;
                            }
                            if (relativeTime <= motionAnimation.lifeTime * 1000) {
                                // TODO: 这里忽略了 repeat 属性
                                // TODO: 应该使用指定的 easing 方法，没有则假设线性；这里假设线性
                                value = motionAnimation.fromValue +
                                    (motionAnimation.toValue - motionAnimation.fromValue) / (motionAnimation.lifeTime * 1000) * relativeTime;
                                motion.sourceObject[propertyNames[j]] = value;
                            }
                        }
                    }
                }
            }
        }

        private debugLogMotions():void {
            console.log(this._objectMotions);
        }

        public get module():any {
            return this._initialized ? this._bdg.getModule() : null;
        }

    }

}
