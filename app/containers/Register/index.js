/* eslint-disable */

import React, { useMemo, memo } from 'react';
import FormValidationErrors from 'components/FormErrors/validateSignup';
import FormSubmitErrors from 'components/FormErrors/submitSignupError';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { createStructuredSelector } from 'reselect';
import ModelValidations from 'utils/model-validation';

import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from 'reactstrap';
import {
  registerAction,
  changeUserName as changeUserNameAction,
  changePassword as changePasswordAction,
  changeConfirmPassword as changeConfirmPasswordAction,
  registerSetValidation as registerSetValidationAction,
  resetMsgErrors as resetMsgErrorsAction,
} from './actions';

import {
  makeSelectUsername,
  makeSelectPassword,
  makeSelectConfirmPassword,
  getMessageErrorRegister,
  makeSelectValidation,
  makeSelectRegisterSucceed,
  makeSelectMsgError,
} from './selectors';

import saga from './sagas';
import reducer from './reducers';

// reactstrap components

const key = 'register';

const Register = props => {
  const {
    history,
    username,
    password,
    repassword,
    registerErrMsg,
    registerHandler,
    changeUserName,
    changePassword,
    changeConfirmPassword,
    validation,
    setValidation,
    registerSucceed,
    msgErrors,
    resetMsgErrors,
  } = props;
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useMemo(() => {
    if (registerSucceed) {
      history.push('/auth/login');
    }
  }, [registerSucceed]);
  const onchangeRegisterUsername = e => {
    const field = e.target.name;
    const { value } = e.target;

    changeUserName(value);
    validate(field, value);
    resetMsgErrors();
  };
  const onchangeRegisterPassword = e => {
    const field = e.target.name;
    const { value } = e.target;
    changePassword(value);
    validate(field, value);
    resetMsgErrors();
  };
  const onchangeRegisterRepassword = e => {
    const field = e.target.name;
    const { value } = e.target;
    changeConfirmPassword(value);
    validate(field, value);
    resetMsgErrors();
  };
  const btnCreateAccountClick = e => {
    e.preventDefault();
    registerHandler({ username, password, repassword });
  };
  const validate = (field, value) => {
    if (validation[field]) validation[field].touched = true;
    switch (field) {
      case 'username':
        validation.username.valid = ModelValidations.username.regex.value.test(
          value,
        );
        break;
      case 'password':
        validation.password.valid =
          value.length >= ModelValidations.password.minLength.value;
        break;
      case 'repassword':
        validation.repassword.valid = value === password;
        break;
    }

    validation.formValid = true;
    Object.keys(validation).forEach(key => {
      if (
        typeof validation[key].valid === 'boolean' &&
        !validation[key].valid
      ) {
        validation.formValid = false;
      }
    });
    setValidation(validation.formValid);
  };
  return (
    <>
      <Col lg="6" md="8">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-5">
            <div className="text-muted text-center mt-2 mb-4">
              <small>Sign up</small>
            </div>
          </CardHeader>
          <FormValidationErrors validation={validation} />
          <FormSubmitErrors errors={msgErrors} />
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              {/* form Name */}
              <FormGroup
                className={
                  !validation.username.valid && validation.username.touched
                    ? 'has-error'
                    : ''
                }
              >
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-hat-3" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Username"
                    name="username"
                    type="text"
                    onChange={onchangeRegisterUsername}
                  />
                </InputGroup>
              </FormGroup>
              {/* form password */}
              <FormGroup
                className={
                  !validation.password.valid && validation.password.touched
                    ? 'has-error'
                    : ''
                }
              >
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    onChange={onchangeRegisterPassword}
                  />
                </InputGroup>
              </FormGroup>
              {/* form re-input password */}
              <FormGroup
                className={
                  !validation.repassword.valid && validation.repassword.touched
                    ? 'has-error'
                    : ''
                }
              >
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    name="repassword"
                    autoComplete="new-password"
                    onChange={onchangeRegisterRepassword}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button
                  disabled={!validation.formValid}
                  onClick={btnCreateAccountClick}
                  className="mt-4"
                  color="primary"
                  type="button"
                >
                  Create account
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  repassword: makeSelectConfirmPassword(),
  registerErrMsg: getMessageErrorRegister(),
  validation: makeSelectValidation(),
  registerSucceed: makeSelectRegisterSucceed(),
  msgErrors: makeSelectMsgError(),
});

export const mapDispatchToProps = dispatch => ({
  dispatch,
  registerHandler: ({ username, password, repassword }) =>
    dispatch(registerAction({ username, password, repassword })),
  changeUserName: username => dispatch(changeUserNameAction(username)),
  changePassword: password => dispatch(changePasswordAction(password)),
  changeConfirmPassword: repassword =>
    dispatch(changeConfirmPasswordAction(repassword)),
  setValidation: status => dispatch(registerSetValidationAction(status)),
  resetMsgErrors: () => dispatch(resetMsgErrorsAction()),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Register);
