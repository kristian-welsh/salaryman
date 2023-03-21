#!/bin/sed 2,2!d;s/^#.// # this will echo lines 2 to 2, instead of running file
# This script should be sourced, not run.

testIntegration() {
	{
		# run server in backround
		echo integration tests Setting up
		npm test &>/dev/null&
		sleep 2
		# run integration tests
		echo integration tests Starting
		$(find ./src/test/integration | grep ".sh")
	} 2>/dev/null
	# teardown
	echo integration tests Tearing down 
	set +m # disable job control printing
	kill $(pgrep npm) &>/dev/null # kill npm
	kill $(pgrep node) &>/dev/null # kill node
	sleep 1
	set -m # it is global, re-enable it
	# finished
	echo integration tests Complete
}
alias test="testIntegration"
alias integration="testIntegration"
alias it="testIntegration"
alias itest="testIntegration"
