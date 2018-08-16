import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Input from "../../components/uielements/input";
import Checkbox from "../../components/uielements/checkbox";
import Button from "../../components/uielements/button";
import authAction from "../../redux/auth/actions";
import appActions from "../../redux/app/actions";
import IntlMessages from "../../components/utility/intlMessages";
import SignUpStyleWrapper from "./signup.style";
import Form from '../../components/uielements/form';
import Notification from '../../components/notification';
const FormItem = Form.Item;

const { signup, login } = authAction;
const { clearMenu } = appActions;

class SignUp extends Component {
  state = {
    redirectToReferrer: false
  };
  componentWillReceiveProps(nextProps) {
    if (
      this.props.isLoggedIn !== nextProps.isLoggedIn &&
      nextProps.isLoggedIn === true
    ) {
      this.setState({ redirectToReferrer: true });
    }
  }
  handleSubmit = e => {
    const { signup, clearMenu } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        delete values.confirm;
        signup(values);
      }
    });
  };
  checkPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  handleLogin = () => {
    const { login, clearMenu } = this.props;
    
    login();
    clearMenu();
    this.props.history.push("/dashboard");
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <SignUpStyleWrapper className="isoSignUpPage">
        <div className="isoSignUpContentWrapper">
          <div className="isoSignUpContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signUpTitle" />
              </Link>
            </div>
            <Form className="isoSignUpForm" onSubmit={this.handleSubmit} >
              <div className="isoInputWrapper">
                <FormItem style={{marginBottom:0}} label="Full Name" hasFeedback>
                  {getFieldDecorator('first_name', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your Full Name',
                      },
                    ],
                  })(<Input type="text" />)}
                </FormItem>
                
              </div>

              <div className="isoInputWrapper">
                <FormItem style={{marginBottom:0}} label="E-mail" hasFeedback>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input name="email" id="email" />)}
                </FormItem>
              </div>

              <div className="isoInputWrapper">
                <FormItem style={{marginBottom:0}} label="Password" hasFeedback>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please input your password!',
                      },
                      {
                        min: 6,
                        message: 'The password should be atleast 6 characters long'
                      },
                      {
                        validator: this.checkConfirm,
                      },
                    ],
                  })(<Input type="password" />)}
                </FormItem>
              </div>

              <div className="isoInputWrapper">
                <FormItem style={{marginBottom:0}} label="Confirm Password" hasFeedback>
                  {getFieldDecorator('confirm', {
                    rules: [
                      {
                        required: true,
                        message: 'Please confirm your password!',
                      },
                      {
                        validator: this.checkPassword,
                      },
                    ],
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>
              </div>

              <div className="isoInputWrapper" style={{ marginBottom: "50px" }}>
                <Checkbox>
                  <IntlMessages id="page.signUpTermsConditions" />
                </Checkbox>
              </div>

              <div className="isoInputWrapper">
                <FormItem style={{marginBottom: 0}} >
                  <Button type="primary" htmlType="submit">
                    Register
                  </Button>
                </FormItem>
              </div>
              
              <div className="isoInputWrapper isoCenterComponent isoHelperWrapper">
                <Link to="/signin">
                  <IntlMessages id="page.signUpAlreadyAccount" />
                </Link>
              </div>
            </Form>
          
          </div>
        </div>
      </SignUpStyleWrapper>
    );
  }
}
const ValidatedSignUp = Form.create()(SignUp);

export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false
  }),
  { login, clearMenu, signup }
)(ValidatedSignUp);
