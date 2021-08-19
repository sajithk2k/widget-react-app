import React, { Component } from 'react';
import Image from './image/image';
import './widget.css'
class Widget extends Component {
    constructor(props){
        super(props);
        this.state = {
            widgetData:props.widgetData
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
        //  console.log('updated Props',this.props);
            this.setState({
                widgetData: this.props.widgetData
            })
        }
    }
    render() { 
        var c = this.state.widgetData.imageCount;
        return ( <div id="widget" style = {{width:this.state.widgetData.grow}}> 
                    {
                        this.state.widgetData.assets.map(function(item,i){
                            if(i<c)return <Image key={i} imgData={item} imgSize = {(100/c)+"%"}/>
                        })
                    }
                </div> 
                );
    }
}
export default Widget;