#!/bin/bash

set -e
echo '---Deploy begin---'
export SERVER_REAL_BUILD_ROOT="$SERVER_REAL_ROOT/$BUILD_TAG"

echo 'Remove temp app'
rm -rf app
echo 'Make app folder'
mkdir -p app
echo 'Extract files'
7za x -oapp -aoa app.7z
echo "Make target app folder $SERVER_REAL_ROOT"
mkdir -p $SERVER_REAL_ROOT
echo "Move files to $SERVER_REAL_BUILD_ROOT"
mv app $SERVER_REAL_BUILD_ROOT
echo "Change backend api: $SERVER_API"
sed -i "s#window._CONFIG\['domianURL'\] = '/jeecg-boot'#window._CONFIG['domianURL'] = '$SERVER_API'#g" index.html
echo "Make version file to $SERVER_REAL_BUILD_ROOT/.version"
echo $BUILD_TAG > $SERVER_REAL_BUILD_ROOT/.version
echo "chown -R $SERVER_USER:$SERVER_GROUP $SERVER_REAL_BUILD_ROOT"
chown -R $SERVER_USER:$SERVER_GROUP $SERVER_REAL_BUILD_ROOT
if [ -e $SERVER_ROOT/.version ]; then
    prevVersion=`cat $SERVER_ROOT/.version`
else
    prevVersion='prev-version'
fi
echo "Move $SERVER_ROOT to $SERVER_REAL_ROOT/$prevVersion"
mv $SERVER_ROOT $SERVER_REAL_ROOT/$prevVersion
echo "Move $SERVER_REAL_BUILD_ROOT to $SERVER_ROOT"
mv $SERVER_REAL_BUILD_ROOT $SERVER_ROOT
echo "Change dir to $SERVER_ROOT"
cd $SERVER_ROOT
echo "chown -R $SERVER_USER:$SERVER_GROUP $SERVER_ROOT"
chown -R $SERVER_USER:$SERVER_GROUP $SERVER_ROOT

echo '---Deploy end---'
