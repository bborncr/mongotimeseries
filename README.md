# MongoDB Time Series Experiments
## Overview
* Learn how to read/write time series data efficiently to a mongodb from node.js
* Display time series data in a dynamic graph

This [mongodb blog](https://www.mongodb.com/blog/post/schema-design-for-time-series-data-in-mongodb) is the basis for this experiment.

## Schema
The recommendation is to use `db.collection.insert` to create a document that contains an entire hour of data and then fill in the minutes and seconds with `db.collection.update`.
``` javascript
{
  timestamp_hour: ISODate("2013-10-10T23:00:00.000Z"),
  type: “memory_used”,
  values: {
    0: { 0: 999999, 1: 999999, …, 59: 1000000 },
    1: { 0: 2000000, 1: 2000000, …, 59: 1000000 },
    …,
    58: { 0: 1600000, 1: 1200000, …, 59: 1100000 },
    59: { 0: 1300000, 1: 1400000, …, 59: 1500000 }
  }
}
```
``` javascript
db.metrics.update(
  {
    timestamp_hour: ISODate("2013-10-10T23:00:00.000Z"),
    type: “memory_used”
  },
  {$set: {“values.59.59”: 2000000 } }
)
```
## Installed Node.js modules
* express
* express-handlebars
* mongodb
* mongoose
## MongoDB Atlas
The db is setup on MondoDB's Atlas hosting service.
## TODO
* [x] ~~Connect to MongoDB~~
* [x] ~~Insert/update~~
* [x] ~~Generate and insert document with 1 hour of data (initial data as NaN?)~~
* [ ] Update the data at 1 second intervals (generate sine wave as fake data?)
* [ ] Read data
* [ ] Use Google Annotation Charts
* [ ] Display the mongodb data in the graph
