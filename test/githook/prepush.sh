BRANCH=`git rev-parse --abbrev-ref HEAD`

if [[ "$BRANCH" == "master" || "$BRANCH" == "dev" ]]; then
    npm run lint && npm test
    exit $?
fi

exit 0
