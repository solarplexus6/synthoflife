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

<!-- WebAudio API -->

process_dsp = function(obj)
{
    function process_aux_dsp(event)
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
    return process_aux_dsp;
}

function create_dsp(audio_context, user_interface, meta_interface, buffer_size)
{
    this.dsp = new dsp();

    this.dsp.init(audio_context.sampleRate);
    this.dsp.buildUserInterface(user_interface);
    this.dsp.metadata(meta_interface);

    this.inputs = new Array(this.dsp.getNumInputs());
    this.outputs = new Array(this.dsp.getNumOutputs());

    console.log(audio_context.sampleRate);
    console.log(this.dsp.getNumInputs());
    console.log(this.dsp.getNumOutputs());

    this.processor = audio_context.createJavaScriptNode(buffer_size, this.dsp.getNumInputs(), this.dsp.getNumOutputs());
    this.processor.onaudioprocess = process_dsp(this);

    return this;
}

function initAudio(buffer_size)
{
    context = new webkitAudioContext();

    ui = new UI();
    meta = ui;

    faustdsp = new create_dsp(context, ui, meta, buffer_size);
    faustdsp.processor.connect(context.destination);
}

function faustpower2_f(value) {
	return (value * value);
	
}

function dsp() {
	
	this.fRec72 = new Float32Array(2);
	this.fRec71 = new Float32Array(2);
	this.fRec70 = new Float32Array(2);
	this.iRec69 = new Int32Array(2);
	this.fRec68 = new Float32Array(2);
	this.fRec67 = new Float32Array(2);
	this.fRec66 = new Float32Array(2);
	this.fRec65 = new Float32Array(2);
	this.iRec64 = new Int32Array(2);
	this.fRec63 = new Float32Array(2);
	this.fRec62 = new Float32Array(2);
	this.fRec61 = new Float32Array(2);
	this.iRec60 = new Int32Array(2);
	this.fRec59 = new Float32Array(2);
	this.fRec58 = new Float32Array(2);
	this.fRec57 = new Float32Array(2);
	this.iRec56 = new Int32Array(2);
	this.fRec55 = new Float32Array(2);
	this.fRec54 = new Float32Array(2);
	this.fRec53 = new Float32Array(2);
	this.fRec52 = new Float32Array(2);
	this.iRec51 = new Int32Array(2);
	this.fRec50 = new Float32Array(2);
	this.fRec49 = new Float32Array(2);
	this.fRec48 = new Float32Array(2);
	this.iRec47 = new Int32Array(2);
	this.fRec46 = new Float32Array(2);
	this.fRec45 = new Float32Array(2);
	this.fRec44 = new Float32Array(2);
	this.iRec43 = new Int32Array(2);
	this.fRec42 = new Float32Array(2);
	this.fRec41 = new Float32Array(2);
	this.fRec40 = new Float32Array(2);
	this.fRec39 = new Float32Array(2);
	this.iRec38 = new Int32Array(2);
	this.fRec37 = new Float32Array(2);
	this.fRec36 = new Float32Array(2);
	this.fRec35 = new Float32Array(2);
	this.iRec34 = new Int32Array(2);
	this.fRec33 = new Float32Array(2);
	this.fRec32 = new Float32Array(2);
	this.fRec31 = new Float32Array(2);
	this.fRec30 = new Float32Array(2);
	this.iRec29 = new Int32Array(2);
	this.fRec28 = new Float32Array(2);
	this.fRec27 = new Float32Array(2);
	this.fRec26 = new Float32Array(2);
	this.iRec25 = new Int32Array(2);
	this.fRec24 = new Float32Array(2);
	this.fRec23 = new Float32Array(2);
	this.fRec22 = new Float32Array(2);
	this.fRec21 = new Float32Array(2);
	this.iRec20 = new Int32Array(2);
	this.fRec19 = new Float32Array(2);
	this.fRec18 = new Float32Array(2);
	this.fRec17 = new Float32Array(2);
	this.fRec16 = new Float32Array(2);
	this.iRec15 = new Int32Array(2);
	this.fRec14 = new Float32Array(2);
	this.fRec13 = new Float32Array(2);
	this.fRec12 = new Float32Array(2);
	this.fRec11 = new Float32Array(2);
	this.iRec10 = new Int32Array(2);
	this.fRec9 = new Float32Array(2);
	this.fRec8 = new Float32Array(2);
	this.fRec7 = new Float32Array(2);
	this.fRec6 = new Float32Array(2);
	this.iRec5 = new Int32Array(2);
	this.fRec4 = new Float32Array(2);
	this.fRec3 = new Float32Array(2);
	this.fRec2 = new Float32Array(2);
	this.fRec1 = new Float32Array(2);
	this.iRec0 = new Int32Array(2);
	this.fhslider0;
	this.fbutton0;
	this.fbutton1;
	this.fbutton2;
	this.fbutton3;
	this.fbutton4;
	this.fbutton5;
	this.fbutton6;
	this.fbutton7;
	this.fbutton8;
	this.fbutton9;
	this.fbutton10;
	this.fbutton11;
	this.fbutton12;
	this.fbutton13;
	this.fbutton14;
	this.fbutton15;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
	}

	this.getNumInputs = function() { return 0; }
	this.getNumOutputs = function() { return 2; }
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 0.6;
		this.fbutton0 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec0[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec1[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec2[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec3[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec4[i] = 0;
			
		}
		this.fbutton1 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec5[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec6[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec7[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec8[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec9[i] = 0;
			
		}
		this.fbutton2 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec10[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec11[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec12[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec13[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec14[i] = 0;
			
		}
		this.fbutton3 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec15[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec16[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec17[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec18[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec19[i] = 0;
			
		}
		this.fbutton4 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec20[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec21[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec22[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec23[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec24[i] = 0;
			
		}
		this.fbutton5 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec25[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec26[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec27[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec28[i] = 0;
			
		}
		this.fbutton6 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec29[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec30[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec31[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec32[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec33[i] = 0;
			
		}
		this.fbutton7 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec34[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec35[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec36[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec37[i] = 0;
			
		}
		this.fbutton8 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec38[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec39[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec40[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec41[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec42[i] = 0;
			
		}
		this.fbutton9 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec43[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec44[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec45[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec46[i] = 0;
			
		}
		this.fbutton10 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec47[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec48[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec49[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec50[i] = 0;
			
		}
		this.fbutton11 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec51[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec52[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec53[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec54[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec55[i] = 0;
			
		}
		this.fbutton12 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec56[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec57[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec58[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec59[i] = 0;
			
		}
		this.fbutton13 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec60[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec61[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec62[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec63[i] = 0;
			
		}
		this.fbutton14 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec64[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec65[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec66[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec67[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec68[i] = 0;
			
		}
		this.fbutton15 = 0;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec69[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec70[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec71[i] = 0;
			
		}
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.fRec72[i] = 0;
			
		}
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("synth");
		ui_interface.addButton("hand0", function handler(obj) { function setval(val) { obj.fbutton1 = val; } return setval; }(this));
		ui_interface.addButton("hand1", function handler(obj) { function setval(val) { obj.fbutton0 = val; } return setval; }(this));
		ui_interface.addButton("hand10", function handler(obj) { function setval(val) { obj.fbutton10 = val; } return setval; }(this));
		ui_interface.addButton("hand11", function handler(obj) { function setval(val) { obj.fbutton11 = val; } return setval; }(this));
		ui_interface.addButton("hand12", function handler(obj) { function setval(val) { obj.fbutton12 = val; } return setval; }(this));
		ui_interface.addButton("hand13", function handler(obj) { function setval(val) { obj.fbutton13 = val; } return setval; }(this));
		ui_interface.addButton("hand14", function handler(obj) { function setval(val) { obj.fbutton14 = val; } return setval; }(this));
		ui_interface.addButton("hand15", function handler(obj) { function setval(val) { obj.fbutton15 = val; } return setval; }(this));
		ui_interface.addButton("hand2", function handler(obj) { function setval(val) { obj.fbutton2 = val; } return setval; }(this));
		ui_interface.addButton("hand3", function handler(obj) { function setval(val) { obj.fbutton3 = val; } return setval; }(this));
		ui_interface.addButton("hand4", function handler(obj) { function setval(val) { obj.fbutton4 = val; } return setval; }(this));
		ui_interface.addButton("hand5", function handler(obj) { function setval(val) { obj.fbutton5 = val; } return setval; }(this));
		ui_interface.addButton("hand6", function handler(obj) { function setval(val) { obj.fbutton6 = val; } return setval; }(this));
		ui_interface.addButton("hand7", function handler(obj) { function setval(val) { obj.fbutton7 = val; } return setval; }(this));
		ui_interface.addButton("hand8", function handler(obj) { function setval(val) { obj.fbutton8 = val; } return setval; }(this));
		ui_interface.addButton("hand9", function handler(obj) { function setval(val) { obj.fbutton9 = val; } return setval; }(this));
		ui_interface.declare("fhslider0", "osc", "/accxyz/0 -10 10");
		ui_interface.declare("fhslider0", "unit", "f");
		ui_interface.addHorizontalSlider("level", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 0.6, 0, 1, 0.01);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var output1 = outputs[1];
		var fSlow0 = faustpower2_f(this.fhslider0);
		var fSlow1 = this.fbutton0;
		var iSlow2 = (fSlow1 > 0);
		var iSlow3 = (fSlow1 <= 0);
		var fSlow4 = this.fbutton1;
		var iSlow5 = (fSlow4 > 0);
		var iSlow6 = (fSlow4 <= 0);
		var fSlow7 = this.fbutton2;
		var iSlow8 = (fSlow7 > 0);
		var iSlow9 = (fSlow7 <= 0);
		var fSlow10 = this.fbutton3;
		var iSlow11 = (fSlow10 > 0);
		var iSlow12 = (fSlow10 <= 0);
		var fSlow13 = this.fbutton4;
		var iSlow14 = (fSlow13 > 0);
		var iSlow15 = (fSlow13 <= 0);
		var fSlow16 = this.fbutton5;
		var iSlow17 = (fSlow16 > 0);
		var iSlow18 = (fSlow16 <= 0);
		var fSlow19 = this.fbutton6;
		var iSlow20 = (fSlow19 > 0);
		var iSlow21 = (fSlow19 <= 0);
		var fSlow22 = this.fbutton7;
		var iSlow23 = (fSlow22 > 0);
		var iSlow24 = (fSlow22 <= 0);
		var fSlow25 = this.fbutton8;
		var iSlow26 = (fSlow25 > 0);
		var iSlow27 = (fSlow25 <= 0);
		var fSlow28 = this.fbutton9;
		var iSlow29 = (fSlow28 > 0);
		var iSlow30 = (fSlow28 <= 0);
		var fSlow31 = this.fbutton10;
		var iSlow32 = (fSlow31 > 0);
		var iSlow33 = (fSlow31 <= 0);
		var fSlow34 = this.fbutton11;
		var iSlow35 = (fSlow34 > 0);
		var iSlow36 = (fSlow34 <= 0);
		var fSlow37 = this.fbutton12;
		var iSlow38 = (fSlow37 > 0);
		var iSlow39 = (fSlow37 <= 0);
		var fSlow40 = this.fbutton13;
		var iSlow41 = (fSlow40 > 0);
		var iSlow42 = (fSlow40 <= 0);
		var fSlow43 = this.fbutton14;
		var iSlow44 = (fSlow43 > 0);
		var iSlow45 = (fSlow43 <= 0);
		var fSlow46 = this.fbutton15;
		var iSlow47 = (fSlow46 > 0);
		var iSlow48 = (fSlow46 <= 0);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec0[0] = (iSlow2 & (this.iRec0[1] | (this.fRec1[1] >= 1)));
			var iTemp0 = (iSlow3 & (this.fRec1[1] > 0));
			this.fRec1[0] = (((iTemp0 == 0) | (this.fRec1[1] >= 1e-06)) * ((0.000226757 * (((this.iRec0[1] == 0) & iSlow2) & (this.fRec1[1] < 1))) + (this.fRec1[1] * ((1 - (0 - (0.00198929 * (this.iRec0[1] & (this.fRec1[1] > 80))))) - (0.000255971 * iTemp0)))));
			this.fRec2[0] = function fmod(a,b) {return a % b }((0.0114609 + this.fRec2[1]), 1);
			this.fRec3[0] = function fmod(a,b) {return a % b }((0.0343828 + this.fRec3[1]), 1);
			this.fRec4[0] = function fmod(a,b) {return a % b }((0.0229219 + this.fRec4[1]), 1);
			var fTemp1 = (this.fRec1[0] * (Math.sin((6.28319 * this.fRec2[0])) + ((0.25 * Math.sin((6.28319 * this.fRec3[0]))) + (0.5 * Math.sin((6.28319 * this.fRec4[0]))))));
			this.iRec5[0] = (iSlow5 & (this.iRec5[1] | (this.fRec6[1] >= 1)));
			var iTemp2 = (iSlow6 & (this.fRec6[1] > 0));
			this.fRec6[0] = (((iTemp2 == 0) | (this.fRec6[1] >= 1e-06)) * ((0.000226757 * (((this.iRec5[1] == 0) & iSlow5) & (this.fRec6[1] < 1))) + (this.fRec6[1] * ((1 - (0 - (0.00198929 * (this.iRec5[1] & (this.fRec6[1] > 80))))) - (0.000255971 * iTemp2)))));
			this.fRec7[0] = function fmod(a,b) {return a % b }((0.00997732 + this.fRec7[1]), 1);
			this.fRec8[0] = function fmod(a,b) {return a % b }((0.029932 + this.fRec8[1]), 1);
			this.fRec9[0] = function fmod(a,b) {return a % b }((0.0199546 + this.fRec9[1]), 1);
			var fTemp3 = Math.sin((6.28319 * this.fRec9[0]));
			var fTemp4 = (this.fRec6[0] * (Math.sin((6.28319 * this.fRec7[0])) + ((0.25 * Math.sin((6.28319 * this.fRec8[0]))) + (0.5 * fTemp3))));
			this.iRec10[0] = (iSlow8 & (this.iRec10[1] | (this.fRec11[1] >= 1)));
			var iTemp5 = (iSlow9 & (this.fRec11[1] > 0));
			this.fRec11[0] = (((iTemp5 == 0) | (this.fRec11[1] >= 1e-06)) * ((0.000226757 * (((this.iRec10[1] == 0) & iSlow8) & (this.fRec11[1] < 1))) + (this.fRec11[1] * ((1 - (0 - (0.00198929 * (this.iRec10[1] & (this.fRec11[1] > 80))))) - (0.000255971 * iTemp5)))));
			this.fRec12[0] = function fmod(a,b) {return a % b }((0.0131652 + this.fRec12[1]), 1);
			this.fRec13[0] = function fmod(a,b) {return a % b }((0.0394955 + this.fRec13[1]), 1);
			this.fRec14[0] = function fmod(a,b) {return a % b }((0.0263303 + this.fRec14[1]), 1);
			var fTemp6 = Math.sin((6.28319 * this.fRec14[0]));
			var fTemp7 = (this.fRec11[0] * (Math.sin((6.28319 * this.fRec12[0])) + ((0.25 * Math.sin((6.28319 * this.fRec13[0]))) + (0.5 * fTemp6))));
			this.iRec15[0] = (iSlow11 & (this.iRec15[1] | (this.fRec16[1] >= 1)));
			var iTemp8 = (iSlow12 & (this.fRec16[1] > 0));
			this.fRec16[0] = (((iTemp8 == 0) | (this.fRec16[1] >= 1e-06)) * ((0.000226757 * (((this.iRec15[1] == 0) & iSlow11) & (this.fRec16[1] < 1))) + (this.fRec16[1] * ((1 - (0 - (0.00198929 * (this.iRec15[1] & (this.fRec16[1] > 80))))) - (0.000255971 * iTemp8)))));
			this.fRec17[0] = function fmod(a,b) {return a % b }((0.0151228 + this.fRec17[1]), 1);
			this.fRec18[0] = function fmod(a,b) {return a % b }((0.0453684 + this.fRec18[1]), 1);
			this.fRec19[0] = function fmod(a,b) {return a % b }((0.0302456 + this.fRec19[1]), 1);
			var fTemp9 = (this.fRec16[0] * (Math.sin((6.28319 * this.fRec17[0])) + ((0.25 * Math.sin((6.28319 * this.fRec18[0]))) + (0.5 * Math.sin((6.28319 * this.fRec19[0]))))));
			this.iRec20[0] = (iSlow14 & (this.iRec20[1] | (this.fRec21[1] >= 1)));
			var iTemp10 = (iSlow15 & (this.fRec21[1] > 0));
			this.fRec21[0] = (((iTemp10 == 0) | (this.fRec21[1] >= 1e-06)) * ((0.000226757 * (((this.iRec20[1] == 0) & iSlow14) & (this.fRec21[1] < 1))) + (this.fRec21[1] * ((1 - (0 - (0.00198929 * (this.iRec20[1] & (this.fRec21[1] > 80))))) - (0.000255971 * iTemp10)))));
			this.fRec22[0] = function fmod(a,b) {return a % b }((0.0173715 + this.fRec22[1]), 1);
			this.fRec23[0] = function fmod(a,b) {return a % b }((0.0521146 + this.fRec23[1]), 1);
			this.fRec24[0] = function fmod(a,b) {return a % b }((0.0347431 + this.fRec24[1]), 1);
			var fTemp11 = Math.sin((6.28319 * this.fRec24[0]));
			var fTemp12 = (this.fRec21[0] * (Math.sin((6.28319 * this.fRec22[0])) + ((0.25 * Math.sin((6.28319 * this.fRec23[0]))) + (0.5 * fTemp11))));
			this.iRec25[0] = (iSlow17 & (this.iRec25[1] | (this.fRec26[1] >= 1)));
			var iTemp13 = (iSlow18 & (this.fRec26[1] > 0));
			this.fRec26[0] = (((iTemp13 == 0) | (this.fRec26[1] >= 1e-06)) * ((0.000226757 * (((this.iRec25[1] == 0) & iSlow17) & (this.fRec26[1] < 1))) + (this.fRec26[1] * ((1 - (0 - (0.00198929 * (this.iRec25[1] & (this.fRec26[1] > 80))))) - (0.000255971 * iTemp13)))));
			this.fRec27[0] = function fmod(a,b) {return a % b }((0.0598639 + this.fRec27[1]), 1);
			this.fRec28[0] = function fmod(a,b) {return a % b }((0.0399093 + this.fRec28[1]), 1);
			var fTemp14 = Math.sin((6.28319 * this.fRec28[0]));
			var fTemp15 = (this.fRec26[0] * (fTemp3 + ((0.25 * Math.sin((6.28319 * this.fRec27[0]))) + (0.5 * fTemp14))));
			this.iRec29[0] = (iSlow20 & (this.iRec29[1] | (this.fRec30[1] >= 1)));
			var iTemp16 = (iSlow21 & (this.fRec30[1] > 0));
			this.fRec30[0] = (((iTemp16 == 0) | (this.fRec30[1] >= 1e-06)) * ((0.000226757 * (((this.iRec29[1] == 0) & iSlow20) & (this.fRec30[1] < 1))) + (this.fRec30[1] * ((1 - (0 - (0.00198929 * (this.iRec29[1] & (this.fRec30[1] > 80))))) - (0.000255971 * iTemp16)))));
			this.fRec31[0] = function fmod(a,b) {return a % b }((0.0229219 + this.fRec31[1]), 1);
			this.fRec32[0] = function fmod(a,b) {return a % b }((0.0687656 + this.fRec32[1]), 1);
			this.fRec33[0] = function fmod(a,b) {return a % b }((0.0458437 + this.fRec33[1]), 1);
			var fTemp17 = (this.fRec30[0] * (Math.sin((6.28319 * this.fRec31[0])) + ((0.25 * Math.sin((6.28319 * this.fRec32[0]))) + (0.5 * Math.sin((6.28319 * this.fRec33[0]))))));
			this.iRec34[0] = (iSlow23 & (this.iRec34[1] | (this.fRec35[1] >= 1)));
			var iTemp18 = (iSlow24 & (this.fRec35[1] > 0));
			this.fRec35[0] = (((iTemp18 == 0) | (this.fRec35[1] >= 1e-06)) * ((0.000226757 * (((this.iRec34[1] == 0) & iSlow23) & (this.fRec35[1] < 1))) + (this.fRec35[1] * ((1 - (0 - (0.00198929 * (this.iRec34[1] & (this.fRec35[1] > 80))))) - (0.000255971 * iTemp18)))));
			this.fRec36[0] = function fmod(a,b) {return a % b }((0.0526606 + this.fRec36[1]), 1);
			var fTemp19 = Math.sin((6.28319 * this.fRec36[0]));
			this.fRec37[0] = function fmod(a,b) {return a % b }((0.078991 + this.fRec37[1]), 1);
			var fTemp20 = (this.fRec35[0] * (fTemp6 + ((0.5 * fTemp19) + (0.25 * Math.sin((6.28319 * this.fRec37[0]))))));
			this.iRec38[0] = (iSlow26 & (this.iRec38[1] | (this.fRec39[1] >= 1)));
			var iTemp21 = (iSlow27 & (this.fRec39[1] > 0));
			this.fRec39[0] = (((iTemp21 == 0) | (this.fRec39[1] >= 1e-06)) * ((0.000226757 * (((this.iRec38[1] == 0) & iSlow26) & (this.fRec39[1] < 1))) + (this.fRec39[1] * ((1 - (0 - (0.00198929 * (this.iRec38[1] & (this.fRec39[1] > 80))))) - (0.000255971 * iTemp21)))));
			this.fRec40[0] = function fmod(a,b) {return a % b }((0.0302456 + this.fRec40[1]), 1);
			this.fRec41[0] = function fmod(a,b) {return a % b }((0.0907368 + this.fRec41[1]), 1);
			this.fRec42[0] = function fmod(a,b) {return a % b }((0.0604912 + this.fRec42[1]), 1);
			var fTemp22 = Math.sin((6.28319 * this.fRec42[0]));
			var fTemp23 = (this.fRec39[0] * (Math.sin((6.28319 * this.fRec40[0])) + ((0.25 * Math.sin((6.28319 * this.fRec41[0]))) + (0.5 * fTemp22))));
			this.iRec43[0] = (iSlow29 & (this.iRec43[1] | (this.fRec44[1] >= 1)));
			var iTemp24 = (iSlow30 & (this.fRec44[1] > 0));
			this.fRec44[0] = (((iTemp24 == 0) | (this.fRec44[1] >= 1e-06)) * ((0.000226757 * (((this.iRec43[1] == 0) & iSlow29) & (this.fRec44[1] < 1))) + (this.fRec44[1] * ((1 - (0 - (0.00198929 * (this.iRec43[1] & (this.fRec44[1] > 80))))) - (0.000255971 * iTemp24)))));
			this.fRec45[0] = function fmod(a,b) {return a % b }((0.104229 + this.fRec45[1]), 1);
			this.fRec46[0] = function fmod(a,b) {return a % b }((0.0694861 + this.fRec46[1]), 1);
			var fTemp25 = (this.fRec44[0] * (fTemp11 + ((0.25 * Math.sin((6.28319 * this.fRec45[0]))) + (0.5 * Math.sin((6.28319 * this.fRec46[0]))))));
			this.iRec47[0] = (iSlow32 & (this.iRec47[1] | (this.fRec48[1] >= 1)));
			var iTemp26 = (iSlow33 & (this.fRec48[1] > 0));
			this.fRec48[0] = (((iTemp26 == 0) | (this.fRec48[1] >= 1e-06)) * ((0.000226757 * (((this.iRec47[1] == 0) & iSlow32) & (this.fRec48[1] < 1))) + (this.fRec48[1] * ((1 - (0 - (0.00198929 * (this.iRec47[1] & (this.fRec48[1] > 80))))) - (0.000255971 * iTemp26)))));
			this.fRec49[0] = function fmod(a,b) {return a % b }((0.119728 + this.fRec49[1]), 1);
			this.fRec50[0] = function fmod(a,b) {return a % b }((0.0798186 + this.fRec50[1]), 1);
			var fTemp27 = Math.sin((6.28319 * this.fRec50[0]));
			var fTemp28 = (this.fRec48[0] * (fTemp14 + ((0.25 * Math.sin((6.28319 * this.fRec49[0]))) + (0.5 * fTemp27))));
			this.iRec51[0] = (iSlow35 & (this.iRec51[1] | (this.fRec52[1] >= 1)));
			var iTemp29 = (iSlow36 & (this.fRec52[1] > 0));
			this.fRec52[0] = (((iTemp29 == 0) | (this.fRec52[1] >= 1e-06)) * ((0.000226757 * (((this.iRec51[1] == 0) & iSlow35) & (this.fRec52[1] < 1))) + (this.fRec52[1] * ((1 - (0 - (0.00198929 * (this.iRec51[1] & (this.fRec52[1] > 80))))) - (0.000255971 * iTemp29)))));
			this.fRec53[0] = function fmod(a,b) {return a % b }((0.0458437 + this.fRec53[1]), 1);
			this.fRec54[0] = function fmod(a,b) {return a % b }((0.137531 + this.fRec54[1]), 1);
			this.fRec55[0] = function fmod(a,b) {return a % b }((0.0916875 + this.fRec55[1]), 1);
			var fTemp30 = (this.fRec52[0] * (Math.sin((6.28319 * this.fRec53[0])) + ((0.25 * Math.sin((6.28319 * this.fRec54[0]))) + (0.5 * Math.sin((6.28319 * this.fRec55[0]))))));
			this.iRec56[0] = (iSlow38 & (this.iRec56[1] | (this.fRec57[1] >= 1)));
			var iTemp31 = (iSlow39 & (this.fRec57[1] > 0));
			this.fRec57[0] = (((iTemp31 == 0) | (this.fRec57[1] >= 1e-06)) * ((0.000226757 * (((this.iRec56[1] == 0) & iSlow38) & (this.fRec57[1] < 1))) + (this.fRec57[1] * ((1 - (0 - (0.00198929 * (this.iRec56[1] & (this.fRec57[1] > 80))))) - (0.000255971 * iTemp31)))));
			this.fRec58[0] = function fmod(a,b) {return a % b }((0.157982 + this.fRec58[1]), 1);
			this.fRec59[0] = function fmod(a,b) {return a % b }((0.105321 + this.fRec59[1]), 1);
			var fTemp32 = (this.fRec57[0] * (fTemp19 + ((0.25 * Math.sin((6.28319 * this.fRec58[0]))) + (0.5 * Math.sin((6.28319 * this.fRec59[0]))))));
			this.iRec60[0] = (iSlow41 & (this.iRec60[1] | (this.fRec61[1] >= 1)));
			var iTemp33 = (iSlow42 & (this.fRec61[1] > 0));
			this.fRec61[0] = (((iTemp33 == 0) | (this.fRec61[1] >= 1e-06)) * ((0.000226757 * (((this.iRec60[1] == 0) & iSlow41) & (this.fRec61[1] < 1))) + (this.fRec61[1] * ((1 - (0 - (0.00198929 * (this.iRec60[1] & (this.fRec61[1] > 80))))) - (0.000255971 * iTemp33)))));
			this.fRec62[0] = function fmod(a,b) {return a % b }((0.181474 + this.fRec62[1]), 1);
			this.fRec63[0] = function fmod(a,b) {return a % b }((0.120982 + this.fRec63[1]), 1);
			var fTemp34 = (this.fRec61[0] * (fTemp22 + ((0.25 * Math.sin((6.28319 * this.fRec62[0]))) + (0.5 * Math.sin((6.28319 * this.fRec63[0]))))));
			this.iRec64[0] = (iSlow44 & (this.iRec64[1] | (this.fRec65[1] >= 1)));
			var iTemp35 = (iSlow45 & (this.fRec65[1] > 0));
			this.fRec65[0] = (((iTemp35 == 0) | (this.fRec65[1] >= 1e-06)) * ((0.000226757 * (((this.iRec64[1] == 0) & iSlow44) & (this.fRec65[1] < 1))) + (this.fRec65[1] * ((1 - (0 - (0.00198929 * (this.iRec64[1] & (this.fRec65[1] > 80))))) - (0.000255971 * iTemp35)))));
			this.fRec66[0] = function fmod(a,b) {return a % b }((0.0694861 + this.fRec66[1]), 1);
			this.fRec67[0] = function fmod(a,b) {return a % b }((0.208458 + this.fRec67[1]), 1);
			this.fRec68[0] = function fmod(a,b) {return a % b }((0.138972 + this.fRec68[1]), 1);
			var fTemp36 = (this.fRec65[0] * (Math.sin((6.28319 * this.fRec66[0])) + ((0.25 * Math.sin((6.28319 * this.fRec67[0]))) + (0.5 * Math.sin((6.28319 * this.fRec68[0]))))));
			this.iRec69[0] = (iSlow47 & (this.iRec69[1] | (this.fRec70[1] >= 1)));
			var iTemp37 = (iSlow48 & (this.fRec70[1] > 0));
			this.fRec70[0] = (((iTemp37 == 0) | (this.fRec70[1] >= 1e-06)) * ((0.000226757 * (((this.iRec69[1] == 0) & iSlow47) & (this.fRec70[1] < 1))) + (this.fRec70[1] * ((1 - (0 - (0.00198929 * (this.iRec69[1] & (this.fRec70[1] > 80))))) - (0.000255971 * iTemp37)))));
			this.fRec71[0] = function fmod(a,b) {return a % b }((0.239456 + this.fRec71[1]), 1);
			this.fRec72[0] = function fmod(a,b) {return a % b }((0.159637 + this.fRec72[1]), 1);
			var fTemp38 = (this.fRec70[0] * (fTemp27 + ((0.25 * Math.sin((6.28319 * this.fRec71[0]))) + (0.5 * Math.sin((6.28319 * this.fRec72[0]))))));
			output0[i] = (fSlow0 * ((((((((((((((((0.951972 * fTemp1) + (0.984251 * fTemp4)) + (0.918559 * fTemp7)) + (0.883883 * fTemp9)) + (0.847791 * fTemp12)) + (0.810093 * fTemp15)) + (0.770552 * fTemp17)) + (0.728869 * fTemp20)) + (0.684653 * fTemp23)) + (0.637377 * fTemp25)) + (0.586302 * fTemp28)) + (0.53033 * fTemp30)) + (0.467707 * fTemp32)) + (0.395285 * fTemp34)) + (0.306186 * fTemp36)) + (0.176777 * fTemp38)));
			output1[i] = (fSlow0 * ((((((((((((((((0.306186 * fTemp1) + (0.176777 * fTemp4)) + (0.395285 * fTemp7)) + (0.467707 * fTemp9)) + (0.53033 * fTemp12)) + (0.586302 * fTemp15)) + (0.637377 * fTemp17)) + (0.684653 * fTemp20)) + (0.728869 * fTemp23)) + (0.770552 * fTemp25)) + (0.810093 * fTemp28)) + (0.847791 * fTemp30)) + (0.883883 * fTemp32)) + (0.918559 * fTemp34)) + (0.951972 * fTemp36)) + (0.984251 * fTemp38)));
			this.iRec0[1] = this.iRec0[0];
			this.fRec1[1] = this.fRec1[0];
			this.fRec2[1] = this.fRec2[0];
			this.fRec3[1] = this.fRec3[0];
			this.fRec4[1] = this.fRec4[0];
			this.iRec5[1] = this.iRec5[0];
			this.fRec6[1] = this.fRec6[0];
			this.fRec7[1] = this.fRec7[0];
			this.fRec8[1] = this.fRec8[0];
			this.fRec9[1] = this.fRec9[0];
			this.iRec10[1] = this.iRec10[0];
			this.fRec11[1] = this.fRec11[0];
			this.fRec12[1] = this.fRec12[0];
			this.fRec13[1] = this.fRec13[0];
			this.fRec14[1] = this.fRec14[0];
			this.iRec15[1] = this.iRec15[0];
			this.fRec16[1] = this.fRec16[0];
			this.fRec17[1] = this.fRec17[0];
			this.fRec18[1] = this.fRec18[0];
			this.fRec19[1] = this.fRec19[0];
			this.iRec20[1] = this.iRec20[0];
			this.fRec21[1] = this.fRec21[0];
			this.fRec22[1] = this.fRec22[0];
			this.fRec23[1] = this.fRec23[0];
			this.fRec24[1] = this.fRec24[0];
			this.iRec25[1] = this.iRec25[0];
			this.fRec26[1] = this.fRec26[0];
			this.fRec27[1] = this.fRec27[0];
			this.fRec28[1] = this.fRec28[0];
			this.iRec29[1] = this.iRec29[0];
			this.fRec30[1] = this.fRec30[0];
			this.fRec31[1] = this.fRec31[0];
			this.fRec32[1] = this.fRec32[0];
			this.fRec33[1] = this.fRec33[0];
			this.iRec34[1] = this.iRec34[0];
			this.fRec35[1] = this.fRec35[0];
			this.fRec36[1] = this.fRec36[0];
			this.fRec37[1] = this.fRec37[0];
			this.iRec38[1] = this.iRec38[0];
			this.fRec39[1] = this.fRec39[0];
			this.fRec40[1] = this.fRec40[0];
			this.fRec41[1] = this.fRec41[0];
			this.fRec42[1] = this.fRec42[0];
			this.iRec43[1] = this.iRec43[0];
			this.fRec44[1] = this.fRec44[0];
			this.fRec45[1] = this.fRec45[0];
			this.fRec46[1] = this.fRec46[0];
			this.iRec47[1] = this.iRec47[0];
			this.fRec48[1] = this.fRec48[0];
			this.fRec49[1] = this.fRec49[0];
			this.fRec50[1] = this.fRec50[0];
			this.iRec51[1] = this.iRec51[0];
			this.fRec52[1] = this.fRec52[0];
			this.fRec53[1] = this.fRec53[0];
			this.fRec54[1] = this.fRec54[0];
			this.fRec55[1] = this.fRec55[0];
			this.iRec56[1] = this.iRec56[0];
			this.fRec57[1] = this.fRec57[0];
			this.fRec58[1] = this.fRec58[0];
			this.fRec59[1] = this.fRec59[0];
			this.iRec60[1] = this.iRec60[0];
			this.fRec61[1] = this.fRec61[0];
			this.fRec62[1] = this.fRec62[0];
			this.fRec63[1] = this.fRec63[0];
			this.iRec64[1] = this.iRec64[0];
			this.fRec65[1] = this.fRec65[0];
			this.fRec66[1] = this.fRec66[0];
			this.fRec67[1] = this.fRec67[0];
			this.fRec68[1] = this.fRec68[0];
			this.iRec69[1] = this.iRec69[0];
			this.fRec70[1] = this.fRec70[0];
			this.fRec71[1] = this.fRec71[0];
			this.fRec72[1] = this.fRec72[0];
			
		}
		
	}
	
}

