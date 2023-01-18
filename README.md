# setup-task-template
A skeleton project for reusing while writing setup task.

## Why setup-task-template?
All the task related to package setup should be similar and follows similar flow.
So creating a skeleton project should help in quickly cloning the project and create 
setup task template.

Most of the setup tasks should follow this flow.
  - Read version
  - Determine downloading binary based on version given or execute similar command to get binary
  - Moving to a directory which is part of $PATH
  - Run a test command to conclude that installation is successful
  - Write details in identifying binary location and few more details like version of binary installed.

## Consider below while writing new setup task
  - Make sure to download latest version of binary when ever latest is mentioned by avoiding hardcoding of version.
  - Provide a way to install specific version of binary
