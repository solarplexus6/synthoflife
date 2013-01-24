<!-- UI builder -->
 
function UI(){
    this.openHorizontalBox = function(label)
    {
        console.log("openHorizontalBox: " + label);
    }

    this.openVerticalBox = function(label)
    {
        console.log("openVerticalBox: " + label);
    }

    this.closeBox = function()
    {
        console.log("closeBox");
    }

    this.addButton = function(label, handler)
    {
       console.log("addButton: " + label);

       document.addEventListener(label + '-on', function(e) {
            var btnPushTime = 50;

            handler(1);
            console.log("on: "+ label)
            setTimeout(function () {
                    handler(0);
                    console.log("off: "+ label)
                }, btnPushTime);
        });
    }

    this.addCheckButton = function(label, handler)
    {
        console.log("addCheckButton: " + label);
    }

    this.addVerticalSlider = function(label, handler, init, min, max, step)
    {
        console.log("addVerticalSlider: " + label);
    }

    this.addHorizontalSlider = function(label, handler, init, min, max, step)
    {
        console.log("addHorizontalSlider: " + label);

        document.addEventListener(label + '-changed', function(e) {
            handler(e.value);
        });
    }

    this.addNumEntry = function(label, handler, init, min, max, step)
    {
        console.log("addNumEntry: " + label);
    }

    this.addHorizontalBargraph = function(label, handler,  min, max)
    {
        console.log("addHorizontalBargraph: " + label);
    }

    this.addVerticalBargraph = function(label, handler,  min, max)
    {
         console.log("addVerticalBargraph: " + label);
    }

    this.declare = function(handler, key, value)
    {
         console.log("declare");
    }

    return this;
}

<!-- Faust DSP-->

<<includeIntrinsic>>

<<includeclass>>

<!-- WebAudio API -->

process_mydsp = function(obj)
{
    function process_aux_mydsp(event)
    {
        var count;

        /*
        if (event.inputBuffer.numberOfChannels < dsp.getNumInputs()) {
            console.log("Incorrect number of input %d instead of %d", event.inputBuffer.numberOfChannels, dsp.getNumInputs());
            return;
        }
        */

        if (event.outputBuffer.numberOfChannels < obj.dsp.getNumOutputs()) {
            console.log("Incorrect number of output %d instead of %d", event.outputBuffer.numberOfChannels, obj.dsp.getNumOutputs());
            return;
        }

        for (var i = 0; i < obj.dsp.getNumInputs(); i++) {
            obj.inputs[i] = event.inputBuffer.getChannelData(i);
            if (obj.inputs[i] != null) {
                count = obj.inputs[i].length;
            }
        }

        for (var i = 0; i < obj.dsp.getNumOutputs(); i++) {
            obj.outputs[i] = event.outputBuffer.getChannelData(i);
            if (obj.outputs[i] != null) {
                count = obj.outputs[i].length;
            }
        }

        obj.dsp.compute(count, obj.inputs, obj.outputs);

    }
    return process_aux_mydsp;
}

function create_mydsp(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new mydsp();

    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);

    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());

    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());

    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_mydsp(this);

    return this;
}

function initAudio(buffer_size)
{
    context = new webkitAudioContext();

    ui = new UI();
    meta = ui;

    faustdsp = new create_mydsp(context, ui, meta, buffer_size);
    faustdsp.processor.connect(context.destination);
}
