#!/bin/sed 2,2!d;s/^#.// # this will echo lines 2 to 2, instead of running file
# This script should be sourced, not run.

# source dependancies
echo "checking/installing dependancies, silent"
. ./src/tools/install-deps.sh &>/dev/null
echo "done"

# define functions
echo "defining local functions to run dev tools"
quietIntegrationTest() {
    ./src/tools/quiet-test.sh
}
testIntegration() {
    ./src/tools/test-start.sh
}

# edit files at non-directory paths in various folders
vimall() {
    vim $(find ./src/ | grep "\..*\.")
}
vimpublic() {
    vim $(find ./src/public/ | grep "\..*\.")
}
vimserver() {
    vim $(find ./src/server/ | grep "\..*\.")
}
vimtools() {
    vim $(find ./src/tools/ | grep "\..*\.")
}
vimtest() {
    vim $(find ./src/test/ | grep "\..*\.")
}
echo "done"

# define aliases
echo defining aliases
echo defining aliases qt and quiettest
alias quiettest="quietIntegrationTest"
alias qt="quietIntegrationTest"
echo defining aliases it and test
alias test="testIntegration"
alias it="testIntegration"
echo done

