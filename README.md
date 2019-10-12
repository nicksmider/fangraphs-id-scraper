# Fangrphs ID Scrapper

## Install dependecies

`npm install`

## Usage

First command line arguemnt is where to begin, the second is where to stop.

`node index.js 1 25000`

It is possible that Fangraphs ReCaptcha's the script if you give it a large input size.

You will see soemthing along the lines of: 

```
RECAPTCHA detected at id: 1
Have you solved it? (Y/n):
```

Navigate to your browser and go to Fangraphs.com and go to a player page, manually click the captcha, come back to the program and type `Y` to continue. Depending on how much it cares, you might need to wait a while before continueing. You can restart the program with new paramaters picking up where you left off.

