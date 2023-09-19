all: 
	rm -rf dist/* 
	docker compose up --build

clean:
	docker system prune -af

re: clean all
	
