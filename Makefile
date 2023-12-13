run:
	sh deploy-all.sh

clean:
	kubectl delete deployment frontend-deployment
	kubectl delete deployment backend-deployment
	kubectl delete deployment rabbitmq-deployment

	kubectl delete service backend-service
	kubectl delete service frontend-service
	kubectl delete service rabbitmq-service

	kubectl delete ingress frontend-ingress