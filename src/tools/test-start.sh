{
	# run server in backround
	echo integration tests Setting up
    ./src/tools/setup.sh
	sleep 2
	# run integration tests
	echo integration tests Starting
	./src/tools/integration.sh
}
echo integration tests Tearing down 
./src/tools/teardown.sh
echo integration tests Complete

