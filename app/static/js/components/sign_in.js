class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            email: "",
            password: "",
            formError: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
    
        this.setState({
          [name]: value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
            var userData = {email: this.state.email, password: this.state.password}
            var JSONObject = JSON.stringify(userData)
            console.log(JSONObject)
      }


    render(){
        return(
                    <div className = "sign_up_container">
                        <h2 className="sign_up_header">Welcome Back!</h2>
                        <form onSubmit={this.handleSubmit}>
                            <label className = "sign_up_label">Email
                                <input className = "form_field"type='text' name='email' value = {this.state.email} onChange = {this.handleChange} required/>
                            </label>
                            <label className = "sign_up_label">Password
                            <input className = "form_field" type='password' name='password' value = {this.state.password} onChange = {this.handleChange} required/>
                            </label>
                            <p className = "sign_up_error">{this.state.formError}</p>
                            <button type="submit" className="sign_up_button">Sign In</button>
                            <p className= "smallText">New Adventurer? <a href="sign_in">Sign In</a></p>
                        </form>
                    </div>
        )
    }
}

let domContainer = document.querySelector('#sign_in_container');
ReactDOM.render(<SignIn/>, domContainer);
