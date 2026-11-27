pipeline {
    agent any

    tools {
        nodejs 'NodeJS-24'
    }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timeout(time: 20, unit: 'MINUTES')
        timestamps()
    }

    environment {
        PORT = '3000'
        API_BASE_URL = 'http://localhost:3000'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                bat 'node --version'
                bat 'npm --version'
                bat 'git --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run API Tests') {
            steps {
                powershell '''
                    $ErrorActionPreference = 'Stop'

                    New-Item -ItemType Directory -Force -Path logs | Out-Null

                    $server = Start-Process `
                        -FilePath "node.exe" `
                        -ArgumentList "mock-server/src/server.js" `
                        -RedirectStandardOutput "logs/mock-server.log" `
                        -RedirectStandardError "logs/mock-server-error.log" `
                        -PassThru `
                        -NoNewWindow

                    try {
                        $healthy = $false

                        for ($i = 0; $i -lt 30; $i++) {
                            if ($server.HasExited) {
                                throw "Mock API process exited"
                            }

                            try {
                                $response = Invoke-WebRequest `
                                    -Uri "$env:API_BASE_URL/health" `
                                    -UseBasicParsing `
                                    -TimeoutSec 2

                                if ($response.StatusCode -eq 200) {
                                    $healthy = $true
                                    break
                                }
                            } catch {
                                Start-Sleep -Seconds 2
                            }
                        }

                        if (-not $healthy) {
                            throw "Mock API failed to start"
                        }

                        npm.cmd run cy:run

                        if ($LASTEXITCODE -ne 0) {
                            throw "Cypress tests failed"
                        }
                    }
                    finally {
                        if (-not $server.HasExited) {
                            Stop-Process -Id $server.Id -Force
                        }
                    }
                '''
            }
        }
    }

    post {
        always {
            archiveArtifacts(
                artifacts: 'cypress/reports/**,logs/**,cypress/screenshots/**',
                allowEmptyArchive: true
            )
        }

        success {
            echo 'API tests passed successfully'
        }

        failure {
            echo 'API tests failed'
        }
    }
}