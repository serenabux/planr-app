class SignUp extends React.Component {
    constructor(){
        super();
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            reenter: "",
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
        if(this.state.password !== this.state.reenter){
            this.setState({formError: 'passwords do not match'});
        }
        else{
            var userData = {firstname: this.state.firstname, lastname: this.state.lastname, email: this.state.email, password: this.state.password}
            var JSONObject = JSON.stringify(userData)
        }
      }

      

    render(){

        var passwordclassNames = "form_field";
        if(this.state.formError == 'passwords do not match'){
            passwordclassNames = "form_field password_field";
        }
        return(
            <div className =  "sign_up_container">
                <h2 className= "sign_up_header">Let the Adventures Begin!</h2>
                <form onSubmit={this.handleSubmit}>
                    <label className = "sign_up_label">First Name
                        <input className = "form_field" type='text' name='firstname' value = {this.state.firstname} onChange = {this.handleChange} required/>
                    </label> 
                    <label className = "sign_up_label">Last Name
                        <input className = "form_field" type='text' name='lastname' value = {this.state.lastname} onChange = {this.handleChange} required/>
                    </label>
                    <label className = "sign_up_label">Email
                        <input className = "form_field" type='text' name='email' value = {this.state.email} onChange = {this.handleChange} required/>
                    </label>
                    <label className = "sign_up_label">Password
                    <input className = {passwordclassNames} type='password' name='password' value = {this.state.password} onChange = {this.handleChange} required/>
                    </label>
                    <label className = "sign_up_label">Re-enter Password
                    <input className = {passwordclassNames} type='password' name='reenter' value = {this.state.reenter} onChange = {this.handleChange} required/>
                    </label>
                    <p className = "sign_up_error">{this.state.formError}</p>
                    <button className = "sign_up_button" type="submit" >Create Account</button>
                    <p className = "smallText">Already have an account? <a href="sign_in">Sign In</a></p>
                </form>
            </div>
        )
    }
}

let domContainer = document.querySelector('#sign_up_container');
ReactDOM.render(<SignUp/>, domContainer);


