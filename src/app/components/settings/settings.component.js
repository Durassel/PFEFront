"use strict";

let settings_controller = function settingsController($http, $state, GlobalConfigFactory, $element, $window) {
  let self      = this;
  // Global variables
  self.url      = GlobalConfigFactory.url_back;
  self.users    = [] // Users from database, used in forms
  self.user     = JSON.parse($window.localStorage.getItem("user")) // Data about connected user
  self.action   = null
  // Form variables
  self.data = {}
  self.error   = null
  self.success = null

  // Users
  $http.get(self.url + 'users/all').then((response) => {
    self.users = response.data
  })

  // Jobs
  $http.get(self.url + 'jobs/all').then((response) => {
    self.jobs = response.data
  })

  // Teams
  $http.get(self.url + 'teams/all').then((response) => {
    self.teams = response.data
  })

  // Jackets
  $http.get(self.url + 'jackets/all').then((response) => {
    self.jackets = response.data
  })

  // Sensor types
  $http.get(self.url + 'sensors/all').then((response) => {
    self.sensors = response.data
  })

  // Check user authentication
  $http.get(self.url + 'users/authrequired').then((response) => {
    if (!JSON.parse(response.data)) {
      $window.location.href = '/#!/login';
    }
  })

  self.clickIndex = function() {
    $window.location.href = '/#!/index';
  }

  // Click on logout button
  self.logout = function() {
    $http.get(self.url + 'users/logout').then((response) => {
      if (JSON.parse(response.data)) {
        $window.location.href = '/#!/login';
      }
    })
  }

  self.clickAction = function(action) {
    // Reset variables
      self.success = null
      self.error = null

    if (self.action !== action) {
      self.action = action
      self.data   = {}
    }

    // Specificities
    if (self.action === 2) {
      self.data._id = self.teams[0]._id
      self.data.new = self.teams[0].name
    }
    if (self.action === 3) self.data._id = self.teams[0]._id
    if (self.action === 4) { 
      self.data.teamID = self.teams[0]._id
      self.data.jobID = self.jobs[0]._id
    }
    if (self.action === 5) {
      self.data._id = self.users[0]._id
      self.chgUser()
    }
    if (self.action === 6) self.data._id = self.users[0]._id
    if (self.action === 7) self.data.userID = self.users[0]._id
    if (self.action === 8) { 
      self.data._id    = self.jackets[0]._id
      self.data.userID = self.jackets[0].userID
    }
    if (self.action === 9) self.data._id = self.jackets[0]._id
    if (self.action === 11) {
      self.data._id = self.sensors[0]._id
      self.data.new = self.sensors[0].type
    }
    if (self.action === 12) self.data._id = self.sensors[0]._id
  }

  self.chgTeam = function () {
    self.data.new = self.teams.find(function (x) { if (x._id == self.data._id) return x }).name
  }

  self.chgUser = function () {
    self.data.username = self.users.find(function (x) { if (x._id == self.data._id) return x }).username
    self.data.teamID = self.users.find(function (x) { if (x._id == self.data._id) return x }).teamID
    self.data.jobID = self.users.find(function (x) { if (x._id == self.data._id) return x }).jobID
  }

  self.chgJacket = function () {
    self.data.userID = self.jackets.find(function (x) { if (x._id == self.data._id) return x }).userID
  }

  self.chgSensor = function () {
    self.data.new = self.sensors.find(function (x) { if (x._id == self.data._id) return x }).type
  }

  self.verification = function () {
    // if (self.action === 1) {
    //   self.data.teamName
    // }
  }

  self.submit = function () {
    self.verification()

    let method = null
    let url = null

    if (self.action === 1) {
      method = 'POST'
      url = 'teams/add'
    } else if (self.action === 2) {
      method = 'PUT'
      url = 'teams/update'
    } else if (self.action === 3) {
      method = 'DELETE'
      url = 'teams/delete'
    } else if (self.action === 4) {
      method = 'POST'
      url = 'users/add'
    } else if (self.action === 5) {
      method = 'PUT'
      url = 'users/update'
    } else if (self.action === 6) {
      method = 'DELETE'
      url = 'users/delete'
    } else if (self.action === 7) {
      method = 'POST'
      url = 'jackets/add'
    } else if (self.action === 8) {
      method = 'PUT'
      url = 'jackets/update'
    } else if (self.action === 9) {
      method = 'DELETE'
      url = 'jackets/delete'
    } else if (self.action === 10) {
      method = 'POST'
      url = 'sensors/add'
    } else if (self.action === 11) {
      method = 'PUT'
      url = 'sensors/update'
    } else if (self.action === 12) {
      method = 'DELETE'
      url = 'sensors/delete'
    }

    console.log("Data : ", self.data)
    $http({
      method: method,
      url: self.url + url,
      data: self.data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log("Response : ", response)

      if (response.status === 200) {
        self.error = null

        if (self.action === 1) {
          self.success = "A team has been created."
          self.teams.push(response.data)
        } else if (self.action === 2) {
          self.success = "A team has been updated."
          let index = self.teams.findIndex(x => x._id === self.data._id)
          self.teams[index].name = self.data.new
        } else if (self.action === 3) {
          self.success = "A team has been deleted."
          let index = self.teams.findIndex(x => x._id === self.data._id)
          self.data._id = null
          self.teams.splice(index, 1)
        } else if (self.action === 4) {
          self.success = "A user has been created."
          self.users.push(response.data)
        } else if (self.action === 5) {
          self.success = "A user has been updated."
          let index = self.users.findIndex(x => x._id === self.data._id)
          self.users[index].username = self.data.username
          self.users[index].teamID = self.data.teamID
          self.users[index].jobID = self.data.jobID
        } else if (self.action === 6) {
          self.success = "A user has been deleted."
          let index = self.users.findIndex(x => x._id === self.data._id)
          self.data._id = null
          self.users.splice(index, 1)
        } else if (self.action === 7) {
          self.success = "A jacket has been created."
          self.jackets.push(response.data)
        } else if (self.action === 8) {
          self.success = "A jacket has been updated."
          let index = self.jackets.findIndex(x => x._id === self.data._id)
          self.jackets[index].userID = self.data.userID
        } else if (self.action === 9) {
          self.success = "A jacket has been deleted."
          let index = self.jackets.findIndex(x => x._id === self.data._id)
          self.data._id = null
          self.jackets.splice(index, 1)
        } else if (self.action === 10) {
          self.success = "A sensor type has been created."
          self.sensors.push(response.data)
        } else if (self.action === 11) {
          self.success = "A sensor type has been updated."
          let index = self.sensors.findIndex(x => x._id === self.data._id)
          self.sensors[index].type = self.data.new
        } else if (self.action === 12) {
          self.success = "A sensor has been deleted."
          let index = self.sensors.findIndex(x => x._id === self.data._id)
          self.data._id = null
          self.sensors.splice(index, 1)
        }
      } else {
        self.error = "An error occured."
        self.success = null
      }
    })
  }

};

settings_controller.$inject = ['$http', '$state', 'GlobalConfigFactory', '$element', '$window'];

let settings = {
    templateUrl: 'app/components/settings/settings.html',
    controllerAs: "stg",
    controller: settings_controller
};

module.exports = settings;