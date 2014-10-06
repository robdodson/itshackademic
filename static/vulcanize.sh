#!/bin/bash

vulcanize index.imports.html -o index.vulcanized.html --inline --strip
vulcanize imports.html -o vulcanized.html --inline --strip
