import { Component, OnInit } from '@angular/core';
import { LoginManagerService } from '../../services/login-manager.service';
import { HttpClient } from '@angular/common/http';
import { EpHttpServiceService } from '../../services/ep-http-service.service';

@Component({
  selector: 'myorg-english-puzzle',
  templateUrl: './english-puzzle.component.html',
  styleUrls: ['./english-puzzle.component.scss'],
})
export class EnglishPuzzleComponent implements OnInit {
  clueImageData: any = null;



  constructor(private loginService: LoginManagerService, 
    private http: HttpClient,
    private epService: EpHttpServiceService) {}

  ngOnInit(): void {
    this.getClueImage();
  }


  getClueImage() {
    const uid = this.loginService.getUser();
    const serviceUrl = this.epService.getServerUrl() + "/clue/" + uid + "/" + "huge";
    this.http.get(serviceUrl, { responseType: 'blob' })
      .subscribe(response => {
        const reader = new FileReader();
        reader.onloadend = () => {
          this.clueImageData = reader.result;
        };
        reader.readAsDataURL(response);
      });
  }

}
