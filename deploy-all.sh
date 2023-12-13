kubectl apply -f rabbitMQ/rabbitmq-deployment.yaml
kubectl apply -f rabbitMQ/rabbitmq-service.yaml
sleep 60

kubectl apply -f frontend/frontend-deployment.yaml
kubectl apply -f frontend/frontend-service.yaml
kubectl apply -f frontend/frontend-ingress.yaml
sleep 30

kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml

sleep 10
kubectl port-forward deployments/backend-deployment 5000:5000 &
kubectl port-forward deployments/frontend-deployment 3000:3000 &
kubectl port-forward deployments/rabbitmq-deployment 5672:5672 &