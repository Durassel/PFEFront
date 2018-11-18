# `PFEFront` — Graduation project / Voxel

This project is a web client application used to display statistics about building workers (backacke, fall ...)


## Getting Started

To get you started you can simply clone the `PFEFront` repository and install the dependencies:

### Prerequisites

You need git to clone the `PFEFront` repository. You can get git from [here][git].

We also use a number of Node.js tools to initialize and test `PFEFront`. You must have Node.js
and its package manager (npm) installed. You can get them from [here][node].

### Clone `PFEFront`

Clone the `PFEFront` repository using git:

```
git clone https://github.com/Sodsixela/PFEFront
cd PFEFront
```

### Install Dependencies

We have two kinds of dependencies in this project: tools and AngularJS framework code. The tools
help us manage and test the application.

* We get the tools we depend upon and the AngularJS code via `npm`, the [Node package manager][npm].
* In order to run the end-to-end tests, you will also need to have the
  [Java Development Kit (JDK)][jdk] installed on your machine. Check out the section on
  [end-to-end testing](#e2e-testing) for more info.

We have preconfigured `npm` to automatically copy the downloaded AngularJS files to `app/lib` so we
can simply do:

```
npm install
```

### Run the Application

We have preconfigured the project with a simple development web server. The simplest way to start
this server is:

```
gulp watch
```

Now browse to the app at [`localhost:5000`][local-app-url].