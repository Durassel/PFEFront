"use strict";

let settings_controller = function settingsController($http, $state, GlobalConfigFactory, $element, $window) {
  let self      = this;
  // Global variables
  self.url      = GlobalConfigFactory.url_back;
  self.users    = [] // Users from database, used in forms
  self.user     = JSON.parse($window.localStorage.getItem("user")) // Data about connected user
  self.action   = null
  // Form variables
  self.data = {
    id      : null,
    user    : null,
    gilet   : null,
    job     : null,
    password: null
  }
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
    if (self.action !== action) {
      self.action        = action
      self.data.id       = null
      self.data.user     = null
      self.data.gilet    = null
      self.data.job      = null
      self.data.password = null
    }
  }

  self.userChg = function() {
    self.data.user  = self.users.find(function(user) { if (user._id == self.data.id) return user }).idUser
    self.data.gilet = self.users.find(function(user) { if (user._id == self.data.id) return user }).giletid
    self.data.job   = self.users.find(function(user) { if (user._id == self.data.id) return user }).job
    self.error      = null
    self.success    = null
  }

  self.submit = function() {
    let method = null
    let data = null
    let url = null

    if (self.action === 1) {
      method = 'PUT'
      data = {
        idUser : self.data.user,
        giletid: self.data.gilet,
        job    : self.data.job
      }
      url = 'users/chgUser'
    } else if (self.action === 2) {
      method = 'POST'
      data = {
        idUser : self.data.user,
        giletid: self.data.gilet,
        job    : self.data.job
      }
      url = 'users/addUser'
    } else if (self.action === 3) {
      method = 'DELETE'
      data = {
        id    : self.data.id,
        idUser: self.data.user
      }
      url = 'users/delUser'
    } else if (self.action === 4) {
      method = 'PUT'
      data = {
        idUser : self.data.user,
        giletid: self.data.gilet,
        sender: self.user.job // To make sure that staff cannot erase everybody
      }
      url = 'users/chgGilet'
    } else if (self.action === 5) {
      let id = null

      if (self.user.job === '0') {
        id = self.data.user
      } else if (self.job === '2') {
        id = self.user.idUser
      }

      method = 'PUT'
      data = {
        idUser: id,
        password: self.data.password,
        sender: self.user.job // To make sure that staff cannot change everything
      }
      url = 'users/chgPassword'
    }

    data.job = data.job === null ? '0' : data.job // By default, job = worker
    console.log("Data : ", data)

    $http({
      method: method,
      url: self.url + url,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        self.success = "Information has been successfully updated."
        self.error = null

        // Refresh users data
        if (self.action === 1) {
          let index = self.users.findIndex(x => x._id === self.data.id)
          self.users[index].giletid = self.data.gilet
          self.users[index].job = self.data.job
        } else if (self.action === 2) {
          self.users.push(response.data)
        } else if (self.action === 3) {
          let index = self.users.findIndex(x => x._id === self.data.id)
          self.users.splice(index, 1)
          // Reset data
          self.data.id       = null
          self.data.user     = null
          self.data.gilet    = null
          self.data.job      = null
          self.data.password = null
          console.log("User deleted : ", self.users)
        } else if (self.action === 4) {
          let index = self.users.findIndex(x => x._id === self.data.id)
          self.users[index].giletid = self.data.gilet
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