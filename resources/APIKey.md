set up: set NODE_OPTIONS=--openssl-legacy-provider

#### c
https://www.weatherapi.com/

Usage: http://api.weatherapi.com/v1/current.json?key={api_key_src1}&q={city}

#### d
https://www.weather.gov/

No API key required

Usage: https://api.weather.gov/points/{latitude},{longitude}

commands used: 

ps -ef | grep port-forward
kill -9 <port nums>


kubectl delete deployment backend-deployment
kubectl apply -f backend/backend-deployment.yaml 

// kill pod

kubectl port-forward deployments/backend-deployment 5000:5000 &


kubectl get pods
kubectl logs -f backend-deployment-59f844c566-58hqs