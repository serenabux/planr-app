'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LandingHeader = function (_React$Component) {
    _inherits(LandingHeader, _React$Component);

    function LandingHeader(props) {
        _classCallCheck(this, LandingHeader);

        var _this = _possibleConstructorReturn(this, (LandingHeader.__proto__ || Object.getPrototypeOf(LandingHeader)).call(this, props));

        _this.blackdropClickHandler = function () {
            _this.setState({ sideDrawerOpen: false });
            _this.setState({ sideDrawerClasses: "side_drawer" });
        };

        _this.drawerToggleClickHandler = function () {
            if (_this.state.sideDrawerOpen == false) {
                _this.setState({ sideDrawerOpen: true });
                _this.setState({ sideDrawerClasses: "side_drawer open" });
            } else {
                _this.setState({ sideDrawerOpen: false });
                _this.setState({ sideDrawerClasses: "side_drawer" });
            }
        };

        _this.state = {
            sideDrawerOpen: false,
            sideDrawerClasses: "side_drawer"
        };
        return _this;
    }

    _createClass(LandingHeader, [{
        key: "render",
        value: function render() {
            var backdrop = void 0;
            if (this.state.sideDrawerOpen) {
                backdrop = React.createElement("div", { className: "backdrop", onClick: this.blackdropClickHandler });
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    { className: "landingHeading" },
                    React.createElement(
                        "nav",
                        { className: "landingHeading_navigation" },
                        React.createElement(
                            "button",
                            { className: "toggle_button", onClick: this.drawerToggleClickHandler },
                            React.createElement("div", { className: "toggle_button_line" }),
                            React.createElement("div", { className: "toggle_button_line" }),
                            React.createElement("div", { className: "toggle_button_line" })
                        ),
                        React.createElement(
                            "div",
                            null,
                            React.createElement("img", { className: "landingHeading_logo", src: "../../images/logoWhite.png" })
                        ),
                        React.createElement("div", { className: "spacer" }),
                        React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "ul",
                                { className: "landingHeading_ul" },
                                React.createElement(
                                    "li",
                                    { className: "landingHeading_li" },
                                    React.createElement(
                                        "a",
                                        { href: "sign_in", className: "navLinks" },
                                        "Sign In"
                                    )
                                ),
                                React.createElement(
                                    "li",
                                    { className: "landingHeading_li" },
                                    React.createElement(
                                        "a",
                                        { href: "sign_up", className: "navLinks buttonLook" },
                                        "Sign Up Free"
                                    )
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "nav",
                    { className: this.state.sideDrawerClasses },
                    React.createElement(
                        "div",
                        { className: "side_drawer_logo_wrapper" },
                        React.createElement("img", { className: "side_drawer_logo", src: "../../images/logoBlue.png" })
                    ),
                    React.createElement(
                        "ul",
                        { className: "side_drawer_ul" },
                        React.createElement(
                            "li",
                            { className: "side_drawer_list" },
                            React.createElement(
                                "a",
                                { className: "side_drawer_navLink", href: "#" },
                                "Sign In"
                            )
                        ),
                        React.createElement(
                            "li",
                            { className: "side_drawer_list" },
                            React.createElement(
                                "a",
                                { className: "side_drawer_navLink", href: "#" },
                                React.createElement(
                                    "div",
                                    null,
                                    "Sign Up"
                                )
                            )
                        )
                    )
                ),
                backdrop
            );
        }
    }]);

    return LandingHeader;
}(React.Component);

var domContainer = document.querySelector('#landingHeader_container');
ReactDOM.render(React.createElement(LandingHeader, null), domContainer);