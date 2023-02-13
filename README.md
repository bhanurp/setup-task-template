# setup-yarn JFrog Pipelines Task

Pipelines task for installing yarn package manager.

## PreRequisites

For installing yarn node js is required. Make sure node js is installed. Use
`setup-node` task for easy installation.

## Usage

Mention a specific version as below under input section

```yaml
- task: jfrog/setup-yarn@0.0.1
  input:
    version: "1.22.6"
```

BY default latest version is choosen when no input version is specified

```yaml
- task: jfrog/setup-yarn@0.0.1
```