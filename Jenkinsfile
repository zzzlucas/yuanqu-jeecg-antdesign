pipeline {
    agent any
    environment {
        // Application
        APP_NAME = '园区管理系统-后台'
        APP_CODE = 'industrial-parks-admin-frontend'

        // Test env
        ENV_TEST_SSH_CONFIG = 'test-01'
        ENV_TEST_SERVER_ROOT = "/www/wwwroot/yq.demozj.com/admin"
        ENV_TEST_SERVER_REAL_ROOT = "/app/test.$APP_CODE"
        ENV_TEST_SERVER_TMP_ROOT = "/tmp/ci-build/test.$APP_CODE"
        ENV_TEST_SERVER_USER = "www"
        ENV_TEST_SERVER_GROUP = "www"
        ENV_TEST_SERVER_API = "http://yq.demozj.com:8080/jeecg-boot"

        // Production env
        // There's no such production env yet.
        //ENV_PROD_SSH_CONFIG = 'prod-01'
        //ENV_PROD_SERVER_ROOT = "/www/wwwroot/$APP_CODE"
        //ENV_PROD_SERVER_REAL_ROOT = "/app/$APP_CODE"
        //ENV_PROD_SERVER_TMP_ROOT = "/tmp/ci-build/$APP_CODE"
        //ENV_PROD_SERVER_USER = "www"
        //ENV_PROD_SERVER_GROUP = "www"
        //ENV_PROD_SERVER_API = "/jeecg-boot"
    }
    parameters {
      booleanParam defaultValue: true, description: 'Use npm to install dependency?', name: 'USE_DEPENDENCY_MANAGER_INSTALL'
    }
    stages {
        stage('Build') {
            steps {
                // Currently only support build under windows, if somebody want build under linux/osx please call FF.
                bat 'build.bat'
                archiveArtifacts 'app.7z'
            }
        }
        stage('Test-Deploy') {
            steps {
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                            configName: env.ENV_TEST_SSH_CONFIG,
                            transfers: [
                                sshTransfer(
                                    cleanRemote: false,
                                    excludes: '',
                                    execCommand: "",
                                    execTimeout: 120000,
                                    flatten: false,
                                    makeEmptyDirs: false,
                                    noDefaultExcludes: false,
                                    patternSeparator: '[, ]+',
                                    remoteDirectory: env.ENV_TEST_SERVER_TMP_ROOT,
                                    remoteDirectorySDF: false,
                                    removePrefix: '',
                                    sourceFiles: 'app.7z'
                                )
                            ],
                            usePromotionTimestamp: false,
                            useWorkspaceInPromotion: false,
                            verbose: false
                        )
                    ]
                )
                sshPublisher(
                    publishers: [
                        sshPublisherDesc(
                        configName: env.ENV_TEST_SSH_CONFIG,
                        transfers: [
                            sshTransfer(
                                cleanRemote: false,
                                excludes: '',
                                execCommand: "cd $ENV_TEST_SERVER_TMP_ROOT && export BUILD_TAG=$BUILD_TAG && export SERVER_ROOT=$ENV_TEST_SERVER_ROOT && export SERVER_REAL_ROOT=$ENV_TEST_SERVER_REAL_ROOT && export SERVER_USER=$ENV_TEST_SERVER_USER && export SERVER_GROUP=$ENV_TEST_SERVER_GROUP && export SERVER_TMP_ROOT=$ENV_TEST_SERVER_TMP_ROOT && export SERVER_API=$ENV_TEST_SERVER_API && chmod +x deploy.sh && ./deploy.sh",
                                execTimeout: 120000,
                                flatten: false,
                                makeEmptyDirs: false,
                                noDefaultExcludes: false,
                                patternSeparator: '[, ]+',
                                remoteDirectory: env.ENV_TEST_SERVER_TMP_ROOT,
                                remoteDirectorySDF: false,
                                removePrefix: '',
                                sourceFiles: 'deploy.sh'
                            )
                        ],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: false)
                    ]
                )
            }
        }
    }
}
