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
    componentDidUpdate(prevProps, prevState) {
        if (prevProps !== this.props) {
         console.log('updated Props',this.props);
            this.setState({
                widgetData: this.props.widgetData
            })
        }
    }
    render() { 
        var c = this.state.widgetData.imageCount;
        return ( <div id="widget"> 
                    {
                        this.state.widgetData.assets.map(function(item,i){
                            if(i<c)return <Image key={i} imgData={item}/>
                        })
                    }
                </div> 
                );
    }
}
export default Widget;