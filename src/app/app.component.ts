import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as $ from 'jquery';
import {subscribeOn} from 'rxjs/operators';
import {subscribeToResult} from 'rxjs/internal-compatibility';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {
  }
  ngOnInit() {
  }
  Authorization() {
    $(document).ready(() => {
      $.ajax({
        url: 'https://manager_services.bibinet.ru/accounts/login/',
        beforeSend(xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        method: 'GET',
        data: {
          login: 'demo_68f3js1@bibinet.ru',
          password: 'MJJ3Cb'
        },
        success(data) {
          console.log(data.response);
          localStorage.setItem('access_token', data.response.access_token);
          localStorage.setItem('refresh_token', data.response.refresh_token);
        }
      });
    });
  }
  passData() {
    $(document).ready(() => {
      $.ajax({
        url: 'https://manager_services.bibinet.ru/company/',
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('access_token'));
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        method: 'GET',
        success(data) {
          console.log(data);
        }
      });
    });
  }
  refreshToken() {
    $(document).ready(() => {
      $.ajax({
        url: 'https://manager_services.bibinet.ru/accounts/token/refresh/',
        beforeSend(xhr) {
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        method: 'GET',
        data: {
          access_token: localStorage.getItem('access_token'),
          refresh_token: localStorage.getItem('refresh_token'),
        },
        success(data) {
          console.log(data.response);
          localStorage.setItem('access_token', data.response.access_token);
          localStorage.setItem('refresh_token', data.response.refresh_token);
        }
      });
    });
  }
  aboutUser() {
    $(document).ready(() => {
      $.ajax({
        url: 'https://manager_services.bibinet.ru/accounts/userprofile/',
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('access_token'));
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        method: 'GET',
        success(data) {
          console.log(data.response);
        }
      });
    });
  }
  helps() {
    $(document).ready(() => {
      $.ajax({
        url: 'https://manager_services.bibinet.ru/references/',
        beforeSend(xhr) {
          xhr.setRequestHeader('Authorization', localStorage.getItem('access_token'));
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        },
        data: {
          help: true
        },
        method: 'GET',
        success(data) {
          console.log(data.models);
        }
      });
    });
  }
  exit() {
    localStorage.clear();
    console.log('LocalStorage clear');
  }
}

