#!/bin/bash

cd svtraders
git pull origin main
npm install
pm2 restart app || pm2 start app.js
