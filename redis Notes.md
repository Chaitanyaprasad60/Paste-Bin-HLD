1. How to install redis 
 - Install WSL first on windows
 - Run these Commands on WSL To install Redis. 
      curl -fsSL https://packages.redis.io/gpg | sudo gpg --dearmor -o /usr/share/keyrings/redis-archive-keyring.gpg
      echo "deb [signed-by=/usr/share/keyrings/redis-archive-keyring.gpg] https://packages.redis.io/deb $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/redis.list
      sudo apt-get update
      sudo apt-get install redis

2. How to Start a Redis Server
 - sudo service redis-server start - Use this command to start a Redis Server. 
 - BY default it will start on 6380 port but you can change this port with --port Flag

3. How to access the Redis through CLI ?
 - redis-cli 
 - This command will open a REPL enviornemt in which you can run your commands. 

4. How to access Redis Programmatically ?
 - { url: 'redis://localhost:6379' }
 - Use the above URL String to Connect to Redis server. 

5. How to load a module on redis
 - First download the module by logging into the redis accounyt (here Redis Bloom)
 - Copy that into WSL HOW ? 
    - First Open Wsl in that directory and then use (cp redibloom.so /var)
  - Then start a redis-cli session 
  - MODULE LOAD /var/redisbloom.so (The Path to that file)

6. Bloom Filter(BF) from Redis CLI 
  1. Create a new Bloom Filter - BF.RESERVE <bf-name> <error-rate> <records-size> - BF.RESERVE pasteIds 0.001 1000
  2. To add a entry - BF.ADD <bf-name> <record> -  BF.ADD pasteIds "akhl"
  3. Check if a enrty exists - BF.EXISTS <bf-name> <record> -   BF.EXISTS pasteIds "akj" - Retirns 1 or 0. 


7. Commands for Node.js 
 - redisClient.bf.reverse(<filter-name>,<error-rate>,<records-size>)
 - redisClient.bf.exists(<filter-name>,<record>)
 - redisClient.bf.add(<filter-name>,<record>)


8. Some Common Errors and Solutions
 - Could not connect to Redis at 127.0.0.1:6379: Connection refused - redis-server --daemonize yes