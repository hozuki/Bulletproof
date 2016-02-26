/**
 * Created by MIC on 2016/2/25.
 */

function reloadPage() {
    // Note: Reloading problem
    //   When caching policy is active, Bulletproof fails to redraw in the new session created by
    // clicking "Reload" button. Detailed relation between cached scripts and rendering logic
    // is not analyzed yet, however it is sure that caching does prevent rendering right.
    //   A workaround to the problem is to disable caching. This action is performed by
    // loadBulletproofSource() function. In order to disable caching, please use the plain JavaScript
    // version (useNodeVersion=false) even in NW.js, and force disabling caching (forceNoCache=true).
    // I have tested and discovered that, setting a specific no-caching header in this page
    // (<meta http-equiv="cache-control" content="no-store">) does not work.
    window.location.reload(true);
}
