import abcjs from 'abcjs/midi'

export function makeDomEditor(props) {
    //%%MIDI program 53
   // abcjs.midi.setSoundFont('http://gleitz.github.io/midi-js-soundfonts/FluidR3_GM/');
    abcjs.midi.setSoundFont('http://gleitz.github.io/midi-js-soundfonts/MusyngKite/');
    return new abcjs.Editor(props.textId, {
        midi_id: props.midiId,
        warnings_id: props.warningsId,
        canvas_id: props.canvasId,
        generate_midi: true,
        midi_options: { program: 22 },
        abcjsParams: {
            generateInline: true,
            generateDownload: false,
        },
    })
}
