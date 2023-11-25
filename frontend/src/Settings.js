import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Settings() {
    const [loading, setLoading] = useState(true);
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

  
    useEffect(() => {
        const user = sessionStorage.getItem('username');
        const uname = {"username": user};
        if (!user) {
          navigate('/login'); // Redirect to login if no user is found
        }
        else
        {
            fetch('/getUserInfo', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(uname),
              })
                .then((response) => response.json())
                .then((json) => {
                    // setName({ ...name, first: json.name.first });
                    // setName({ ...name, last: json.name.last });
                    setName({ first: json.name.first, last: json.name.last });
                    setUsername(json.username);
                    //setPassword(json.password);
                    // setAddress({ ...address, door: json.address.door });
                    // setAddress({ ...address, street: json.address.street });
                    // setAddress({ ...address, apt: json.address.apt });
                    // setAddress({ ...address, city: json.address.city });
                    // setAddress({ ...address, state: json.address.state });
                    // setAddress({ ...address, zip: json.address.zip });
                    setAddress({
                        door: json.address.door,
                        street: json.address.street,
                        apt: json.address.apt,
                        city: json.address.city,
                        state: json.address.state,
                        zip: json.address.zip,
                    });
                    setPhone(json.phone);
                    setEmail(json.email);
                    setContact(json.preference.contact);
                    setAlerts(json.preference.alerts);

                    setLoading(false);
                    console.log(json);
                      
                  })
                .catch((error) => {
                    console.log("Fuckkkkkk");
                    console.error('Error updating info', error);
                    setLoading(false);
                });
        }
    }, [navigate])    

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
    
        fetch('/updateUserInfo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then((response) => response.json())
          .then((json) => {
                setMessage(json.message);
                if (json.message === "Update successful")
                {
                    navigate('/home');
                }
            })
          .catch((error) => console.error('Error updating info', error));
    };

    const handleContactChange = (e) => {
    setContact(e.target.value);
    };
    
    const handleAlertsChange = (e) => {
    setAlerts(e.target.value);
    };

    if (loading)
    {
        return <div>Loading...</div>;
    }

    

    return (
        <div>
            <div className="centered-container-signup">
                <form onSubmit={handleSubmit}>
                    <div class="input-group">
                        <input type="text" readonly class="form-control m-bot" id="Fname" placeholder="First Name"
                        value={name.first} />
                        <input type="text" readonly class="form-control m-bot" id="Lname" placeholder="Last Name"
                        value={name.last} />
                    </div>
                    <div class="input-box">
                        <input type="text" readonly class="form-control m-bot" id="Username" placeholder="Username"
                        value={username} />
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
                        <input type="number" required class="form-control m-bot" id="phone" placeholder="Phone Number"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input type="email" required class="form-control m-bot" id="email" placeholder="Email Address"
                        value={email} onChange={(e) => setEmail(e.target.value)} />

                        <label class="form-check-label">Consent for authorities to contact you </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions0" id="inlineRadio1" value="0" 
                            checked={contact === '0'} onChange={handleContactChange} />
                            <label class="form-check-label" for="inlineRadio0">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions1" id="inlineRadio2" value="1" 
                            checked={contact === '1'} onChange={handleContactChange} />
                            <label class="form-check-label" for="inlineRadio1">No</label>
                        </div>

                        <label class="form-check-label">Receive weather alerts </label>
                        <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions2" id="inlineRadio3" value="0" 
                            checked={alerts === '0'} onChange={handleAlertsChange} />
                            <label class="form-check-label" for="inlineRadio2">Yes</label>
                            </div>
                            <div class="form-check form-check-inline">
                            <input class="form-check-input" type="radio" name="inlineRadioOptions3" id="inlineRadio4" value="1" 
                            checked={alerts === '1'} onChange={handleAlertsChange} />
                            <label class="form-check-label" for="inlineRadio3">No</label>
                        </div>


                    </div>
                    <div class="input-box">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>

                </form>
            
            </div>
            
            <br/>
            <a href="/login" class="btn btn-primary">Logout</a>
        </div>

    );

}

export default Settings;