
<p align="center">
  <img href="https://github.com/SophiaHadash/ArgueView" alt="ArgueView" src="https://raw.githubusercontent.com/SophiaHadash/ArgueView/master/screenshots/logo.svg" width="50%" />
<p>

--- 
[![Build Status](https://jenkins.tuneblendr.com/job/argueview-js/job/master/badge/icon?style=flat "Build Status")](https://jenkins.tuneblendr.com/blue/organizations/jenkins/argueview-js/activity)
[![Code Coverage](https://img.shields.io/jenkins/coverage/cobertura?jobUrl=https%3A%2F%2Fjenkins.tuneblendr.com%2Fjob%2Fargueview-js%2Fjob%2Fmaster "Code Coverage")](https://jenkins.tuneblendr.com/job/argueview-js/job/master/coverage/)

ArgueView is a tool for generating text-based presentations for machine-learning predictions and feature-importance 
based explanation tools. The tool makes use of Toulmin's model of argumentation for structuring the text-based 
explanations.

This repo hosts the JavaScript component of ArgueView. This component is responsible for the visualizations. 
These visualizations are available as React components on npm or by importing this repo directly. Furthermore, these 
visualizations are used by several functions of the 
[Python counterpart of ArgueView](https://github.com/SophiaHadash/ArgueView). These visualizations are therefore
directly available in Jupyther Notebooks.

Example output:

![Example Visualization](https://github.com/sophiahadash/argueview/blob/master/screenshots/toulmin-visualizer.png?raw=true)
![Example output](https://github.com/sophiahadash/argueview/blob/master/screenshots/featurelist-visualizer.png?raw=true)

## Installation

argueview-js is available as a [npm package](https://www.npmjs.com/package/argueview-js). Add to your project:
```
npm install argueview-js --save
```

Or install globally:
```
npm install argueview-js -g
```

## Usage

The component can be used as part of a React component. To render an explanation you will need an explanation json file
as generated by the [Python framework](https://github.com/SophiaHadash/ArgueView).

```{javascript}
import React from 'react';
import { ToulminVisualizer } from "argueview";
import explanation from "./explanation.json";

class MyComponent extends React.Component {
  render() {
    return <ToulminVisualizer explanation={explanation} />;
  }
}
```

### TypeScript

The component includes type definitions for TypeScript.

```{typescript jsx}
import React from 'react';
import { ToulminVisualizer } from "argueview";
import { ExplanationObject } from "argueview/dist/typings/explanation";
import explanation from "./explanation.json";

export default class MyComponent extends React.Component<{}, {}> {
    public render() {
        return <ToulminVisualizer explanation={explanation as ExplanationObject} />;
    }
}
```

### Jupyter Notebooks

The visualizations are available in Jupyter Notebooks. Refer to the [Python framework](https://github.com/SophiaHadash/ArgueView)
for documentation.

## Building

Follow these steps to build argueview-js from source.

- make sure you install the dependencies. ArgueView requires the following dependencies: `nodejs`, `npm`.
- build using npm
    ``` 
    npm run build
    ```
