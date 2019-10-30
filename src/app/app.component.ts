import { Component, OnInit } from '@angular/core';
import { ZoomMtg } from 'zoomus-jssdk';

ZoomMtg.setZoomJSLib("https://source.zoom.us/1.6.0/lib", "/av")
ZoomMtg.preLoadWasm();
ZoomMtg.prepareJssdk();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'test';

  meetConfig = {
    apiKey: '--apiKey--',
    apiSecret: '--apiSecret--',
    meetingNumber: '--meetingNumber--',
    userName: 'Angular',
    passWord: "",
    leaveUrl: "http://localhost:4200",
    role: 1
  };

  signature = ZoomMtg.generateSignature({
    meetingNumber: this.meetConfig.meetingNumber,
    apiKey: this.meetConfig.apiKey,
    apiSecret: this.meetConfig.apiSecret,
    role: this.meetConfig.role,
    success: (res) => {
      console.log(res.result);
    }
  });

  ngOnInit() {
    ZoomMtg.init({
      leaveUrl: 'http://localhost:4200',
      isSupportAV: true,
      success: (res) => {
        ZoomMtg.join({
          meetingNumber: this.meetConfig.meetingNumber,
          userName: this.meetConfig.userName,
          signature: this.signature,
          apiKey: this.meetConfig.apiKey,
          userEmail: 'email@gmail.com',
          passWord: this.meetConfig.passWord,
          success: (res) => {
            console.log('join meeting success');
          },
          error: (res) => {
            console.log(res);
          }
        });
      },
      error: (res) => {
        console.log(res);
      }
    });
    
   
  }
}
