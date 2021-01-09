import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import './toodle-theme.css';

function onEditorChange(editor, data, value, onChange) {
    onChange(value);
}

export default function Editor({ onChange, value }) {
    return (
        <Fragment>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <CodeMirror
                onBeforeChange={(editor, data, value) => onEditorChange(editor, data, value, onChange)}
                value={value}
                options={{
                    lineWrapping: true,
                    lineNumbers: true
                }} />
        </Fragment>
    )
}