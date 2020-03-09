var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignUp = function (_React$Component) {
    _inherits(SignUp, _React$Component);

    function SignUp() {
        _classCallCheck(this, SignUp);

        var _this = _possibleConstructorReturn(this, (SignUp.__proto__ || Object.getPrototypeOf(SignUp)).call(this));

        _this.handleSubmit = function (event) {
            event.preventDefault();
            if (_this.state.password !== _this.state.reenter) {
                _this.setState({ formError: 'passwords do not match' });
            } else {
                var userData = { firstname: _this.state.firstname, lastname: _this.state.lastname, email: _this.state.email, password: _this.state.password };
                var JSONObject = JSON.stringify(userData);
            }
        };

        _this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            reenter: "",
            formError: ""
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(SignUp, [{
        key: "handleChange",
        value: function handleChange(event) {
            var target = event.target;
            var name = target.name;
            var value = target.value;

            this.setState(_defineProperty({}, name, value));
        }
    }, {
        key: "render",
        value: function render() {

            var passwordclassNames = "form_field";
            if (this.state.formError == 'passwords do not match') {
                passwordclassNames = "form_field password_field";
            }
            return React.createElement(
                "div",
                { className: "sign_up_container" },
                React.createElement(
                    "h2",
                    null,
                    "Let the Adventures Begin!"
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        "label",
                        { className: "sign_up_label" },
                        "First Name",
                        React.createElement("input", { className: "form_field", type: "text", name: "firstname", value: this.state.firstname, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "label",
                        { className: "sign_up_label" },
                        "Last Name",
                        React.createElement("input", { className: "form_field", type: "text", name: "lastname", value: this.state.lastname, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "label",
                        { className: "sign_up_label" },
                        "Email",
                        React.createElement("input", { className: "form_field", type: "text", name: "email", value: this.state.email, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "label",
                        { className: "sign_up_label" },
                        "Password",
                        React.createElement("input", { className: passwordclassNames, type: "password", name: "password", value: this.state.password, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "label",
                        { className: "sign_up_label" },
                        "Re-enter Password",
                        React.createElement("input", { className: passwordclassNames, type: "password", name: "reenter", value: this.state.reenter, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "p",
                        { className: "sign_up_error" },
                        this.state.formError
                    ),
                    React.createElement(
                        "button",
                        { className: "sign_up_button", type: "submit" },
                        "Create Account"
                    ),
                    React.createElement(
                        "p",
                        { className: "smallText" },
                        "Already have an account? ",
                        React.createElement(
                            "a",
                            { href: "sign_in" },
                            "Sign In"
                        )
                    )
                )
            );
        }
    }]);

    return SignUp;
}(React.Component);

var domContainer = document.querySelector('#sign_up_container');
ReactDOM.render(React.createElement(SignUp, null), domContainer);