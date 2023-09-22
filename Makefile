all: 
	docker compose up --build 

down:
	docker compose down

clean:
	docker system prune -af
	docker volume prune -af

re: clean all
	
