all: 
	rm -rf dist/* 
	docker compose up --build

down:
	docker compose down

clean:
	docker system prune -af

re: clean all
	
