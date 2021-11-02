import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-show-example-code',
  templateUrl: './show-example-code.component.html',
  styleUrls: ['./show-example-code.component.scss']
})
export class ShowExampleCodeComponent implements OnInit {
  @Input() path: string;
  code: string;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.http.get('assets/examples/' + this.path, {responseType: 'text'})
      .subscribe((res) => {
        this.code = res;
      });
  }


}
