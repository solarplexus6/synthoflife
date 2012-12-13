document.body.onload = function() {
    var e = document.createEvent('Event');
    e.initEvent('provideHost', true, true);
    e.value = window.location.host;
    document.dispatchEvent(e);
}