/**
 * Created by MIC on 2015/9/22.
 */

// Test case 1, provided by akaza-akari@github

var s = $.createShape({
    lifeTime: 8
});
var g = s.graphics;
/*
 g.lineStyle(2, 0xffffff);
 g.moveTo(100, 100);
 g.lineTo(200, 100);
 g.lineTo(200, 200);
 g.curveTo(350, 125, 300, 400); // 这一行会出问题
 */
g.lineStyle(5, 0xff0000);
g.drawRect(100, 100, 100, 100);
