Trailer Park
=========

## Installation

You will need

 * [Node.js](http://nodejs.org/)
 * [Bower](http://bower.io/)

Then install the project dependencies with
```
npm install
```

and
```
bower install
```

## Usage

To run locally, use
```
grunt local
```

To run remotely, you'll need to add AWS Keys. Use [`aws-keys.example.json`](aws-keys.example.json) to create an `aws-keys.json` file and replace the default values with your key values from the `gu-aws-interactive` AWS Account. From then on use
```
grunt remote
```
