./src/tools/integration.sh | ansi2txt | grep -E "(Success)|(Failure)" | sed -E 's/(.*)((Success)|(Failure))/\2/' || echo ERROR
