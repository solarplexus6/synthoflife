document.body.onload = function() {
    var e = document.createEvent('Event');
    e.initEvent('provideHost', true, true);
    e.value = window.location.host;
    document.dispatchEvent(e);

    var presetSn = window.location.pathname.match(/\/preset\/(.*)/);
    if (presetSn != null){
    	e = document.createEvent('Event');
	    e.initEvent('providePresetUrl', true, true);
	    e.value = "http://" + window.location.host + "/api" + presetSn[0];
	    document.dispatchEvent(e);
    }
}