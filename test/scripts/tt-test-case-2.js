/**
 * Created by MIC on 2015/9/22.
 */

// Test case 2, provided by akaza-akari@github

var s = $.createShape({
        lifeTime: 7
    }
);
var g = s.graphics;

// Test tt-2-1, passed
g.lineStyle(2, 0x00ff00);
g.beginFill(0xff0000, 0.4);
//g.beginFill(0xff0000, 0.8);
//g.lineStyle(1, 0xffffff);
g.moveTo(100, 100);
//g._pixiGraphics.currentPath.shape.closed = false;
g.lineTo(200, 100);
g.lineTo(200, 400);
//g._pixiGraphics.currentPath.shape.closed = false;
g.curveTo(350, 125, 300, 400);
//g._pixiGraphics.currentPath.shape.closed = false;
//g.lineStyle(3, 0x0000ff);
//g.lineTo(180, 120);
g.endFill();

/*
 // Test tt-2-1, passed
 import flash.display.Shape;
 import flash.display.Graphics;
 import flash.events.Event;

 var i = 0;
 function drawShape (ev) {
 var s:Shape = new Shape();
 this.stage.addChild(s);
 var g:Graphics = s.graphics;
 g.lineStyle(2, 0x00ff00);
 g.beginFill(0xff0000, 1.0);
 g.moveTo(100, 100);
 g.lineTo(200, 200);
 g.moveTo(150, 200);
 g.lineTo(150, 120);
 //g.drawRect(100, 150, 100, 20);
 g.moveTo(100, 150);
 g.lineTo(200, 150);
 g.lineTo(200, 170);
 g.lineTo(100, 170);
 g.lineTo(100, 150);
 g.drawCircle(20, 20, 10);
 g.lineTo(0, 0);
 g.endFill();
 }

 this.stage.addEventListener(Event.ENTER_FRAME, drawShape);
 */

/*
// Test tt-2-2, passed
g.lineStyle(2, 0x00ff00);
g.beginFill(0xff0000, 1.0);
g.moveTo(100, 100);
g.lineTo(200, 200);
g.lineTo(150, 200);
g.lineTo(150, 120);
//g.endFill();
//g.drawRect(100, 150, 100, 20);
g.moveTo(100, 150);
g.lineTo(200, 150);
g.lineTo(200, 170);
g.lineTo(100, 170);
g.lineTo(100, 150);
g.drawCircle(20, 20, 10);
g.lineTo(0, 0);
g.endFill();
*/

/*
 // Test tt-2-2, passed
 import flash.display.Shape;
 import flash.display.Graphics;
 import flash.events.Event;

 var i = 0;
 function drawShape (ev) {
 var s:Shape = new Shape();
 this.stage.addChild(s);
 var g:Graphics = s.graphics;
 g.lineStyle(2, 0x00ff00);
 g.beginFill(0xff0000, 1.0);
 g.moveTo(100, 100);
 g.lineTo(200, 200);
 g.lineTo(150, 200);
 g.lineTo(150, 120);
 g.endFill();
 //g.drawRect(100, 150, 100, 20);
 g.moveTo(100, 150);
 g.lineTo(200, 150);
 g.lineTo(200, 170);
 g.lineTo(100, 170);
 g.lineTo(100, 150);
 g.drawCircle(20, 20, 10);
 g.lineTo(0, 0);
 //g.endFill();
 }

 this.stage.addEventListener(Event.ENTER_FRAME, drawShape);
 */
