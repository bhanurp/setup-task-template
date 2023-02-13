# setup-yarn JFrog Pipelines Task

Pipelines task for installing yarn package manager.

## PreRequisites

For installing yarn node js is required. Make sure node js is installed using
`setup-node`.

## Usage

```yaml
- task: jfrog/setup-yarn@0.0.1
  input:
    version: "1.22.6"
```
