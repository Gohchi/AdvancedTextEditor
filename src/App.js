import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import getMockText from './text.service';
class App extends Component {
    constructor(){
        super()
        this.state = {
            file: '',
            selectedEl: null
        }
        this.getText = this.getText.bind(this)
        this.textToBold = this.textToBold.bind(this)
        this.textToItalic = this.textToItalic.bind(this)
        this.textToUnderline = this.textToUnderline.bind(this)
        this.wordAsSelected = this.wordAsSelected.bind(this)
    }
    componentDidMount(){
        this.getText()
    }
    getText() {
        getMockText().then((result) => {
            var wordsMap = result.split(' ').map((word, index) => {
                return <span key={index} onClick={this.wordAsSelected}> {word} </span>
            })
            this.setState({
                file: result,
                fileEl: <div> {wordsMap} </div>
            });
        });
    }
    textToBold(){
        var el = this.state.selectedEl;
        el.style.fontWeight = !el.style.fontWeight ? 'bold' : '';
        this.setState({
            selectedEl: el
        })
    }    
    textToItalic(){
        var el = this.state.selectedEl;
        el.style.fontStyle = !el.style.fontStyle ? 'italic' : '';
        this.setState({
            selectedEl: el
        })
    }
    textToUnderline(){
        var el = this.state.selectedEl;
        el.style.textDecoration = !el.style.textDecoration ? 'underline' : '';
        this.setState({
            selectedEl: el
        })
    }
    wordAsSelected(e){
        this.setState({
            selectedEl: e.target
        })
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Advance Text Editor</span>
                </header>
                <main>
                    <ControlPanel textToBold={this.textToBold} textToItalic={this.textToItalic} textToUnderline={this.textToUnderline}/>
                    <FileZone file={this.state.fileEl}/>
                </main>
            </div>
        );
    }
}

export default App;
