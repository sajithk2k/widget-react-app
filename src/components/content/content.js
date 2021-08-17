import React, { Component } from 'react';
import Widget from './widget/widget';
import './content.css'
class Content extends Component {
    constructor(props){
        super(props);
        this.state={
            widgets:props.widgets
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
         console.log('updated Props',this.props);
            this.setState({
                widgets: this.props.widgets
            })
        }
    }
    render() { 
        if(this.state.widgets.length === 0 ){return null;}
        return (
            <div id="widget-div">
                {
                    this.state.widgets.map((item,i) => <Widget key={i} widgetData = {item}/>)
                }
            </div>
            );
    }
}
 
export default Content;