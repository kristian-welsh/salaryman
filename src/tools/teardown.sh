set +m # disable job control printing
kill $(pgrep npm) &>/dev/null # kill npm
kill $(pgrep node) &>/dev/null # kill node
sleep 1
set -m # job control printing is global, re-enable it
