var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SignIn = function (_React$Component) {
    _inherits(SignIn, _React$Component);

    function SignIn() {
        _classCallCheck(this, SignIn);

        var _this = _possibleConstructorReturn(this, (SignIn.__proto__ || Object.getPrototypeOf(SignIn)).call(this));

        _this.handleSubmit = function (event) {
            event.preventDefault();
            var userData = { email: _this.state.email, password: _this.state.password };
            var JSONObject = JSON.stringify(userData);
            console.log(JSONObject);
        };

        _this.state = {
            email: "",
            password: "",
            formError: ""
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }

    _createClass(SignIn, [{
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
            return React.createElement(
                "div",
                { className: "sign_in_container" },
                React.createElement(
                    "h2",
                    null,
                    "Welcome Back!"
                ),
                React.createElement(
                    "form",
                    { onSubmit: this.handleSubmit },
                    React.createElement(
                        "label",
                        { className: "label" },
                        "Email",
                        React.createElement("input", { className: "form_field", type: "text", name: "email", value: this.state.email, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "label",
                        { className: "label" },
                        "Password",
                        React.createElement("input", { className: "form_field", type: "password", name: "password", value: this.state.password, onChange: this.handleChange, required: true })
                    ),
                    React.createElement(
                        "p",
                        { className: "sign_up_error" },
                        this.state.formError
                    ),
                    React.createElement(
                        "button",
                        { type: "submit", className: "sign_up_button" },
                        "Sign In"
                    ),
                    React.createElement(
                        "p",
                        { className: "smallText" },
                        "New Adventurer? ",
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

    return SignIn;
}(React.Component);

var domContainer = document.querySelector('#sign_in_container');
ReactDOM.render(React.createElement(SignIn, null), domContainer);