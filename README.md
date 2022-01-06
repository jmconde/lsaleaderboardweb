# lsaleaderboardweb

### URL
[http://lsa.gairacalabs.com/](http://lsa.gairacalabs.com/)

### Deployment

```
docker images --all
docker image pull arhuako/lsadashboardweb
docker-compose stop
docker-compose up --build -d
docker-compose logs --follow
```