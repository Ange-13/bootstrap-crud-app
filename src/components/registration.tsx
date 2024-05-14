import React, { ChangeEvent, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Registration = () => {
  const [valueName, setValueName] = useState('');
  const [valuePrintName, setValuePrintName] = useState('');

  function printName(eventName: ChangeEvent<HTMLInputElement>) {
    setValueName(eventName.target.value);
    console.log(eventName);
    console.log(valueName);
  }

  function handleOnClick(event: any) {
    event.preventDefault(event);
    fetch('http://localhost:8081/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: valueName,
        email: valueMail,
        password: valuePass,
      }),
    }).then(() => {
      setValuePrintName(valueName);
      setValuePrintEmail(valueMail);
      setValuePrintPass(valuePass);
      setValuePrintConfirmPass(valueConfirmPass);
    });
  }

  const [valueMail, setValueMail] = useState('');
  const [valuePrintEmail, setValuePrintEmail] = useState('');

  function printEmail(eventMail: ChangeEvent<HTMLInputElement>) {
    setValueMail(eventMail.target.value);
    console.log('event1:', eventMail);
    console.log(valueMail);
  }

  const [valuePass, setValuePass] = useState('');
  const [valuePrintPass, setValuePrintPass] = useState('');

  function printPass(eventPass: ChangeEvent<HTMLInputElement>) {
    setValuePass(eventPass.target.value);
    console.log('event1:', eventPass);
    console.log(valuePass);
  }

  const [valueConfirmPass, setValueConfirmPass] = useState('');
  const [valuePrintConfirmPass, setValuePrintConfirmPass] = useState('');

  function printConfirmPass(eventConfirmPass: ChangeEvent<HTMLInputElement>) {
    setValueConfirmPass(eventConfirmPass.target.value);
    console.log('event1:', eventConfirmPass);
    console.log(eventConfirmPass);
  }

  return (
    <div className='row d-flex justify-content-center align-items-center vh-100 bg-body-secondary'>
      <form className='col-6'>
        {/* Form fields */}
        <div className='mb-3 row justify-content-end'>
          {/* Name */}
          <label
            htmlFor='inputName'
            className='col-sm-3 col-form-label text-end'
          >
            Name
          </label>
          <div className='col-sm-9'>
            <input
              type='text'
              className='form-control'
              id='inputName'
              aria-describedby='nameHelp'
              required
              value={valueName}
              onChange={(eventName) => printName(eventName)}
            />
          </div>
        </div>

        <div className='mb-3 row justify-content-end'>
          <label
            htmlFor='inputEmail'
            className='col-sm-3 col-form-label text-end'
          >
            Email address
          </label>
          <div className='col-sm-9'>
            <input
              type='email'
              className='form-control'
              id='inputEmail'
              aria-describedby='emailHelp'
              required
              value={valueMail}
              onChange={(eventMail) => printEmail(eventMail)}
            />
          </div>
        </div>

        <div className='mb-3 row justify-content-end'>
          <label
            htmlFor='inputPassword'
            className='col-sm-3 col-form-label text-end'
          >
            Password
          </label>
          <div className='col-sm-9'>
            <input
              type='password'
              className='form-control'
              id='inputPassword'
              required
              value={valuePass}
              onChange={(eventPass) => printPass(eventPass)}
            />
          </div>
        </div>

        <div className='mb-3 row justify-content-end'>
          <label
            htmlFor='inputConfirmPassword'
            className='col-sm-3 col-form-label text-end'
          >
            Confirm Password
          </label>
          <div className='col-sm-9'>
            <input
              type='password'
              className='form-control'
              id='inputConfirmPassword'
              required
              value={valueConfirmPass}
              onChange={(eventConfirmPass) =>
                printConfirmPass(eventConfirmPass)
              }
            />
          </div>
        </div>

        <button
          type='submit'
          className='btn btn-primary justify-content-center '
          onClick={(event) => handleOnClick(event)}
        >
          Add user
        </button>
      </form>

      <div className='d-inline-block'>
        {valuePrintName} {valuePrintEmail} {valuePrintPass}{' '}
        {valuePrintConfirmPass}
      </div>
    </div>
  );
};

export default Registration;
