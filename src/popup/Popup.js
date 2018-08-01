import React, { Component } from 'react';
import './Popup.css';
import $ from 'jquery'; 

class Popup extends Component {
    componentDidUpdate(){
      if(this.props.list.length > 0) {
        var p = this.props.selectedEl.getBoundingClientRect();
        
        $('#popup')
          .css('left', p.x + 100)
          .css('top', p.y + 30)
        }
    }
    render() {
      return (
          <div id="popup" className={this.props.hidden}>
            <legend> Synonyms for: <b>{this.props.word}</b>
              <ul id="list">
                {this.props.list.map((item, i) => {
                  return (
                    <li
                      key={i}
                      title="click to replace"
                      onClick={() => this.props.replaceWord(item.word)}>
                        {item.word}
                    </li>
                  )
                })}
                <li className="cancel" onClick={this.props.closePopup}>Cancel</li>
              </ul>
            </legend>
          </div>
      );
    }
}

export default Popup;
