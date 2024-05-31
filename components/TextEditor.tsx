import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';

interface State {
    editorState: EditorState;
}

class EditorConvertToHTML extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }

    onEditorStateChange = (editorState: EditorState) => {
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    toolbar={{
                        inline: { inDropdown: true },
                        list: { inDropdown: true },
                        textAlign: { inDropdown: true },
                        link: { inDropdown: true },
                        history: { inDropdown: true },
                    }}
                    onEditorStateChange={this.onEditorStateChange}
                />
                <textarea
                    disabled
                    className="w-full h-fit"
                    value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                />
            </div>
        );
    }
}

export default EditorConvertToHTML;
