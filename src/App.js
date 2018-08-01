import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';

class App extends Component {
    constructor(){
        super()
        this.state = {
            file: ''
        }
        this.getText = this.getText.bind(this)
    }
    componentDidMount(){
        this.getText()
    }
    getText() {
        getMockText().then((result) => {
            this.setState({
                file: result
            });
        });
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Advance Text Editor</span>
                </header>
                <main>
                    <ControlPanel/>
                    <FileZone file={this.state.file}/>
                </main>
            </div>
        );
    }
}

export default App;
