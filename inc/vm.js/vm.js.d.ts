/**
 * Created by MIC on 2016-11-10.
 */

declare module "vm.js" {

    export class Vm {

        constructor();

        eval(script: string): any;

        compile(script: string, fileName?: string): Script;

        run(script: Script): any;

        createFiber(script: Script): Fiber;

        get realm(): any;

        static fromJSON(script: string): Script;

    }

    export class Script {

        toJSON(): string;

    }

    export class Fiber {

        run(): any;

        setReturnValue(value: any): void;

        pause(): void;

        resume(): void;

    }

    module.exports = Vm;

}
