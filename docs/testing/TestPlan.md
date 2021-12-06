# Testing Plan

## Project Description
See [Project Proposal](/docs/ProjectProposal.md)

## Over all testing plan 
Testing will be conducted early and often by developers on their local machines, it will also
be automatically run upon creation of a "pull request" on github.com. Testing will also be run
upon a successful merge to the `main` branch after a "pull request" is accepted.

Specific test cases use the most current version of the project's 
[Test Case Template](./TestCaseTemplate.md).

## Static Testing
ESLint will be used for static code quality checking. ESLint looks for syntax, logic, layout, formatting, 
 and code suggestions.

>ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, 
> with the goal of making code more consistent and avoiding bugs.


## Unit Tests
Unit tests provide testing of individual modules, classes, or functions. This 
testing is best done as you develop. 

Describe how you will break your tests into unit tests and plan out some of your
unit tests. 

Each component and service will be accompanied by a test definition which must test:
- The component/service can be imported
- The component/service can be created

Additionally, each test definition will verify that component/service methods not used during
the creation process are functioning as intended by using mock data.


## Integration Tests
Integration testing will be performed "bottom up" by importing and integrating low level 
components/services into high level components/services as the tests progress.

These high level components will define tests that validate that child components are 
functioning as expected under expected and exception scenarios.

Specifically, the following tests will be written:
- `PlotContainerComponent` can import and use
  - `ChrIdsService`, and
  - `StrainMapService`
- `GenomeKaryotypePlotComponent` can import and use
  - `ChrIdsService`,
  - `StrainMapService`,
  - `ZoomIntervalService`, and
  - `SvgToolsService`
- `GenomeIntervalPlotComponent` can import and use
  - `ChrIdsService`,
  - `StrainMapService`,
  - `ZoomIntervalService`, and
  - `SvgToolsService`

## Validation Tests
- The requirement specification will be reviewed and accepted by the team, the professor and the client. 
- There will be code review of all changes, including documentation and design
- The client will evaluate our work up delivery, as well as when client's schedule allows to participate in code review

## System Tests
System tests will be implemented through the development of an example application which utilizes
the component library. The application will have tests that verify that it can build itself, and 
that each public library component can be created when it does.
