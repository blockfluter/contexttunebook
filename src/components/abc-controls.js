import React, { useEffect, useState } from 'react'
import { makeDomEditor } from '../abc-integration/make-dom-editor'

export const AbcControls = props => {
    const [abcText, setAbcText] = useState(props.abcText)

    useEffect(() => {
        makeDomEditor(props)
    })
    useEffect(() => {
        setAbcText(props.abcText)
    }, [props.abcText])
    console.log('render->',abcText);
    return (
        <React.Fragment>
            <div className="col1">
                <div data-testid={props.midiId} id={props.midiId} />
                <textarea
                    readOnly={props.readOnly?true:false}
                    data-testid={props.textId}
                    id={props.textId}
                    value={abcText}
                    onChange={e => setAbcText(e.currentTarget.value)}
                    onBlur={e => { console.log('blur->', e.currentTarget.value); props.publishAbcChange(e.currentTarget.value) }}
                />
                <div data-testid={props.warningsId} id={props.warningsId} />
            </div>
            <div className="col2">
                <div data-testid={props.canvasId} id={props.canvasId} />
            </div>
        </React.Fragment>
    )
}
AbcControls.defaultProps = {
    textId: "t1",
    midiId: "m1",
    warningsId: "w1",
    canvasId: "c1",
    readOnly: true,
    publishAbcChange: () => { },
}