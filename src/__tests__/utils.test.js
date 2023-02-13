const utils = require("../utils");
const tasks = require("jfrog-pipelines-tasks");

jest.mock('jfrog-pipelines-tasks');


describe("Test for write info", () => {
  it('should call with proper commands', function () {

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

    utils.writeInfo();
    expect(mockedExecuteFn.mock.calls).toEqual([
      ['node --version', ],
    ])
  });
})