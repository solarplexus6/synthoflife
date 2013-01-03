gol = [];
row = [];
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
    });

    document.addEventListener('onSequencerStep', function(e) {
        row = e.value;

        console.log('Row:', row[0][0], row);

        ep = document.createEvent('Event');
        ep.initEvent('Period changed', true, true);
        ep.value = 0.1 + row.length;
        document.dispatchEvent(ep);
    });
}