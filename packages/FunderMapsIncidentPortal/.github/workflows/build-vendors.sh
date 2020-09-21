#!/bin/bash
function build() {
    npm run build -- --vendor=$1
    git describe --long --always > $1-dist/VERSION
    git rev-parse HEAD > $1-dist/COMMIT
    tar -czvf $1-dist.tar.gz -C $1-dist .
    echo $SSH_KEY > id_rsa
    scp -i id_rsa $1-dist.tar.gz $SSH_USER@$SSH_HOST:/var/cache/deployment/tmp
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

