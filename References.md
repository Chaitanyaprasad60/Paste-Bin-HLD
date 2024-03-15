# How to define a Bloom Filer in Redis
Redis Official Site - https://redis.io/docs/data-types/probabilistic/bloom-filter/
Syntax - BF.RESERVE {key} {error_rate} {capacity} [EXPANSION expansion] [NONSCALING]
Example -  BF.RESERVE bikes:models 0.001 1000000
Project Setup - BF.RESERVE pasteIds 0.001 1000

# Bloom Filter in Node.js
https://www.npmjs.com/package/bloom-filters#export-and-import 