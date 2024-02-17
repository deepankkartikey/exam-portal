### Deploying the backend-server on AWS

- Create a mysql container using docker image of mysql. 
  - The following command starts a mysql instance at localhost port 3307 in detached mode

    `docker run -d -p 3307:3306 --name mysqldb -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=exam mysql`

- Connect the above mysql container to SpringBoot Application

- Provide the following Environment Variables while running the spring boot application inside `Edit Configurations > Environment Variables` option:
  - `MYSQL_HOST`
  - `MYSQL_PORT`
  - `MYSQL_USER`
  - `MYSQL_PASSWORD`

