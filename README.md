# slackgroups

# Requirements
  - Docker [instructions here](https://docs.docker.com/engine/installation/)
  - Docker Compose [instructions here](https://docs.docker.com/compose/install/)

# Instructions
To get the rails server and postgres database up and running execute:

```bash
docker-compose up -d
```

If you're running the Docker engine nativly in your environment visit the following url **http://localhost:3000**. 

If you're a Mac OSx or Windows user that requires a VM to execute the Docker engine, switch **localhost** for the VM IP address: **http://{VM_HOST_IP_ADDRESS}:3000**.

> If you're using docker-machine to setup a VM for the Docker engine, execute the following command to get the host IP address: ***docker-machine ip MACHINE_NAME*** (usually default)