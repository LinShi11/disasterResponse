kubectl apply -f rabbitMQ/rabbitmq-deployment.yaml
kubectl apply -f rabbitMQ/rabbitmq-service.yaml

kubectl apply -f frontend/frontend-deployment.yaml
kubectl apply -f frontend/frontend-service.yaml
kubectl apply -f frontend/frontend-ingress.yaml

kubectl apply -f backend/backend-deployment.yaml
kubectl apply -f backend/backend-service.yaml

kubectl port-forward backend-deployment 5000:5000 &
kubectl port-forward frontend-deployment 3000:3000 &
kubectl port-forward rabbitmq-deployment 5672:5672 &