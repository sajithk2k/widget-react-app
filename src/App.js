import './App.css';
import PincodeBox from './components/pincodebox/pincodebox';
import Content from './components/content/content';
import React, { Component } from 'react';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
        slots:[],
        widgets:[]
    }
    this.getAllWidgets = this.getAllWidgets.bind(this);
    this.checkIfContainer = this.checkIfContainer.bind(this);
    this.handlePincode = this.handlePincode.bind(this);
    this.searchWidgets = this.searchWidgets.bind(this);
  }
  //executes after components are mounted
    componentDidMount(){
      let self = this;
  fetch('https://flipkart-page-api.now.sh')
  .then(response => response.json())
  .then(function(data){
    self.setState({slots:data});
    let temp = [];
    self.getAllWidgets(temp,data,"100%");
    self.setState({widgets:temp});
})
  .catch(error => {
    console.error("Error: " + error)
  });
  //initialize sessionStorage
  if(!sessionStorage.getItem("selectedimgs"))sessionStorage.setItem("selectedimgs",JSON.stringify([]));
  }

  //checks if an object is a container or widget
  checkIfContainer(container){
      return container.hasOwnProperty('children');
    }

  //decomposes containers into widgets
  getAllWidgets(widgets,slots,parentGrow){
      for(let i=0;i<slots.length;i++){
          let temp = slots[i].grow;
          temp = Number(temp.slice(0,-1));
          temp = (temp/100) * Number(parentGrow.slice(0,-1)) +"%";
          slots[i].grow = temp;
          if(this.checkIfContainer(slots[i])){
            this.getAllWidgets(widgets,slots[i].children,slots[i].grow);
          }
          else {
            widgets.push(slots[i]);
          }
      }
  }

  //checks if a widget can be served for a pincode
  checkForPincode(pincode,w){
    if(!w.hasOwnProperty("serviceablePincodes"))return true;
    else if(w.serviceablePincodes.includes(pincode))return true;
    else return false;
  }

  //searches for widgets that can be served for a pincode
  searchWidgets(pincode,container,results){
    let children = container.children;
    let temp = [],flag = true;
    for(let i=0;i<children.length;i++){
      if(this.checkIfContainer(children[i]))this.searchWidgets(pincode,children[i],results);
      else{
        if(!this.checkForPincode(pincode,children[i]))flag = false;
        temp.push(children[i]);
      }
      }
      if(flag){
        for(let i=0;i<temp.length;i++){
          results.push(temp[i]);
        }
    }
  }

  //executed when enter is pressed on pincode box
  handlePincode(pincode){
    console.log(pincode);
    let results = [];
    let slots = this.state.slots;
    for(let i=0;i<slots.length;i++){
      if(!this.checkIfContainer(slots[i])){
        if(this.checkForPincode(pincode,slots[i]))results.push(slots[i]);
      }
      else this.searchWidgets(pincode,slots[i],results);
    }
    this.setState({widgets:results});
  }

  render() { 
    if(this.state.slots.length === 0){return null;}
    return ( <div style={{height:"100%"}}>
             <PincodeBox getPincode ={this.handlePincode}/>
              <Content widgets = {this.state.widgets}/>
              </div> 
              );
  }
}
 
export default App;

