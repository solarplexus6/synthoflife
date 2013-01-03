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
        
        document.addEventListener(label + ' changed', function(e) {
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




function dsp() {
	
	this.iRec0 = new Int32Array(2);
	this.fhslider0;
	this.fhslider1;
	this.fSamplingFreq;
	
	this.metadata = function(m) { 
	}

	this.getNumInputs = function() { return 0; }
	this.getNumOutputs = function() { return 1; }
	
	this.classInit = function(samplingFreq) {
	}
	
	this.instanceInit = function(samplingFreq) {
		this.fSamplingFreq = samplingFreq;
		this.fhslider0 = 1;
		for (var i = 0; (i < 2); i = (i + 1)) {
			this.iRec0[i] = 0;
			
		}
		this.fhslider1 = 0.5;
		
	}
	
	this.init = function(samplingFreq) {
		this.classInit(samplingFreq);
		this.instanceInit(samplingFreq);
	}
	
	this.buildUserInterface = function(ui_interface) {
		ui_interface.openVerticalBox("synth");
		ui_interface.addHorizontalSlider("Cyclic ratio", function handler(obj) { function setval(val) { obj.fhslider1 = val; } return setval; }(this), 0.5, 0, 1, 0.1);
		ui_interface.addHorizontalSlider("Period", function handler(obj) { function setval(val) { obj.fhslider0 = val; } return setval; }(this), 1, 0.1, 100, 0.1);
		ui_interface.closeBox();
		
	}
	
	this.compute = function(count, inputs, outputs) {
		var output0 = outputs[0];
		var iSlow0 = (44.1 * this.fhslider0);
		var fSlow1 = (this.fhslider1 * iSlow0);
		for (var i = 0; (i < count); i = (i + 1)) {
			this.iRec0[0] = (1 + (this.iRec0[1] % iSlow0));
			output0[i] = ((2 * ((this.iRec0[0] - 1) < fSlow1)) - 1);
			this.iRec0[1] = this.iRec0[0];
			
		}
		
	}
	
}


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
    meta = null;

    faustdsp = new create_dsp(context, ui, meta, buffer_size);
    faustdsp.processor.connect(context.destination);
}
