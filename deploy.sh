#!/bin/bash
npm install
bower install
grunt
scp -r -F ~/.ssh/config build/ chimera.studentmediene.local:/srv/www/radiostreamplayer/
