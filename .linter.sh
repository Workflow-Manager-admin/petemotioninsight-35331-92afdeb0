#!/bin/bash
cd /home/kavia/workspace/code-generation/petemotioninsight-35331-92afdeb0/petemotioninsight
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

