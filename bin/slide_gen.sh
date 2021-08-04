#!/bin/bash

printf "ファイル名 >> "; read file_name;
cp ./bin/templates/slide.md "slides/$file_name.md";
