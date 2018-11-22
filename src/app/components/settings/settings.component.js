"use strict";

let settings_controller = function settingsController($http, $state, GlobalConfigFactory, $element, $window) {
  let self = this;

  self.url = GlobalConfigFactory.url_back;
  self.job = $window.sessionStorage.getItem("job");
  self.idUser = $window.sessionStorage.getItem("idUser");

  self.clickModUser = function() {
    self.action=1
    self.field = ["idUser","giletid","job"]
  }

  self.clickAdd = function() {
    self.action=2
    if(self.job === '0'){
       self.field = ["idUser","giletid","job"]
    }
    else{
      self.field = ["idUser","giletid"]
    }
  }

  self.clickDel = function() {
    self.action=3
    self.field = ["idUser"]
  }

  self.clickGilet = function() {
    self.action=4
    self.field = ["idUser","giletid"]
  }

  self.clickPassword = function() {
    self.action= 5
    if(self.job === '0'){
       self.field = ["idUser","password"]
    }
    else{
      self.field = ["password"]
    }
  }
   self.submit = function() {
    let data
    let url =""
    let method
    if(self.action === 1)
    {
      method = 'PUT'
        data = {
                  idUser: self.data.idUser,
                  giletid: self.data.giletid,
                  job: self.data.job
                }
        url = 'users/chgUser'
    }
    else if(self.action === 2)
    {
      method = 'POST'
        data = {
                  idUser: self.data.idUser,
                  giletid: self.data.giletid
                }
        if(self.job === 0){
          data.job = self.data.job
        }
        else if(self.job === 2){
          data.job = 1
        }
        console.log(data)
        url ='users/addUser'
    }
    else if(self.action === 3)
    {
      method = 'DELETE'
      data = {
                  idUser: self.data.idUser
                }
      url ='users/delUser'
    }
    else if(self.action === 4)
    {
      method = 'PUT'
      data = {
                  idUser: self.data.idUser,
                  giletid: self.data.giletid,
                  sender: self.job //to make sure that staff cannot erase everybody
                }
      url ='users/chgGilet'
    }
    else if(self.action === 5)
    {
      let id
      if(self.job === 0){
        id = self.data.idUser
      }
      else if(self.job ===2){
        id = self.idUser
      }

      method = 'PUT'
      data = {
                  idUser: id,
                  password: self.data.password,
                  sender: self.job //to make sure that staff cannot change everything
                }
      url ='users/chgPassword'
    }
     $http({
      method: method,
      url: self.url + url,
      data: data,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      if (response.status === 200) {
        alert(response.data.result)
      }
    })
  }

};

settings_controller.$inject = ['$http', '$state', 'GlobalConfigFactory', '$element','$window'];

let settings = {
    templateUrl: 'app/components/settings/settings.html',
    controllerAs: "stg",
    controller: settings_controller
};

module.exports = settings;