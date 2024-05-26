import React, { ChangeEvent, useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button } from 'react-bootstrap';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  confirmPassword: '';
}

const Registration = () => {
  const [valueName, setValueName] = useState('');
  const [valuePrintName, setValuePrintName] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();
  const [valuePass, setValuePass] = useState('');
  const [valuePrintPass, setValuePrintPass] = useState('');
  const [valueMail, setValueMail] = useState('');
  const [valuePrintEmail, setValuePrintEmail] = useState('');
  const [valueConfirmPass, setValueConfirmPass] = useState('');
  const [valuePrintConfirmPass, setValuePrintConfirmPass] = useState('');

  useEffect(() => {
    fetchUsers().then();
  }, []);

  function printName(eventName: ChangeEvent<HTMLInputElement>) {
    setValueName(eventName.target.value);
    console.log(eventName);
    console.log(valueName);
  }

  function handleOnClick(event: any) {
    const hasLetters = /[a-zA-Z]/.test(valuePass);
    const hasNumbers = /[0-9]/.test(valuePass);

    event.preventDefault(event);
    if (valueName.length <= 8) {
      alert('Username must contain more than 8 characters');
      return;
    }
    if (valuePass.length <= 4) {
      alert('Your password must contain more than 8 characters!');
      return;
    }

    if (!hasLetters || !hasNumbers) {
      alert('Password must contain both letters and numbers');
      return;
    }

    if (valuePass != valueConfirmPass) {
      alert('Passwords do not match ! Please confirm your password.');
      return;
    }

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
    }).then((response) => {
      if (!response.ok) {
        response.json().then((err) => alert(err.error));
        return;
      }
      setValuePrintName(valueName);
      setValuePrintEmail(valueMail);
      setValuePrintPass(valuePass);
      setValuePrintConfirmPass(valueConfirmPass);

      fetchUsers().then(() => console.log(users));
    });
  }

  function deleteOnClick(id: number) {
    fetch(`http://localhost:8081/users/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then(() => {
      fetchUsers().then();
    });
  }

  async function fetchUsers() {
    try {
      const response = await fetch('http://localhost:8081/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  function showEdit(user: User) {
    setCurrentUser(user);
    setToggleModal(true);
  }

  function handleCloseModal() {
    setCurrentUser(undefined);
    setToggleModal(false);
  }

  function handleEditUser() {
    if (currentUser == undefined) {
      alert("Current User doesn't exist");
      return;
    }
    if (currentUser.name.length <= 8) {
      alert('Username must contain more than 8 characters');
      return;
    }
    if (currentUser.password.length <= 4) {
      alert('Password must be longer than 4 characters');
      return;
    }
    fetch(`http://localhost:8081/users/${currentUser?.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: currentUser?.name,
        email: currentUser?.email,
        password: currentUser?.password,
      }),
    }).then((response) => {
      if (!response.ok) {
        response.json().then((err) => alert(err.error));
        return;
      }
      fetchUsers().then(() => setToggleModal(false));
    });
  }

  function printEmail(eventMail: ChangeEvent<HTMLInputElement>) {
    setValueMail(eventMail.target.value);
    console.log('event1:', eventMail);
    console.log(valueMail);
  }

  function changeCurrentName(eventName: ChangeEvent<HTMLInputElement>) {
    if (currentUser) {
      let updatedUser = { ...currentUser };
      updatedUser.name = eventName.target.value;
      setCurrentUser(updatedUser);
      console.log('Updated user:', updatedUser);
    }
  }

  function changeCurrentEmail(eventName: ChangeEvent<HTMLInputElement>) {
    if (currentUser) {
      let updatedUser = { ...currentUser };
      updatedUser.email = eventName.target.value;
      setCurrentUser(updatedUser);
      console.log('Updated user:', updatedUser);
    }
  }

  function changeCurrentPassword(eventName: ChangeEvent<HTMLInputElement>) {
    if (currentUser) {
      let updatedUser = { ...currentUser };
      updatedUser.password = eventName.target.value;
      setCurrentUser(updatedUser);
      console.log('Updated user:', updatedUser);
    }
  }

  function printPass(eventPass: ChangeEvent<HTMLInputElement>) {
    setValuePass(eventPass.target.value);
    console.log('event1:', eventPass);
    console.log(valuePass);
  }

  function printConfirmPass(eventConfirmPass: ChangeEvent<HTMLInputElement>) {
    setValueConfirmPass(eventConfirmPass.target.value);
    console.log('event1:', eventConfirmPass);
    console.log(eventConfirmPass);
  }

  return (
    <div className='row d-flex  align-items-center vh-100 bg-body-secondary text-center'>
      <form className='col-6  was-validated  needs-validation novalidate'>
        <div className='mb-3 row justify-content-end'>
          <label
            htmlFor='inputName'
            className='col-sm-3 col-form-label text-end '
          >
            Name
          </label>
          <div className='col-sm-6'>
            <input
              required
              type='text'
              className='form-control '
              id='inputName'
              aria-describedby='nameHelp'
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
          <div className='col-sm-6'>
            <input
              required
              type='email'
              className='form-control'
              id='inputEmail'
              aria-describedby='emailHelp'
              value={valueMail}
              onChange={(eventMail) => printEmail(eventMail)}
            />
          </div>
          <div className='invalid-feedback'>Invalid email address</div>
        </div>

        <div className='mb-3 row justify-content-end'>
          <label
            htmlFor='inputPassword'
            className='col-sm-3 col-form-label text-end'
          >
            Password
          </label>
          <div className='col-sm-6'>
            <input
              required
              type='password'
              className='form-control'
              id='inputPassword'
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
          <div className='col-sm-6'>
            <input
              required
              type='password'
              className='form-control'
              id='inputConfirmPassword'
              value={valueConfirmPass}
              onChange={(eventConfirmPass) =>
                printConfirmPass(eventConfirmPass)
              }
            />
          </div>
        </div>

        <div className='row justify-content-end'>
          <div className='col-sm-9 offset-sm-3 d-flex justify-content-end'>
            <button
              type='submit'
              className='btn btn-primary'
              onClick={(event) => handleOnClick(event)}
            >
              Add user
            </button>
          </div>
        </div>
      </form>

      <table className='table table-hover'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Email</th>
            <th scope='col'>Password</th>
            <th scope='col'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <th scope='row'>{user.id}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>
                <button
                  className='btn btn-primary btn-sm me-1'
                  onClick={() => showEdit(user)}
                >
                  Edit
                </button>
                <button
                  className='btn btn-danger btn-sm'
                  onClick={() => {
                    deleteOnClick(user.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={toggleModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className='mb-3'>
              <label htmlFor='editName' className='form-label'>
                Name
              </label>
              <input
                type='text'
                className='form-control'
                id='editName'
                value={currentUser?.name}
                onChange={(eventName) => changeCurrentName(eventName)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='editEmail' className='form-label'>
                Email
              </label>
              <input
                type='email'
                className='form-control'
                id='editEmail'
                value={currentUser?.email}
                onChange={(eventMail) => changeCurrentEmail(eventMail)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='editPassword' className='form-label'>
                Password
              </label>
              <input
                type='password'
                className='form-control'
                id='editPassword'
                value={currentUser?.password}
                onChange={(eventPass) => changeCurrentPassword(eventPass)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='confirmPassword' className='form-label'>
                Confirm Password
              </label>
              <input
                type='password'
                className='form-control'
                id='confirmPassword'
                value={currentUser?.confirmPassword}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant='primary' onClick={handleEditUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Registration;
