all: 
	rm -rf dist/* 
	docker compose up --build -d

clean:
	docker system prune -af

re: clean all
	
