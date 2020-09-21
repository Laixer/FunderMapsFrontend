#!/bin/bash

for f in ./vendors/* ; do
    if [ -d "$f" ]; then
        NAME=$(basename $f)
        npm run build -- --vendor=$NAME &
        pids[$NAME]=$!
    fi
done

# wait for all pids
for pid in ${pids[*]}; do
    wait $pid
done

