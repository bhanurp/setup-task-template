const setup = require("../setup");
const tasks = require("jfrog-pipelines-tasks");

jest.mock('jfrog-pipelines-tasks');


describe("Test for install package", () => {
  it('should call with proper command', function () {

    const mockedExecuteFn = jest.fn(key => {
      return {stdOut: "", stdErr: ""}
    })

    jest
      .spyOn(tasks, 'execute')
      .mockImplementation(mockedExecuteFn)

    jest
      .spyOn(tasks, 'info')
      .mockImplementation( (key) => {
        return
      })

    jest
      .spyOn(tasks, 'error')
      .mockImplementation( (key) => {
        return
      })

    setup.installPackage('latest');
    expect(mockedExecuteFn.mock.calls).toEqual([
      ['npm install --global yarn@latest', ],
    ])
  });

  it('should throw error when command execution fails', function () {

    jest
      .spyOn(tasks, 'execute')
      .mockImplementation((key) => {
        throw new Error('failed to install yarn')
      })

    jest
      .spyOn(tasks, 'error')
      .mockImplementation( (key) => {
        return
      })

    expect(async () => await setup.installPackage('latest').toThrowError('failed to install yarn'));
  });
})

describe("Test readAndValidateInput", () => {
  it('should read inputs when version is given', function () {
    jest
      .spyOn(tasks, 'getInput')
      .mockImplementation((key) => {
        return '1.22.9'
      })

    const version = setup.readAndValidateInput()
    expect(version).toEqual('1.22.9')

  });
  it('should add latest when version is empty', function () {
    jest
      .spyOn(tasks, 'getInput')
      .mockImplementation((key) => {
        return ''
      })

    const version = setup.readAndValidateInput()
    expect(version).toEqual('latest')

  });
  it('should throw err when version is not valid semantic version', function () {
    jest
      .spyOn(tasks, 'getInput')
      .mockImplementation((key) => {
        return '1'
      })

    expect(() => setup.readAndValidateInput()).toThrow('version input must be semver compatible')

  });
})

describe('Test for validate node installation', () => {
  it('should call with proper command to validate node installation', function () {
    const mockedExec = jest
                        .spyOn(tasks, 'execute')
                        .mockImplementation((key) => {
                          return ''
                        })

    setup.validateNodeInstallation()
    expect(mockedExec).toHaveBeenCalledWith('node --version')
  });
})
