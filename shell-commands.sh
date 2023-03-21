#!/bin/sed 2,2!d;s/^#.// # this will echo lines 2 to 2, instead of running file
# This script should be sourced, not run.

. ./src/tools/*-command.sh
