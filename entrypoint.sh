#!/bin/bash

# Start the flask app
python3 weather_api_calls.py &


# Start the consumers
python3 user_signup_queue.py &
python3 user_updation_queue.py &
python3 disaster_sendalerts_dbupdates_queue.py &
python3 disaster_updation_queue.py &

# Keep the script running to keep the container alive
tail -f /dev/null