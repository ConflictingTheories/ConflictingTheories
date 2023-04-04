# Instructions

Install Docker and then run docker compose.


### Seeding
The following will then need to be run (assuming the backend server container name in docker is medusa-server-default):

    docker exec medusa-server-default medusa seed -f ./data/seed.json