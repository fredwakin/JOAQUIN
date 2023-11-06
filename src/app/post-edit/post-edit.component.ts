import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../post.model';
import { PostService } from '../post.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent {

  index: number=0;
  form!: FormGroup;
  editMode= false;
    constructor( private postService: PostService, private router: Router, private actRoute: ActivatedRoute){}

  ngOnInit(): void {
    let title = '';
    let image = '';
    let description = '';
    this.actRoute.params.subscribe((params: Params) => {
      if(params['index']){
        console.log(params['index']);
this.index = params['index'];
        const postSpec = this.postService.getSpecPost(this.index);
          title = postSpec.title;
          image = postSpec.image;
          description = postSpec.description;
          this.editMode=true;
      }
    })

    this.form  = new FormGroup({
      title: new FormControl (title, [Validators.required]),
      image: new FormControl (image, [Validators.required]),
      description: new FormControl (description, [Validators.required])
    })
  }

  onSubmit(){
    const title = this.form.value.title;
    const image = this.form.value.image;
    const description = this.form.value.description;


    const post: Post = new Post(
      title, image, description, 'Erlfred', new Date(), 0
    );

    if(this.editMode==false){
      this.postService.addPost(post);
    }
    else{
      this.postService.updatePost(this.index, post);
    }
    

    this.router.navigate(['/post-list'])
  }
}
