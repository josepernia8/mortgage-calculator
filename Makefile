.DEFAULT_GOAL := help

install:
	cd api && npm i
	cd ui && npm i

init:
	@make --no-print-directory install
	docker-compose up -d

kill:
	docker-compose down

restart:
	docker-compose restart

logs-api:
	docker-compose logs -f api

logs-ui:
	docker-compose logs -f ui

build-api:
	cd api && npm run build

build-ui:
	cd ui && npm run build

test-api:
	cd api && npm test

test-ui:
	cd ui && npm test

#############################################################
# "Help Documentation"
#############################################################

help:
	@echo "  Project Commands"
	@echo "  |"
	@echo "  |_ help (default)              - Show this message"
	@echo "  |"
	@echo "  |_ Manage Environment:"
	@echo "  |  install                     - Install dependencies"
	@echo "  |  init                        - Spin up docker environment"
	@echo "  |  kill                        - Stop/remove container and network associated with it"
	@echo "  |  restart                     - Restart container"
	@echo "  |  logs-api                    - Show Express API logs"
	@echo "  |  logs-ui                     - Show React Vite logs"
	@echo "  |  build-api                   - Build the API for production"
	@echo "  |  build-ui                    - Build vite react app for production"
	@echo "  |  test-api                    - Run npm test for the API"
	@echo "  |  test-ui                     - Run npm test for the UI"
	@echo "  |_________________________________________________________________________________________________________"
	@echo " "


.PHONY:
	install
	init
	kill
	restart
	logs-api
	logs-ui
	build-api
	build-ui
	test-api
	test-ui
