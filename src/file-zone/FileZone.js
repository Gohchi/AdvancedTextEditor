import React, { Component } from 'react';
import './FileZone.css';

class FileZone extends Component {
    render() {
        return (
            <div id="file-zone">
                <div id="file">
                    {this.props.file}
                </div>
            </div>
        );
    }
}

export default FileZone;
