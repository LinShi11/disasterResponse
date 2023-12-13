Title: Integrated Weather Alert and Disaster Response Platform

Participants: Lin Shi, Mahidhara Reddy Kankara

Project Goals: Develop a comprehensive platform that delivers real-time weather updates and disaster alerts to users. Enable users to register with local authorities to receive personalized assistance and support during disaster events.

Components:
Frontend: React
Backend: Python (Flask)
Database: MongoDB
Message Queue: RabbitMQ
API: REST
Containers: Docker with Kubernetes orchestration
Cloud Server: Google Cloud Platform
Artifact Registry: Google Cloud

Architectural Diagram:


Description of interaction:

There are two types of users in our application: normal users and authorities.

Frontend
Normal User
Interacts with the frontend to provide and update personal information, contact details, and notification preferences.
Receives customized weather alerts based on their location.
Receive authority check-ins during disasters.
Authorities
Interacts with the frontend to manage location information.
Periodically checks weather statistics.
Sends notifications to normal users based on their preferences.

Backend
Manages REST APIs for both Normal Users and Authorities.
Handles user data storage and retrieval.
Coordinates data exchange with the database.

Database
Stores user-profiles and their associated data.
Facilitates data retrieval and updates based on API requests from the backend.

Message Queue
Facilitates communication between the backend and users for weather alerts.
Handles the delivery of check-in messages from authorities to normal users based on their preferences.

REST API
Provides endpoints for normal users to store and update personal information, contact information, and notification preferences.
Offers endpoints for authorities to store location information, as well as for periodic weather stats check-ins.
Facilitates communication between the frontend and backend.

Google Cloud Platform
Hosts and manages the application and its components, ensuring scalability and availability.

Training and testing mechanism:

Communication between frontend, backend, and database
Debug API calls to the database, verifying that data is stored, retrieved, and updated accurately.
Ensure data consistency and integrity, addressing issues related to concurrent updates and transactions.
Address potential issues with message orders, ensuring that alerts and check-ins are delivered in a timely and accurate manner.
Implement logging and error handling to provide informative error messages for developers and users.

4 cloud technologies:
Message marshaling/encoding
The platform uses message marshaling and encoding techniques to format and transmit the user’s personal information to be stored in the database. This ensures efficient data transmission, meeting the requirement for encoding and sending critical information.
RPC / API interfaces
It implements REST API interfaces to facilitate communication and data exchange between the platform and external sources, such as meteorological data providers. These interfaces enable seamless data sharing.
Message Queues
Message queues are utilized to manage the distribution of alerts and coordination messages within the platform. This ensures efficient and reliable routing of messages to their intended recipients, including response teams and affected communities.
Database
The platform deploys databases to store and manage critical data, such as user profiles and incident logs. Databases are essential for archiving and retrieving information during and after disaster events.
Key-value stores
Key-value stores are used for rapidly retrievable, lightweight data storage. This is used to store the user information.
Containers
It utilizes containers to ensure scalability and high availability during peak usage periods, especially during disasters. This enables the platform to handle increased traffic and data processing demands, addressing the requirement for scalability and high availability.
