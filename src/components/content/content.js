import React, { Component } from 'react';
import Widget from './widget/widget';
import './content.css'
class Tree extends Component {
    constructor(props){
        super(props);
        this.state={
            data:props.slots
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
        //  console.log('updated Props',this.props);
            this.setState({
                data: this.props.slots
            })
        }
    }
    render() { 
        // console.log("Inside tree component");
        // console.log(this.state.data);
        if(this.state.data.length === 0)return(null);
        return (
                this.state.data.map((tree) => (
                    <TreeNode node={tree}  />
                ))
            );
    }
}
const TreeNode = ({ node }) => {
    // console.log("Printing a node");
    // console.log(node);
    const hasChild = node.children ? true : false;
    if(hasChild){
        return (
            <div id="container" style ={{width:node.grow}}>
                 <Tree slots ={node.children}/>
            </div>
                );
    }
    return (
            <Widget widgetData = {node}/>
    );
  };
  
export default Tree;