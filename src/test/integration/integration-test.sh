RED='\033[0;31m'
GREEN='\033[0;32m'
PLAIN='\033[0m'

curl http://localhost:8080/ &> /dev/null && 
curl -X POST http://localhost:8080/api/rpc/v1/train &> /dev/null &&
echo -e "${GREEN}integration tests Success${PLAIN}" ||
echo -e "${RED}integration tests Failure${PLAIN}"
