properties([pipelineTriggers([githubPush()])])
void setBuildStatus(String message, String state) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: "https://github.com/SophiaHadash/argueview-js"],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}
def buildBadge = addEmbeddableBadgeConfiguration(id: "build", subject: "argueview-js build");

pipeline {
  agent {
    docker {
      image 'node:14-alpine'
    }
  }
  options {
	skipStagesAfterUnstable()
	buildDiscarder(logRotator(numToKeepStr: '10', artifactNumToKeepStr: '10'))
  }
  stages {
    stage('test build context') {
      steps {
		sh 'node --version && npm --version'
      }
    }
    stage('dependencies') {
	  steps {
		setBuildStatus("Building...", "PENDING");
		script{ buildBadge.setStatus('running'); }
		sh 'npm i --also=dev'
	  }
	}
    stage('build') {
      steps {
        sh 'npm run build'
      }
    }
    stage('test') {
	  steps {
		sh 'npm test'
	  }
	}
	stage('publish') {
	  when {
        branch 'master'
      }
	  steps {
	    script {
	      try {
	        sh 'printf "//registry.npmjs.org/:_authToken=${NPM_TOKEN}" > ~/.npmrc'
		    sh 'npm publish --access public'
	      } catch(err) {
	        echo err.getMessage()
	      }
	    }
	  }
	}
  }
  post {
    always{
      junit 'coverage/junit.xml'
    }
    success {
      cobertura coberturaReportFile: 'coverage/cobertura-coverage.xml', enableNewApi: true
	  setBuildStatus("Build succeeded", "SUCCESS");
	  script{ buildBadge.setStatus('passing'); }
    }
    failure {
      setBuildStatus("Build failed", "FAILURE");
  	  script{ buildBadge.setStatus('failing'); }
    }
  }
}
