import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { BackEndService } from '../back-end.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  constructor(private backEndService: BackEndService){}

  ngOnInit(): void {

  }

  onSave(){
    this.backEndService.saveData();
  }

  onFetch(){
    this.backEndService.fetchData();
  }
}