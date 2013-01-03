gol = [];
function initHelper() {
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

    document.addEventListener('onGolStep', function(e) {
        gol = e.value;
        e = document.createEvent('Event');
        e.initEvent('Period changed', true, true);
        e.value = gol.length;
        document.dispatchEvent(e);
    });
}