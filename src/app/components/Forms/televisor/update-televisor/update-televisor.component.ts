import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-televisor',
  templateUrl: './update-televisor.component.html',
  styleUrls: ['./update-televisor.component.css'],
})
export class UpdateTelevisorComponent implements OnInit {
  televisor_id: number;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.televisor_id = params['televisor_id'];
    });
  }
}
