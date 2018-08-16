import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
import authAction from '../../redux/auth/actions';
import IntlMessages from '../../components/utility/intlMessages';
import SignInStyleWrapper from './signin.style';
import Form from '../../components/uielements/form';
import Notification from '../../components/notification';
const FormItem = Form.Item;
const { login } = authAction;

class SignIn extends Component {
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
    const { login, isLoggedIn } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        login(values)
      }
    });
    if (isLoggedIn) {
      Notification(
        'success',
        'Login Successful'
      );
    }
  };
  render() {
    const from = { pathname: '/dashboard' };
    const { getFieldDecorator } = this.props.form;
    const { redirectToReferrer } = this.state;
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }
    return (
      <SignInStyleWrapper className="isoSignInPage">
        <div className="isoLoginContentWrapper">
          <div className="isoLoginContent">
            <div className="isoLogoWrapper">
              <Link to="/dashboard">
                <IntlMessages id="page.signInTitle" />
              </Link>
            </div>

            <Form className="isoSignInForm" onSubmit={this.handleSubmit}>
              <div className="isoInputWrapper">
                <FormItem style={{marginBottom: 0}} label="Username" hasFeedback>
                  {getFieldDecorator('username')(<Input type="username" />)}
                </FormItem>
              </div>

              <div className="isoInputWrapper">
                <FormItem style={{marginBottom: 0}} label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                      rules: [
                        {
                          required: true,
                          message: 'Please input a password',
                        },
                      ],
                    })(<Input type="password" />)}
                </FormItem>
              </div>

              <div className="isoInputWrapper isoLeftRightComponent">
                
                <FormItem style={{marginBottom: 0}} {...tailFormItemLayout}>
                  <Button type="primary" htmlType="submit">
                    Sign In
                  </Button>
                </FormItem>
              </div>

              
              {/*
              <div className="isoInputWrapper isoOtherLogin">
                <Button onClick={this.handleLogin} type="primary btnFacebook">
                  <IntlMessages id="page.signInFacebook" />
                </Button>
                <Button onClick={this.handleLogin} type="primary btnGooglePlus">
                  <IntlMessages id="page.signInGooglePlus" />
                </Button>
              </div>
              */}
              
            </Form>
          </div>
        </div>
      </SignInStyleWrapper>
    );
  }
}
const ValidatedSignIn = Form.create()(SignIn);
console.log(ValidatedSignIn);
export default connect(
  state => ({
    isLoggedIn: state.Auth.idToken !== null ? true : false,
    loginMessage: state.Auth.message
  }),
  { login }
)(ValidatedSignIn);
