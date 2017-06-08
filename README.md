Flickr Stats
==============

At this date Flickr does not show some statistics like total views or popular pictures on users' galleries. Flickr Stats is a simple web application that allows you to get nice statistics on a Flickr gallery. It does not require any inscription or identifier.

## What you can get

* User's total views
* How many favorites a user has got
* How many comments a user has got
* Popular pictures sorted by views

## Installation

1. Make sure you have docker and docker-compose installed
2. Clone this repository
3. Request a Flickr API Key here : https://www.flickr.com/services/apps/create/apply/
4. Copy the docker-compose.yml.dist file and set your Flickr API Key to the FLICKR_API_KEY parameter
```sh
# Clone the project
git clone git@github.com:andrewdsilva/FlickrStats.git
cd FlickrStats/
# Copy the docker-compose dist file
cp docker-compose.yml.dist docker-compose.yml
# Edit it with your favorite editor
nano docker-compose.yml
```
5. Build and start the dockers images
```sh
docker-compose build
docker-compose up -d
```
6. Enjoy http://localhost