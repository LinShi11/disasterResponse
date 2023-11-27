import React, { useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [name, setName] = useState({ first: '', last: '' });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({
    door: '',
    street: '',
    apt: '',
    city: '',
    state: '',
    zip: '',
  });
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [alerts, setAlerts] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: name,
      username: username,
      password: password,
      address: address,
      phone: phone,
      email: email,
      preference: {
        contact: contact,
        alerts: alerts,
      },
    };

    fetch('/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
            setMessage(json.message);
            if (json.message === "Signup successful")
            {
                navigate('/login');
            }
        })
      .catch((error) => console.error('Error signing up:', error));
  };

  return (
    <div>
        <div className="centered-container-signup">
            <form onSubmit={handleSubmit}>
                <div class="input-group">
                    <input type="text" required class="form-control m-bot" id="Fname" placeholder="First Name"
                     value={name.first} onChange={(e) => setName({ ...name, first: e.target.value })} />
                    <input type="text" required class="form-control m-bot" id="Lname" placeholder="Last Name"
                     value={name.last} onChange={(e) => setName({ ...name, last: e.target.value })} />
                </div>
                <div class="input-box">
                    <input type="text" required class="form-control m-bot" id="Username" placeholder="Username"
                    value={username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" required class="form-control m-bot" id="inputPassword4" placeholder="Password"
                    value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div class="input-group">
                    <input type="text" required class="form-control" id="inputAddress" placeholder="Door number"
                    value={address.door} onChange={(e) => setAddress({ ...address, door: e.target.value })} />
                    <input type="text" required class="form-control" id="inputAddress" placeholder="Street Name"
                    value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                </div>
                <div class="input-group margin-top">
                    <input type="text" class="form-control" id="inputAddress" placeholder="Apt/unit"
                    value={address.apt} onChange={(e) => setAddress({ ...address, apt: e.target.value })} />
                    <input type="text" required class="form-control" id="inputCity" placeholder="City"
                    value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                </div>
                <div class="input-box input-group margin-top">
                    <input type="text" required class="form-control" id="inputAddress" placeholder="State"
                    value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                    <input type="text" required class="form-control" id="inputZip" placeholder="Zip"
                    value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                </div>
                <div class="input-box">
                    <input type="tel" required class="form-control m-bot" id="phone" placeholder="Phone Number"
                    value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <input type="email" required class="form-control m-bot" id="email" placeholder="Email Address"
                    value={email} onChange={(e) => setEmail(e.target.value)} />

                    {/* <select class="custom-select my-1 mr-sm-2 m-bot" required id="inlineFormCustomSelectPref"
                    value={contact} onChange={(e) => setContact(e.target.value)}>
                        <option selected>Consent for authorities to contact you</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                    <select class="custom-select my-1 mr-sm-2 m-bot" required id="inlineFormCustomSelectPref" 
                    value={alerts} onChange={(e) => setAlerts(e.target.value)} >
                        <option selected>Receive weather alerts</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select> */}

                    <label class="form-check-label">Consent for authorities to contact you </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions0" id="inlineRadio1" 
                            value="0" onChange={(e) => setContact(e.target.value)} />
                            <label class="form-check-label" value="0" for="inlineRadio0">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" 
                            value="1" onChange={(e) => setContact(e.target.value)} />
                            <label class="form-check-label" value="1" for="inlineRadio1">No</label>
                        </div>

                        <label class="form-check-label">Receive weather alerts </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3"
                            value="0" onChange={(e) => setAlerts(e.target.value)} />
                            <label class="form-check-label" value="0" for="inlineRadio2">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio4" 
                            value="1" onChange={(e) => setAlerts(e.target.value)} />
                            <label class="form-check-label" value="1" for="inlineRadio3">No</label>
                        </div>


                </div>
                <div class="input-box">
                    <button type="submit" class="btn btn-primary">Sign up</button>
                </div>

            </form>
        
        </div>
        
      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
