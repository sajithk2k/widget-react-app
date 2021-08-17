import React, { Component } from 'react';
import './pincodebox.css'
class PincodeBox extends Component {
    state = {  }
    enterPressed(event) {
        var code = event.keyCode || event.which;
        if(code === 13) {
            this.props.getPincode(event.target.value);
        } 
    }
    render() { 
        return (  <div id="pincode-div">
        <input type="text" id ="pincode-box" placeholder="Enter Pincode" onKeyPress={this.enterPressed.bind(this)}></input>
        </div>  );
    }
}
 
export default PincodeBox;