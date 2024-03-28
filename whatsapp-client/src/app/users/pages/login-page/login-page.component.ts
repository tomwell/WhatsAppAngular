import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import {UserService} from '../../user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})


export class LoginPageComponent {
  
  @ViewChild('input', { static: true, read: ElementRef }) inputFile!: ElementRef


  public apiOfflile: Boolean = false;
  public lastUserIdClicked = "";
  private userService = inject(UserService);
  public imagePng: string = "../../../assets/img/profile-default-svgrepo-com.svg";

  protected users$ = this.userService.getUsers()
    .pipe(catchError(err => {
      this.apiOfflile = true;
      return of([])
    }));  

    onFileSelected(event: any) {
      let selectedFiles = event.target.files as FileList;

      if(selectedFiles.length == 0) return;
      
      const file = selectedFiles[0];
      
      const reader= new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        const fileInBytes = reader.result as ArrayBuffer;
        this.userService.uploadUserImage(this.lastUserIdClicked, fileInBytes)
        .subscribe(() => {
           
        });
      }
    }

  onImageButtonClicked(userId: string) {
    this.lastUserIdClicked = userId;
    this.inputFile?.nativeElement.click();
  }
}
