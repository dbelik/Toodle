import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet-async';

import { Controlled as CodeMirror } from 'react-codemirror2'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/markdown/markdown';
import './toodle-theme.css';

export default function Editor({ onChange, value }) {
    return (
        <Fragment>
            <Helmet>
                <title>Toodle | Workplace</title>
            </Helmet>

            <CodeMirror
                onBeforeChange={(editor, data, value) => onChange(value)}
                value={value}
                options={{
                    lineWrapping: true,
                    lineNumbers: true,
                    mode: "markdown"
                }} />
        </Fragment>
    )
}