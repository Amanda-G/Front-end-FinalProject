import { Component, OnInit } from '@angular/core';
import { DatenightService } from '../datenight.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-jokes',
  templateUrl: './jokes.component.html',
  styleUrls: ['./jokes.component.css'],
})
export class JokesComponent implements OnInit {
  randomJoke: any;
  allIntimate: any;
  allTrivia: any;
  restaurants: any;
  moviesList: any;
  beer: any;
  activities: any;
  location: any;
  constructor(
    private service: DatenightService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getCurrentMovies();
    this.getRandomJoke();
    this.getBeer();
    this.getAllIntimate();
    this.getAllTrivia();
    // this.getActivities();

    //looks at url (the city defined from search)

    this.route.queryParams.subscribe((response) => {
      let location = response.city;
      this.service.getLocation(location).subscribe((response) => {
        console.log(response);
        let locationID = response.data[0].result_object.location_id;
        console.log(locationID);
        this.service.getFood(locationID).subscribe((response) => {
          console.log(response);
          this.restaurants = response.data;
        });
      });
    });
  }

  getRandomJoke() {
    this.service.getRandomJoke().subscribe((response) => {
      this.randomJoke = response;

      console.log(this.randomJoke);
    });
  }

  getAllIntimate() {
    this.service.getAllIntimate().subscribe((response) => {
      this.allIntimate = response;

      console.log(this.allIntimate);
    });
  }

  getAllTrivia() {
    this.service.getAllTrivia().subscribe((response) => {
      this.allTrivia = response;

      console.log(this.allTrivia);
    });
  }

  getCurrentMovies() {
    this.service.getCurrentMovies().subscribe((response) => {
      console.log('sandwich top');
      console.log(response);
      console.log('sandwich bottom');
      this.moviesList = response.results;
    });
  }

  search(form: NgForm) {
    this.router.navigate(['search'], {
      queryParams: { city: form.value.locationText },
    });
    this.location = form.value.locationText;
    form.reset();
  }
  getBeer(): any {
    this.service.getBeer().subscribe((response) => {
      this.beer = response;
      console.log(response);
    });
  }

  getActivities(form: NgForm) {
    // this.route.queryParams.subscribe(response => {
    //   console.log(response);
    this.service
      .getActivities(`${form.value.activities} ${this.location}`)
      .subscribe((activityResponse) => {
        console.log(activityResponse);
        this.activities = activityResponse.candidates;
      });
    // });
  }
}
