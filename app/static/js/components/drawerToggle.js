'use strict';

class DrawerToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        sideDrawerOpen: false
    };
  }


  drawerToggleClickHandler = () => {
    if(this.state.sideDrawerOpen == false){
      this.setState({sideDrawerOpen: true})
    }
    else{
      this.setState({sideDrawerOpen: false})
    }
    
  }

  render() {
      return(
        <button className="toggle_button" onClick={this.drawerToggleClickHandler}>
            <div className="toggle_button_line"></div>
            <div className="toggle_button_line"></div>
            <div className="toggle_button_line"></div>
        </button>
    )
}
}

let domContainer = document.querySelector('#drawerToggleButton');
ReactDOM.render(<DrawerToggleButton />, domContainer);