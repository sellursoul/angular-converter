import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {RespData} from "../interfaces/interfaces";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  data: RespData[] = []
  constructor(private dataService: DataService) {
  }

  ngOnInit(): void {
    this.dataService.getData().subscribe((resp) => {
      this.data = resp
      console.log(this.data)
    })
  }

}
