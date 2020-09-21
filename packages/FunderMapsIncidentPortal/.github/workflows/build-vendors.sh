#!/bin/bash

function build() {
    npm run build -- --vendor=$1
    git describe --long --always > $1-dist/VERSION
    git rev-parse HEAD > $1-dist/COMMIT
    tar -czf $1-dist.tar.gz -C $1-dist .
}

for f in ./vendors/* ; do
    if [ -d "$f" ]; then
        NAME=$(basename $f)
        build $NAME &
        pids[$NAME]=$!
    fi
done

# wait for all pids
for pid in ${pids[*]}; do
    wait $pid
done

