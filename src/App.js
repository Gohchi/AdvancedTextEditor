import React, {Component} from 'react';
import './App.css';
import ControlPanel from "./control-panel/ControlPanel";
import FileZone from "./file-zone/FileZone";
import Popup from "./popup/Popup";
import getMockText from './text.service';
import $ from 'jquery'; 

class App extends Component {
    constructor(){
        super()
        this.state = {
            file: '',
            selectedEl: null,
            currentWord: '',
            currentSynonyms: [],
            popupHidden: 'hidden'
        }
        this.getText = this.getText.bind(this)
        this.textToBold = this.textToBold.bind(this)
        this.textToItalic = this.textToItalic.bind(this)
        this.textToUnderline = this.textToUnderline.bind(this)
        this.wordAsSelected = this.wordAsSelected.bind(this)
        this.findSynonyms = this.findSynonyms.bind(this)
        this.replaceWord = this.replaceWord.bind(this)
        this.closePopup = this.closePopup.bind(this)
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
    findSynonyms(e){
        if(!!this.state.selectedEl){
            var word = this.state.selectedEl.innerText;
            $.ajax({
                url: 'https://api.datamuse.com/words?rel_syn=' + word
            }).then((list) => {
                this.setState({
                    currentSynonyms: list,
                    popupHidden: list.length === 0 ? 'hidden' : '',
                    currentWord: word
                })
            });
        }
    }
    replaceWord(word){
        var el = this.state.selectedEl;
        el.innerText = word;
        this.setState({
            selectedEl: el,
            popupHidden: 'hidden'
        })
    }
    closePopup(){
        this.setState({
            popupHidden: 'hidden'
        })
    }
    render() {
        return (
            <div className="App">
                <header>
                    <span>Advance Text Editor</span>
                </header>
                <main>
                    <ControlPanel
                        textToBold={this.textToBold}
                        textToItalic={this.textToItalic}
                        textToUnderline={this.textToUnderline}
                        findSynonyms={this.findSynonyms}/>
                    <FileZone file={this.state.fileEl}/>
                    <Popup
                        hidden={this.state.popupHidden}
                        replaceWord={this.replaceWord}
                        list={this.state.currentSynonyms}
                        selectedEl={this.state.selectedEl}
                        word={this.state.currentWord}
                        closePopup={this.closePopup}/>
                </main>
            </div>
        );
    }
}

export default App;
