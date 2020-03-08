'use strict';

class LandingHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        sideDrawerOpen: false,
        sideDrawerClasses: "side_drawer",
    };
  }

  blackdropClickHandler = () => {
    this.setState({sideDrawerOpen: false});
    this.setState({sideDrawerClasses:"side_drawer"})
  }

  drawerToggleClickHandler = () => {
    if(this.state.sideDrawerOpen == false){
      this.setState({sideDrawerOpen: true})
      this.setState({sideDrawerClasses:"side_drawer open"})
    }
    else{
      this.setState({sideDrawerOpen: false})
      this.setState({sideDrawerClasses:"side_drawer"})
    }
    
  }

  render() {
      let backdrop;
      if(this.state.sideDrawerOpen){
        backdrop = <div className="backdrop" onClick={this.blackdropClickHandler}></div>
      }
      return(
    <div>
    <header className="landingHeading">
        <nav className="landingHeading_navigation"> 
            <button className="toggle_button" onClick={this.drawerToggleClickHandler}>
                <div className="toggle_button_line"></div>
                <div className="toggle_button_line"></div>
                <div className="toggle_button_line"></div>
            </button>
            <div>
                <img className="landingHeading_logo"src="../../images/logoWhite.png"/>
            </div>
            <div className="spacer"></div>
            <div>
                <ul className="landingHeading_ul">
                    {/* <li className="landingHeading_li"><a className="navLinks} href="#boxes">Features</a></li>
                    <li className="landingHeading_li"><a className="navLinks}href="#about">About</a></li>
                    <li className="landingHeading_li"><a className="navLinks} href="#">Pricing</a></li> */}
                    <li className="landingHeading_li"><a href ="#" className="navLinks">Sign In</a></li>
                    <li className="landingHeading_li"><a href="#" className="navLinks buttonLook">Sign Up Free</a></li>
                </ul>
            </div>
        </nav>
    </header>
    <nav className={this.state.sideDrawerClasses}>
        <div className="side_drawer_logo_wrapper">
            <img className="side_drawer_logo" src="../../images/logoBlue.png" />
        </div>
        <ul className="side_drawer_ul">
            {/* <li className="side_drawer_list"><a className="side_drawer_navLink" href="#boxes">Features</a></li>
            <li className="side_drawer_list"><a className="side_drawer_navLink" href="#about">About</a></li>
            <li className="side_drawer_list"><a className="side_drawer_navLink" href="#">Pricing</a></li> */}
            <li className="side_drawer_list"><a className="side_drawer_navLink" href="#">Sign In</a></li>
            <li className="side_drawer_list"><a className="side_drawer_navLink" href="#"><div >Sign Up</div></a></li>
        </ul>
</nav>
{backdrop}
</div>
    )
}
}

let domContainer = document.querySelector('#landingHeader_container');
ReactDOM.render(<LandingHeader />, domContainer);