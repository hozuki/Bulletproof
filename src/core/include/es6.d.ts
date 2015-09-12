/**
 * Created by MIC on 2015/9/12.
 */

interface MediaStream extends EventTarget {
    active:boolean;
    ended:boolean;
    id:string;
    onactive:(ev:Event)=>void;
    onaddtrack:(ev:Event)=>void;
    onended:(ev:Event)=>void;
    oninactive:(ev:Event)=>void;
    onremovetrack:(ev:Event)=>void;
    addTrack(track:MediaStreamTrack):void;
    clone():MediaStream;
    getAudioTracks():Array<MediaStreamTrack>;
    getTrackById(id:string):MediaStreamTrack;
    getMediaTracks():Array<MediaStreamTrack>;
    getVideoTracks():Array<MediaStreamTrack>;
    removeTrack(track:MediaStreamTrack):void;
}

interface MediaStreamTrack {
    enabled:boolean;
    id:string;
    kind:string;
    label:string;
    muted:boolean;
    readonly:boolean;
    readyState:string;
    remote:boolean;
    onstarted:(ev:Event)=>void;
    onmute:(ev:Event)=>void;
    onunmute:(ev:Event)=>void;
    onoverconstrained:(ev:Event)=>void;
    onended:(ev:Event)=>void;
    getConstraints():any;
    applyConstraints():any;
    getSettings():any;
    getCapabilities():any;
    clone():MediaStreamTrack;
    stop():any;
}

interface AudioNode extends EventTarget {
    context:AudioContext;
    numberOfInputs:number;
    numberOfOutputs:number;
    channelCount:number;
    channelCountMode:string;
    channelInterpretation:string;
    connect(audioNode:AudioNode):void;
    connect(audioParam:AudioParam):void;
    disconnect():void;
}

interface AudioDestinationNode extends AudioNode {
    maxChannelCount:number;
}

interface AudioListener extends AudioNode {
    setOrientation():void;
}

interface AudioParam {
    value:number;
    defaultValue:number;
}

interface AudioBuffer {
    sampleRate:number;
    length:number;
    duration:number;
    numberOfChannels:number;
    getChannelData(channel:number):Float32Array;
    copyFromChannel(destination:Float32Array, channelNumber:number, startInChannel?:number):void;
    copyToChannel(source:Float32Array, channelNumber:number, startInChannel?:number):void;
}

interface AudioBufferSourceNode extends AudioNode {
    buffer:AudioBuffer;
    detune:AudioParam;
    loop:boolean;
    loopStart:number;
    loopEnd:number;
    playbackRate:AudioParam;
    onended:(ev:Event)=>void;
    start():void;
    stop():void;
}

interface MediaElementAudioSourceNode extends AudioNode {
}

interface MediaStreamAudioSourceNode extends AudioNode {
}

interface MediaStreamAudioDestinationNode extends AudioNode {
}

interface GainNode extends AudioNode {
}

interface PannerNode extends AudioNode {
}

interface ScriptProcessorNode extends AudioNode {
    bufferSize:number;
    onaudioprocess:(ev:Event)=>void;
}

interface AudioContext extends EventTarget {
    currentTime:number;
    destination:AudioDestinationNode;
    listener:AudioListener;
    sampleRate:number;
    state:string;
    close():void;
    createBuffer(numOfChannels:number, length:number, sampleRate:number):AudioBuffer;
    createBufferSource():AudioBufferSourceNode;
    createMediaElementSource(element:HTMLMediaElement):MediaElementAudioSourceNode;
    createMediaStreamSource(stream:MediaStream):MediaStreamAudioSourceNode;
    createMediaStreamDestination(stream:MediaStream):MediaStreamAudioDestinationNode;
    createScriptProcessor(bufferSize:number, numberOfInputChannels:number, numberOfOutputChannels:number):ScriptProcessorNode;
    createStereoPanner():any;
    createAnalyser():any;
    createBiquadFilter():any;
    createChannelMerger():any;
    createChannelSplitter():any;
    createConsolver():any;
    createDelay():any;
    createDynamicCompressor():any;
    createGain():any;
    createOscillator():any;
    createPanner():any;
    createPeriodicWave():any;
    createWaveShaper():any;
    createAudioWorker():any;
    decodeAudioData(arrayBuffer:ArrayBuffer, decodeSuccessCallback:(data:AudioBuffer)=>void, decodeErrorCallback:()=>void):void;
    resume():void;
    suspend():void;
}
