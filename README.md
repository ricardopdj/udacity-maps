# Udacity Neighborhood Map Project

## Getting Started

Clone this repository in your computer:

```
$ git clone https://github.com/ricardopdj/udacity-maps.git
```

Or [download](https://github.com/ricardopdj/udacity-maps/archive/master.zip) it as a ZIP file.

### Prerequisites

The only dependency is [Node and NPM](https://nodejs.org/en/download/) (comes together with Node).

### Installing

Open a terminal at the project root and run `npm install` to install all dependencies.

### NPM scripts

- `npm run start`: runs the app in development mode
- `npm run build`: builds the app for production to the build folder

## Running the project

### Development
Open a terminal at the app's root folder and run `npm start`

## Run Offline
1. Remove ["homepage": "http://ricardopdj.github.io/udacity-maps"] from the package.json file
1. Run `npm run build`
2. Run `serve -s build`. If serve isn't installed enter `npm install -g serve` and repeat step 2.
3. Navigate to localhost:5000 as listed on your terminal.

### Demo

[https://ricardopdj.github.io/udacity-maps/](https://ricardopdj.github.io/udacity-maps/)

## Built With

* [React](https://reactjs.org/)
* [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/tutorial)
* [Foursquare API](https://developer.foursquare.com/)