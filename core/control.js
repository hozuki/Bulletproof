/**
 * Created by MIC on 2015/8/29.
 */

'use strict';

/*
 setTimeout(function () {
 document.title = "Time-out!";
 }, 2000);
 */

/*
 window.ee = true;

 function fff() {
 if (window.ee) {
 console.log('Text from fff');
 }
 setTimeout(fff, 100);
 }
 setTimeout(fff, 100);
 */

/*
 var i = 0;
 interval(function () {
 console.log("message from timer: " + i.toString());
 i++;
 }, 1000, 0);
 */

var shape = $.createShape('shapeText');
var comment = $.createComment("This is a comment");
//shape.graphics.drawCircle(100, 100, 20);
var i = 20;
var k;
function ff() {
    if (i <= 0) {
        clearInterval(k);
        return;
    }
    shape.graphics.clear();
    shape.graphics.drawCircle(shape.width - 20 * (20 - i), 100, 20);
    i--;
}
k = setInterval(ff, 500);
/*
comment.addEventListener(flash.events.EventClass.ENTER_FRAME, function () {
    comment._bp_draw();
});
*/
