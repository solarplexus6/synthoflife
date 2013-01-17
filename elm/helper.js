gol = [];
row = [];
function initHelper() {
    var e = document.createEvent('Event');
    e.initEvent('provideHost', true, true);
    e.value = window.location.host;
    document.dispatchEvent(e);

    var presetSn = window.location.pathname.match(/\/preset\/(.*)/);
    if (presetSn !== null) {
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

        if (row[0] == null){
            return;
        }
        console.log('Row:', row[0][0], row);
        //var note = Math.max.apply(Math, row.map(function (pair) { return pair[1]; }));
        var notes = row.map(function (pair) { return pair[1]; });
        for (var i = 0; i < notes.length; i++) {
            ep = document.createEvent('Event');
            ep.initEvent('hand'+ (notes[i] - 1) +'-on', true, true);
            document.dispatchEvent(ep);
        };
    });
};