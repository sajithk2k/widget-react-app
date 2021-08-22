import React, { Component } from 'react';
import './image.css';
class Image extends Component {
    constructor(props){
        super(props);
        this.state ={
            imgData : props.imgData,
            selected : (sessionStorage.getItem(props.imgData.id) === "true")
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
        //  console.log('updated Props',this.props);
            this.setState({
                imgData: this.props.imgData
            })
        }
    }
    //image border is set on click and also stored in sessionStorage
    imageClicked(event){
        event.target.classList.toggle("imgborder");
        if(event.target.classList.contains("imgborder")){
            sessionStorage.setItem(this.state.imgData.id,true);
            this.state.selected = true;
        }
        else {
            sessionStorage.setItem(this.state.imgData.id,false);
            this.state.selected = false;
        }
    }
    render() { 
            return (
                    <div className="imgdiv" style = {{width: this.props.imgSize}}> 
                        <img className={this.state.selected?"imgborder":""} src = {this.state.imgData.imageUrl} onClick = {this.imageClicked.bind(this)}></img>
                    </div>
             );
    }
}
 
export default Image;