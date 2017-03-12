// Main app compnent
import { Component,OnInit } from '@angular/core';
import {PostsService}  from '../services/posts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {CustomRequest} from "../model/CustomRequest";
import {Hero} from "../model/Hero";

// Decorator
@Component({
  moduleId :module.id,
  selector: 'about',
  // refers to index.html file
  templateUrl:'../html/about.html',
  providers: [PostsService]
})
export class AboutComponent implements OnInit {
  heroForm: FormGroup;
  model: Hero;
  submittedModel: Hero;
  powers: string[];
  submitted: boolean = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.model = new Hero(18, 'Dr IQ', 'Really Smart', 'Chuck Overstreet', 'iq@superhero.com');

    this.powers = ['Really Smart', 'Super Flexible',
      'Hypersound', 'Weather Changer'];

    this.heroForm = this.formBuilder.group({
      name:     [this.model.name, Validators.required],
      alterEgo: [this.model.alterEgo, Validators.required],
      email:    [this.model.email, [Validators.required]],
      power:    [this.model.power, Validators.required]
    });
  }

  onSubmit({ value, valid }: { value: Hero, valid: boolean }) {
    this.submitted = true;
    this.submittedModel = value;
  }
}
