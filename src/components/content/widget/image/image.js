import React, { Component } from 'react';
import './image.css';
class Image extends Component {
    constructor(props){
        super(props);
        this.state ={
            imgData : props.imgData
        }
        //get sessionStorage here
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
        console.log(this.state.imgData.id);
        if(event.target.classList.contains("imgborder"))sessionStorage.setItem(this.state.imgData.id,true);
        else sessionStorage.setItem(this.state.imgData.id,false);
    }
    render() { 
        let selected = (sessionStorage.getItem(this.state.imgData.id) === "true");
        // console.log("Showing selected value" + selected);
        // console.log(this.props.imgSize);
            return (
                    <div className="imgdiv" style = {{width: this.props.imgSize}}> 
                        <img className={selected?"imgborder":""} src = {this.state.imgData.imageUrl} onClick = {this.imageClicked.bind(this)}></img>
                    </div>
             );
    }
}
 
export default Image;