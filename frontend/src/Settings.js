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
            fetch('http://localhost:5000/getUserInfo', {
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
    
        fetch('http://localhost:5000/updateUserInfo', {
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
                    {/* <label class="align-left"><b>Name</b></label> */}
                        <input type="text" data-toggle="tooltip" data-placement="top" title="First Name" readonly class="form-control m-bot" id="Fname" placeholder="First Name"
                        value={name.first} />
                        <input type="text" data-toggle="tooltip" data-placement="top" title="Last Name" readonly class="form-control m-bot" id="Lname" placeholder="Last Name"
                        value={name.last} />
                    </div>
                    <div class="input-box">
                    {/* <label class="align-left"><b>Username</b></label> */}
                        <input type="text" data-toggle="tooltip" data-placement="top" title="Username" readonly class="form-control m-bot" id="Username" placeholder="Username"
                        value={username} />
                        {/* <label class="align-left"><b>Password</b></label> */}
                        <input type="password" data-toggle="tooltip" data-placement="top" title="Password" required class="form-control m-bot" id="inputPassword4" placeholder="Password"
                        value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div class="input-group">
                    {/* <label class="align-left"><b>Address: Door & Street</b></label> */}
                        <input type="text" data-toggle="tooltip" data-placement="top" title="Door Number" required class="form-control" id="inputAddress" placeholder="Door number"
                        value={address.door} onChange={(e) => setAddress({ ...address, door: e.target.value })} />
                        <input type="text" data-toggle="tooltip" data-placement="top" title="Street Name" required class="form-control" id="inputAddress" placeholder="Street Name"
                        value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
                    </div>
                    <div class="input-group margin-top">
                    {/* <label class="align-left"><b>Address: Apt & City</b></label> */}
                        <input type="text" data-toggle="tooltip" data-placement="top" title="Apt / Unit" class="form-control" id="inputAddress" placeholder="Apt/unit"
                        value={address.apt} onChange={(e) => setAddress({ ...address, apt: e.target.value })} />
                        <input type="text" data-toggle="tooltip" data-placement="top" title="City" required class="form-control" id="inputCity" placeholder="City"
                        value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    </div>
                    <div class="input-box input-group margin-top">
                    {/* <label class="align-left"><b>State, zip</b></label> */}
                        <input type="text" data-toggle="tooltip" data-placement="top" title="State" required class="form-control" id="inputAddress" placeholder="State"
                        value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
                        <input type="text" required data-toggle="tooltip" data-placement="top" title="Zip" class="form-control" id="inputZip" placeholder="Zip"
                        value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
                    </div>
                    <div class="input-box">
                    {/* <label class="align-left"><b>Phone</b></label> */}
                        <input type="number" required data-toggle="tooltip" data-placement="top" title="Phone number" class="form-control m-bot" id="phone" placeholder="Phone Number"
                        value={phone} onChange={(e) => setPhone(e.target.value)} />
                        {/* <label class="align-left"><b>Email</b></label> */}
                        <input type="email" required data-toggle="tooltip" data-placement="top" title="Email address" class="form-control m-bot" id="email" placeholder="Email Address"
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